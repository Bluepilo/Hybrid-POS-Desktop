import appService from "../../redux/app/appService";
import { getDB } from "../db";

export const insertSaleWithProducts = async (sale: any) => {
	const db = getDB();
	if (!db) return;

	try {
		const insertSaleSQL = `
      INSERT INTO sales (
        shopId,
        amountPaid,
        actorId,
        isSubdealer,
        hybridRef,
        userId,
        comment,
        customerName,
        customerPhoneNo,
        customerEmail,
        paymentMethodId,
		status,
		reference,
		transactionAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

		const saleParams = [
			sale.shopId,
			Number(sale.amountPaid) || 0,
			sale.actorId,
			sale.isSubdealer ? 1 : 0,
			sale.hybridRef ?? "",
			sale.userId,
			sale.comment ?? "",
			sale.customerName ?? "",
			sale.customerPhoneNo ?? "",
			sale.customerEmail ?? "",
			sale.paymentMethodId ?? 0,
			sale.status,
			sale.reference ?? "",
			sale.transactionAt,
		];

		await db.execute(insertSaleSQL, saleParams);

		// 2️⃣ Get the saleId using last_insert_rowid()
		const row = await db.select<{ id: number }[]>(
			"SELECT last_insert_rowid() as id;",
		);

		const rows = await db.select<{ id: number }[]>(
			`SELECT id FROM sales WHERE hybridRef = ?`,
			[sale.hybridRef],
		);

		console.log("last_insert_rowid result", row);
		console.log("rows_check", rows);

		const saleId = row[0]?.id;

		if (!saleId) throw new Error("Failed to retrieve saleId");

		console.log(
			"Products Received",
			sale.products,
			"isArray",
			Array.isArray(sale.products),
		);
		console.log(saleId, "SALEID");

		if (sale.products?.length > 0) {
			const productSQL = `
        INSERT INTO sales_products (
          saleId,
          productId,
          quantity,
          price,
		  discountType
        ) VALUES (?, ?, ?, ?, ?);
      `;

			for (const p of sale.products) {
				await db.execute(productSQL, [
					saleId,
					p.id,
					Number(p.quantity) || 0,
					Number(p.price) || 0,
					p.discountType,
				]);
			}
		}

		// 4️⃣ Update customer balance safely
		if (sale.balance > 0) {
			const customerId = sale.isSubdealer
				? sale.subdealerId
				: sale.customerId;

			await db.execute(
				`UPDATE customers SET balance = balance + ? WHERE customerId = ?`,
				[Number(sale.balance) || 0, customerId],
			);
		}
	} catch (err) {
		console.error("Error inserting sale:", err);
		throw err;
	}
};

export const syncSaleFromServer = async (sale: any, hybridRef: string) => {
	const db = getDB();
	if (!db) return;

	try {
		// Update sale record
		await db.execute(
			`
			UPDATE sales
			SET
				actualAmountPaid = ?,
				amountExpected = ?,
				uniqueRef = ?,
				discount = ?,
				syncStatus = ?,
				updatedAt = CURRENT_TIMESTAMP
			WHERE hybridRef = ?
			`,
			[
				sale.actualAmountPaid,
				sale.amountExpected,
				sale.uniqueRef,
				sale.discount,
				"success",
				hybridRef,
			],
		);

		// Get local sale id
		const rows = await db.select<{ id: number }[]>(
			`SELECT id FROM sales WHERE hybridRef = ?`,
			[hybridRef],
		);

		const saleId = rows[0]?.id;

		if (!saleId) {
			throw new Error(`Sale not found for ${hybridRef}`);
		}

		console.log(sale.breakdown, "BReakDOWN");
		console.log(saleId, "SaleID");

		// Update products
		for (const product of sale.breakdown ?? []) {
			await db.execute(
				`
				UPDATE sales_products
				SET
					costPrice = ?,
					discountPerUnit = ?,
					grossAmount = ?,
					margin = ?,
					netAmount = ?,
					recievableAmount = ?,
					salesRevenue = ?,
					sellingPrice = ?,
					totalDiscount = ?,
					vatAmount = ?,
					vatRate = ?,
					vatType = ?,
					updatedAt = CURRENT_TIMESTAMP
				WHERE saleId = ?
				AND productId = ?
				`,
				[
					product.costPrice,
					product.discountPerUnit,
					product.grossAmount,
					product.margin,
					product.netAmount,
					product.recievableAmount,
					product.salesRevenue,
					product.sellingPrice,
					product.totalDiscount,
					product.vatAmount,
					product.vatRate,
					product.vatType,
					saleId,
					product.id,
				],
			);
		}
	} catch (error) {
		console.error("Error syncing sale:", error);
		throw error;
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
          'price', sp.price,
		  'saleId', sp.saleId,
		  'discountType', sp.discountType
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
		[...params, limit, offset],
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

		const query = `
      INSERT INTO products (
        productId, name, price, image, isService, totalStock, barcode, costPrice, vatType, measurement
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(productId) DO UPDATE SET
        name = excluded.name,
        price = excluded.price,
        image = excluded.image,
        totalStock = excluded.totalStock,
        barcode = excluded.barcode,
        costPrice = excluded.costPrice,
		vatType = excluded.vatType,
		measurement = excluded.measurement;
    `;

		for (const p of products) {
			await db.execute(query, [
				p.id,
				p.summary ?? "",
				Number(p.price) || 0,
				p.image ?? null,
				p.isService ? 1 : 0,
				Number(p.totalStock) || 0,
				p.barcode ?? "",
				Number(p.costPrice) || 0,
				p.vatType,
				p.measureUnit,
			]);
		}
	} catch (err) {
		console.error(err, "Product Upload");
	}
};

export const upsertCustomerTypes = async (customer: any[]) => {
	try {
		const db = getDB();
		if (!db) return;

		const query = `
      INSERT INTO customerTypes (
        typeId, name, percentage, markType, isBiz
      ) VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(typeId) DO UPDATE SET
        name = excluded.name,
        percentage = excluded.percentage,
        markType = excluded.markType,
		isBiz = excluded.isBiz;
    `;

		for (const p of customer) {
			await db.execute(query, [
				p.id,
				p.name,
				p.price?.percentage ?? "",
				p.price?.type ?? "",
				p.isBiz ? 1 : 0,
			]);
		}
	} catch (err) {
		console.error(err, "TypeS Upload");
	}
};

export const upsertCustomers = async (
	customers: any[],
	isSubdealer: boolean,
) => {
	try {
		const db = getDB();
		if (!db) return;

		const sql = `
      INSERT INTO customers (
        customerId,
        name,
        email,
        balance,
        creditLimit,
        phone,
        isBiz,
		customerTypeId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(customerId) DO UPDATE SET
        name = excluded.name,
        balance = excluded.balance,
        creditLimit = excluded.creditLimit,
        phone = excluded.phone,
		customerTypeId = excluded.customerTypeId;
    `;

		for (const p of customers) {
			await db.execute(sql, [
				p.id,
				p.firstName ? `${p.firstName} ${p.lastName}` : p.name,
				p.email ?? "",
				Number(p.balance) || 0,
				Number(p.creditLimit) || 0,
				p.phoneNo ?? "",
				isSubdealer ? 1 : 0,
				p.customerType?.id,
			]);
		}
	} catch (err) {
		console.log("Error Uploading Customers:", err);
	}
};

export const syncDBShop = async (shopId: string) => {
	let res = await appService.fetchProducts(shopId);
	if (res?.rows?.length > 0) {
		await upsertProducts(res.rows);
	}
	let resC = await appService.fetchCustomers();
	console.log(resC, "RESC");
	if (resC?.rows?.length > 0) {
		await upsertCustomers(resC.rows, false);
	}
	let resS = await appService.fetchSubdealers();
	console.log(resS, "RESS");
	if (resS?.rows?.length > 0) {
		await upsertCustomers(resS.rows, true);
	}
	let resT = await appService.customerTypes();
	if (resT.business && resT.individual) {
		let biz = resT.business.map((b: any) => ({ ...b, isBiz: true }));
		let ind = resT.individual.map((i: any) => ({ ...i, isBiz: false }));
		await upsertCustomerTypes(biz.concat(ind));
	}
};

export const updateSaleSyncStatus = async (
	saleId: number,
	syncStatus: string,
	reason?: string,
) => {
	const db = getDB();
	try {
		await db.execute(
			`UPDATE sales
			 SET syncStatus = ?, failReason = ?
			 WHERE id = ?`,
			[syncStatus, reason || null, saleId],
		);
	} catch (err) {
		console.error("Error updating syncStatus:", err);
		throw err;
	}
};

export const updateSaleInfo = async (
	saleId: number,
	syncStatus: string,
	reason?: string,
) => {
	const db = getDB();
	try {
		await db.execute(
			`UPDATE sales
			 SET syncStatus = ?, failReason = ?
			 WHERE id = ?`,
			[syncStatus, reason || null, saleId],
		);
	} catch (err) {
		console.error("Error updating syncStatus:", err);
		throw err;
	}
};

export const syncSales = async () => {};

export const syncCustomers = async () => {};
