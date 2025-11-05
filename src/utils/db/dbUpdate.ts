import appService from "../../redux/app/appService";
import { getDB } from "../db";

export const insertSaleWithProducts = async (sale: any) => {
	const db = getDB();

	try {
		await db.execute("BEGIN TRANSACTION");

		await db.execute(
			`INSERT INTO sales (
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
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				sale.shopId,
				sale.amountPaid,
				sale.amountExpected,
				sale.amountPaid,
				sale.actorId,
				sale.isSubdealer ? 1 : 0,
				sale.hybridRef,
				sale.userId,
				sale.syncStatus,
				sale.comment,
				sale.discount,
				sale.customerName,
				sale.customerPhoneNo,
				sale.customerEmail,
				sale.isDeposit,
				sale.paymentMethodId,
			]
		);

		const result = await db.select<{ last_insert_rowid: number }[]>(
			"SELECT last_insert_rowid() as last_insert_rowid"
		);
		const saleId = result[0].last_insert_rowid;

		for (const p of sale.products) {
			await db.execute(
				`INSERT INTO sales_products (
					saleId,
					productId,
					quantity,
					price
				) VALUES (?, ?, ?, ?)`,
				[saleId, p.id, p.quantity, p.price]
			);
		}

		if (sale.balance > 0) {
			const customerId = sale.isSubdealer
				? sale.subdealerId
				: sale.customerId;

			await db.execute(
				`UPDATE customers
				 SET balance = balance + ?
				 WHERE customerId = ?`,
				[sale.balance, customerId]
			);
		}

		await db.execute("COMMIT");
	} catch (err) {
		await db.execute("ROLLBACK");
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
		if (db) {
			await db.execute("BEGIN TRANSACTION");
			try {
				for (const p of products) {
					// This will insert new or replace existing based on id
					await db.execute(
						`INSERT INTO products (productId, name, price, image, isService, totalStock, barcode)
							VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
							ON CONFLICT(productId) DO UPDATE SET
								name = excluded.name,
								price = excluded.price,
								image = excluded.image,
								totalStock = excluded.totalStock,
								barcode = excluded.barcode`,
						[
							p.id,
							p.summary,
							parseFloat(p.price),
							p.image || null,
							p.isService ? 1 : 0,
							Number(p.totalStock),
							p.barcode,
						]
					);
				}
				await db.execute("COMMIT");
				return products;
			} catch (err) {
				await db.execute("ROLLBACK");
				throw err;
			}
		}
	} catch (err) {
		console.log(err, "From Uploading Products");
		throw err;
	}
};

export const upsertCustomers = async (
	customers: any[],
	isSubdealer: boolean
) => {
	try {
		const db = getDB();
		if (db) {
			await db.execute("BEGIN TRANSACTION");
			try {
				for (const p of customers) {
					// This will insert new or replace existing based on id
					await db.execute(
						`INSERT INTO customers (customerId, name, email, balance, creditLimit, phone, isSubdealer)
							VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
							ON CONFLICT(customerId) DO UPDATE SET
								name = excluded.name,
								balance = excluded.balance,
								creditLimit = excluded.creditLimit,
								phone = excluded.phone`,
						[
							p.id,
							p.fullName,
							p.email,
							parseFloat(p.balance),
							p.creditLimit ? parseFloat(p.creditLimit) : 0,
							p.phoneNo,
							isSubdealer ? 1 : 0,
						]
					);
				}
				await db.execute("COMMIT");
				return customers;
			} catch (err) {
				await db.execute("ROLLBACK");
				throw err;
			}
		}
	} catch (err) {
		console.log(err, "From Uploading Customer");
		throw err;
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
