import appService from "../../redux/app/appService";
import { getDB } from "../db";

export const insertSaleWithProducts = async (sale: any) => {
	const db = getDB();
	if (!db) return;

	try {
		const insertSaleSQL = `
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

		const saleParams = [
			sale.shopId,
			Number(sale.amountPaid) || 0,
			Number(sale.amountExpected) || 0,
			Number(sale.amountPaid) || 0,
			sale.actorId,
			sale.isSubdealer ? 1 : 0,
			sale.hybridRef ?? "",
			sale.userId,
			sale.syncStatus ?? "",
			sale.comment ?? "",
			Number(sale.discount) || 0,
			sale.customerName ?? "",
			sale.customerPhoneNo ?? "",
			sale.customerEmail ?? "",
			sale.isDeposit ? 1 : 0,
			sale.paymentMethodId ?? 0,
		];

		await db.execute(insertSaleSQL, saleParams);

		// 2️⃣ Get the saleId using last_insert_rowid()
		const row = await db.select<{ id: number }[]>(
			"SELECT last_insert_rowid() as id;"
		);
		const saleId = row[0]?.id;

		if (!saleId) throw new Error("Failed to retrieve saleId");

		if (sale.products?.length > 0) {
			const productSQL = `
        INSERT INTO sales_products (
          saleId,
          productId,
          quantity,
          price
        ) VALUES (?, ?, ?, ?);
      `;

			for (const p of sale.products) {
				await db.execute(productSQL, [
					saleId,
					p.id,
					Number(p.quantity) || 0,
					Number(p.price) || 0,
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
				[Number(sale.balance) || 0, customerId]
			);
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

		const query = `
      INSERT INTO products (
        productId, name, price, image, isService, totalStock, barcode, costPrice
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(productId) DO UPDATE SET
        name = excluded.name,
        price = excluded.price,
        image = excluded.image,
        totalStock = excluded.totalStock,
        barcode = excluded.barcode,
        costPrice = excluded.costPrice;
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
			]);
		}
	} catch (err) {
		console.error(err, "Product Upload");
	}
};

export const upsertCustomers = async (
	customers: any[],
	isSubdealer: boolean
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
        isSubdealer
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(customerId) DO UPDATE SET
        name = excluded.name,
        balance = excluded.balance,
        creditLimit = excluded.creditLimit,
        phone = excluded.phone;
    `;

		for (const p of customers) {
			await db.execute(sql, [
				p.id,
				p.fullName ?? "",
				p.email ?? "",
				Number(p.balance) || 0,
				Number(p.creditLimit) || 0,
				p.phoneNo ?? "",
				isSubdealer ? 1 : 0,
			]);
		}
	} catch (err) {
		console.log("Error Uploading Customers:", err);
	}
};

export const syncDBShop = async (shopId: string) => {
	let res = await appService.fetchProducts(shopId);
	if (res?.rows?.length > 0) {
		console.log(res.rows, "producrs");
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
