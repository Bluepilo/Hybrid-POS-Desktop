import { getDB } from "./db";

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
				uniqueRef,
				generatedRef
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				sale.shopId,
				sale.actualPaid,
				sale.amountExpected,
				sale.amountPaid,
				sale.actorId,
				sale.isSubdealer ? 1 : 0,
				sale.uniqueRef,
				sale.generatedRef,
			]
		);

		const result = await db.select<{ last_insert_rowid: number }[]>(
			"SELECT last_insert_rowid() as last_insert_rowid"
		);
		const saleId = result[0].last_insert_rowid;

		const salesCheck = await db.select("SELECT id FROM sales");
		const productsCheck = await db.select("SELECT productId FROM products");
		console.log("Sales IDs:", salesCheck);
		console.log("Products IDs:", productsCheck);
		console.log("Sale Products", sale.products);

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

		await db.execute("COMMIT");
		console.log("Sale and products inserted successfully");
	} catch (err) {
		await db.execute("ROLLBACK");
		console.error("Error inserting sale:", err);
		throw err;
	}
};

export const fetchSales = async () => {
	const db = getDB();

	try {
		const sales = await db.select<any[]>(`
      SELECT 
        s.id AS saleId,
        s.shopId,
        s.actualAmountPaid,
        s.amountExpected,
        s.amountPaid,
        s.actorId,
        s.isSubdealer,
        s.uniqueRef,
        s.generatedRef,
        json_group_array(
          json_object(
            'saleProductId', sp.id,
            'productId', sp.productId,
            'productName', p.name,
            'quantity', sp.quantity,
            'price', sp.price
          )
        ) AS products
      FROM sales s
      JOIN sales_products sp ON s.id = sp.saleId
      JOIN products p ON sp.productId = p.productId
      GROUP BY s.id
      ORDER BY s.id DESC
    `);

		// Parse JSON products back into arrays
		const formatted = sales.map((s) => ({
			...s,
			products: JSON.parse(s.products || "[]"),
		}));

		return formatted;
	} catch (err) {
		console.error("Error fetching sales with products:", err);
		throw err;
	}
};
