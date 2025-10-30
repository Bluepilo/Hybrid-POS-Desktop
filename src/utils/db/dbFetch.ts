import { getDB } from "../db";

export const fetchAllSales = async ({
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
		whereClauses.push("DATE(s.createdAt) BETWEEN DATE(?) AND DATE(?)");
		params.push(startDate, endDate);
	}

	const whereSQL = whereClauses.length
		? `WHERE ${whereClauses.join(" AND ")}`
		: "";

	// 1️⃣ Count total matching records
	const totalResult = await db.select<any[]>(
		`
    SELECT COUNT(DISTINCT s.id) AS total
    FROM sales s
    LEFT JOIN customers c ON s.actorId = c.customerId
    LEFT JOIN users u ON s.userId = u.userId
    ${whereSQL}
    `,
		params
	);

	const total = totalResult[0]?.total || 0;
	const totalPages = Math.ceil(total / limit);

	// 2️⃣ Fetch paginated data
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

	const sales = rows.map((row) => ({
		...row,
		products: row.products ? JSON.parse(row.products) : [],
	}));

	// 3️⃣ Return structured pagination response
	return {
		data: sales,
		currentPage: page,
		limit,
		total,
		totalPages,
	};
};

export const getSalesProducts = async ({
	page = 1,
	limit = 10,
	saleId = null,
	startDate = null,
	endDate = null,
}) => {
	const db = getDB();
	const offset = (page - 1) * limit;

	let whereClauses: string[] = [];
	let params: (string | number)[] = [];

	if (saleId) {
		whereClauses.push("sp.saleId = ?");
		params.push(saleId);
	}

	if (startDate && endDate) {
		whereClauses.push("DATE(sp.createdAt) BETWEEN DATE(?) AND DATE(?)");
		params.push(startDate, endDate);
	}

	const whereSQL = whereClauses.length
		? `WHERE ${whereClauses.join(" AND ")}`
		: "";

	// 1️⃣ Count total matching records
	const totalResult = await db.select<any[]>(
		`
    SELECT COUNT(sp.id) AS total
    FROM sales_products sp
    LEFT JOIN sales s ON s.id = sp.saleId
    LEFT JOIN products p ON p.productId = sp.productId
    ${whereSQL}
    `,
		params
	);

	const total = totalResult[0]?.total || 0;
	const totalPages = Math.ceil(total / limit);

	// 2️⃣ Fetch paginated data with populated sale & product
	const rows = await db.select<any[]>(
		`
    SELECT
      sp.*,
      p.name AS productName,
      s.hybridRef AS saleRef,
      s.actorId,
      s.userId,
      s.createdAt AS saleCreatedAt,
      c.name AS actorName
    FROM sales_products sp
    LEFT JOIN sales s ON s.id = sp.saleId
    LEFT JOIN products p ON p.productId = sp.productId
    LEFT JOIN customers c ON c.customerId = s.actorId
    ${whereSQL}
    ORDER BY sp.createdAt DESC
    LIMIT ? OFFSET ?
    `,
		[...params, limit, offset]
	);

	// 3️⃣ Format response
	const data = rows.map((row) => ({
		id: row.id,
		saleId: row.saleId,
		saleRef: row.saleRef,
		productId: row.productId,
		productName: row.productName,
		quantity: row.quantity,
		price: row.price,
		actorId: row.actorId,
		actorName: row.actorName,
		saleCreatedAt: row.saleCreatedAt,
		createdAt: row.createdAt,
		updatedAt: row.updatedAt,
	}));

	// 4️⃣ Return structured pagination response
	return {
		data,
		currentPage: page,
		limit,
		total,
		totalPages,
	};
};

export const fetchProductsFromDB = async () => {
	try {
		const db = getDB();

		// fetch all products
		const result = await db.select(
			"SELECT * FROM products ORDER BY name ASC"
		);

		return result;
	} catch (err) {
		console.error("Failed to fetch products from DB:", err);
		throw err;
	}
};

export const fetchCustomersFromDB = async () => {
	try {
		const db = getDB();

		// fetch all products
		const result = await db.select(
			"SELECT * FROM customers ORDER BY name ASC"
		);

		return result;
	} catch (err) {
		console.error("Failed to fetch products from DB:", err);
		throw err;
	}
};

export const getSaleByUniqueRef = async (hybridRef: string) => {
	const db = getDB();

	// 1️⃣ Fetch the main sale record
	const saleRows = await db.select<any[]>(
		`
    SELECT
      s.*,
      u.name AS userName,
      c.customerId,
      c.name AS actorName,
      c.email AS actorEmail,
      c.phone AS actorPhone,
      c.balance AS actorBalance,
      c.creditLimit AS actorCreditLimit,
      c.isSubdealer AS isSubdealer
    FROM sales s
    LEFT JOIN customers c ON s.actorId = c.customerId
    LEFT JOIN users u ON s.userId = u.userId
    WHERE s.hybridRef = ?
    LIMIT 1
    `,
		[hybridRef]
	);

	if (saleRows.length === 0) return null;

	const sale = saleRows[0];

	// 2️⃣ Fetch the products attached to this sale
	const productRows = await db.select<any[]>(
		`
    SELECT
      sp.id,
      sp.productId,
      p.name AS productName,
      sp.quantity,
      sp.price
    FROM sales_products sp
    LEFT JOIN products p ON p.productId = sp.productId
    WHERE sp.saleId = ?
    `,
		[sale.id]
	);

	return {
		id: sale.id,
		hybridRef: sale.hybridRef,
		shopId: sale.shopId,
		actorId: sale.actorId,
		userId: sale.userId,
		userName: sale.userName,
		actualAmountPaid: sale.actualAmountPaid,
		amountExpected: sale.amountExpected,
		amountPaid: sale.amountPaid,
		isSubdealer: sale.isSubdealer,
		createdAt: sale.createdAt,
		updatedAt: sale.updatedAt,
		actor: {
			id: sale.customerId,
			name: sale.actorName,
			email: sale.actorEmail,
			phone: sale.actorPhone,
			isSubdealer: sale.isSubdealer,
			balance: sale.actorBalance,
			creditLimit: sale.actorCreditLimit,
		},
		products: productRows.map((p) => ({
			id: p.id,
			productId: p.productId,
			productName: p.productName,
			quantity: p.quantity,
			price: p.price,
		})),
	};
};
