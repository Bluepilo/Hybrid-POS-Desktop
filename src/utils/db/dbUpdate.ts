import appService from "../../redux/app/appService";
import { getDB } from "../db";

export const insertSaleWithProducts = async (sale: any) => {
	const db = getDB();
	if (!db) return;

	try {
		// Start the transaction
		let sql = "BEGIN TRANSACTION;";

		// 1️⃣ Insert sale
		sql += `
		INSERT INTO sales (
			shopId,
			actualAmountPaid,
			amountExpected,
			amountPaid,
			actorId,
			isSubdealer,
			hybridRef,
			userId,
			syncStatus,
			comment,
			discount,
			customerName,
			customerPhoneNo,
			customerEmail,
			isDeposit,
			paymentMethodId
		) VALUES (
			${sale.shopId},
			${sale.amountPaid},
			${sale.amountExpected},
			${sale.amountPaid},
			${sale.actorId},
			${sale.isSubdealer ? 1 : 0},
			'${sale.hybridRef.replace(/'/g, "''")}',
			${sale.userId},
			'${sale.syncStatus}',
			'${sale.comment?.replace(/'/g, "''") ?? ""}',
			${sale.discount ?? 0},
			'${sale.customerName?.replace(/'/g, "''") ?? ""}',
			'${sale.customerPhoneNo?.replace(/'/g, "''") ?? ""}',
			'${sale.customerEmail?.replace(/'/g, "''") ?? ""}',
			${sale.isDeposit ? 1 : 0},
			${sale.paymentMethodId ?? 0}
		);
		`;

		// 2️⃣ Get the last_insert_rowid() to use for products
		sql += "SELECT last_insert_rowid() AS last_insert_rowid;";

		// Execute sale insert and get saleId
		const result = await db.select<{ last_insert_rowid: number }[]>(sql);
		const saleId = result[0].last_insert_rowid;

		// 3️⃣ Insert all products for the sale
		if (sale.products?.length > 0) {
			let productsSQL = "BEGIN TRANSACTION;";
			for (const p of sale.products) {
				productsSQL += `
			INSERT INTO sales_products (
				saleId,
				productId,
				quantity,
				price
			) VALUES (
				${saleId},
				${p.id},
				${p.quantity},
				${p.price}
			);
			`;
			}
			productsSQL += "COMMIT;";
			await db.execute(productsSQL);
		}

		// 4️⃣ Update customer balance if needed
		if (sale.balance > 0) {
			const customerId = sale.isSubdealer
				? sale.subdealerId
				: sale.customerId;
			await db.execute(`
		UPDATE customers
		SET balance = balance + ${sale.balance}
		WHERE customerId = ${customerId};
					`);
		}
	} catch (err) {
		console.error("Error inserting sale:", err);
		throw err;
	}
};

export const getSales = async ({
	page = 1,
	limit = 10,
	actorId = null,
	startDate = null,
	endDate = null,
}) => {
	const db = getDB();
	const offset = (page - 1) * limit;

	let whereClauses: string[] = [];
	let params: (string | number)[] = [];

	if (actorId) {
		whereClauses.push("s.actorId = ?");
		params.push(actorId);
	}

	if (startDate && endDate) {
		whereClauses.push("s.createdAt BETWEEN ? AND ?");
		params.push(startDate, endDate);
	}

	const whereSQL = whereClauses.length
		? `WHERE ${whereClauses.join(" AND ")}`
		: "";

	const rows = await db.select<any[]>(
		`
    SELECT
      s.*,
      c.name AS actorName,
      u.name AS userName,
      json_group_array(
        json_object(
          'id', sp.id,
          'productId', sp.productId,
          'quantity', sp.quantity,
          'price', sp.price
        )
      ) AS products
    FROM sales s
    LEFT JOIN customers c ON s.actorId = c.customerId
    LEFT JOIN users u ON s.userId = u.userId
    LEFT JOIN sales_products sp ON sp.saleId = s.id
    ${whereSQL}
    GROUP BY s.id
    ORDER BY s.createdAt DESC
    LIMIT ? OFFSET ?
    `,
		[...params, limit, offset]
	);

	return rows.map((row) => ({
		...row,
		products: row.products ? JSON.parse(row.products) : [],
	}));
};

export const upsertProducts = async (products: any[]) => {
	try {
		const db = getDB();
		if (!db) return;

		let sql = "BEGIN TRANSACTION;";

		for (const p of products) {
			sql += `
			INSERT INTO products (
				productId, name, price, image, isService, totalStock, barcode, costPrice
			)
			VALUES (${p.id}, '${p.summary.replace(/'/g, "''")}', ${parseFloat(p.price)}, ${
				p.image ? `'${p.image}'` : "NULL"
			}, ${p.isService ? 1 : 0}, ${Number(p.totalStock)}, '${
				p.barcode
			}', ${p.costPrice})
			ON CONFLICT(productId) DO UPDATE SET
				name = excluded.name,
				price = excluded.price,
				image = excluded.image,
				totalStock = excluded.totalStock,
				barcode = excluded.barcode,
				costPrice = excluded.costPrice;
		`;
		}

		sql += "COMMIT;";

		await db.execute(sql);
	} catch (err) {
		console.log(err, "Error Uploading Products");
	}
};

export const upsertCustomers = async (
	customers: any[],
	isSubdealer: boolean
) => {
	try {
		const db = getDB();
		if (!db) return;

		let sql = "BEGIN TRANSACTION;";

		for (const p of customers) {
			sql += `
			INSERT INTO customers (
				customerId, name, email, balance, creditLimit, phone, isSubdealer
			)
			VALUES (${p.id}, '${p.fullName.replace(/'/g, "''")}', '${
				p.email
			}', ${parseFloat(p.balance)}, ${
				p.creditLimit ? parseFloat(p.creditLimit) : 0
			}, '${p.phoneNo}', ${isSubdealer ? 1 : 0})
			ON CONFLICT(customerId) DO UPDATE SET
				name = excluded.name,
				balance = excluded.balance,
				creditLimit = excluded.creditLimit,
				phone = excluded.phone;
		`;
		}

		sql += "COMMIT;";

		await db.execute(sql);
	} catch (err) {
		console.log(err, "Error Uploading Customers");
	}
};

export const syncDBShop = async (shopId: string) => {
	let res = await appService.fetchProducts(shopId);
	if (res?.rows?.length > 0) {
		await upsertProducts(res.rows);
	}
	let resC = await appService.fetchCustomers(shopId);
	if (resC?.rows?.length > 0) {
		await upsertCustomers(resC.rows, false);
	}
	let resS = await appService.fetchSubdealers(shopId);
	if (resS?.rows?.length > 0) {
		await upsertCustomers(resS.rows, true);
	}
};

export const updateSaleSyncStatus = async (
	saleId: number,
	syncStatus: string,
	reason?: string
) => {
	const db = getDB();
	try {
		await db.execute(
			`UPDATE sales
			 SET syncStatus = ?, failReason = ?
			 WHERE id = ?`,
			[syncStatus, reason || null, saleId]
		);
	} catch (err) {
		console.error("Error updating syncStatus:", err);
		throw err;
	}
};

export const syncSales = async () => {};

export const syncCustomers = async () => {};
