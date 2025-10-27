import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

export async function initDB() {
	try {
		if (db) return db;

		// Creates (or opens) a SQLite DB file in app’s local data dir
		db = await Database.load("sqlite:app.db");

		//await db.execute(`DROP TABLE IF EXISTS users`);
		// await db.execute(`DROP TABLE IF EXISTS products`);
		//await db.execute(`DROP TABLE IF EXISTS customers`);
		// await db.execute(`DROP TABLE IF EXISTS shops`);
		// await db.execute(`DROP TABLE IF EXISTS sales`);
		//await db.execute(`DROP TABLE IF EXISTS sales_products`);

		await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
		userId TEXT UNIQUE,
		name TEXT,
        loginId TEXT,
        password TEXT,
		lastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

		await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
		productId INTEGER UNIQUE,
        name TEXT,
        price REAL,
        image TEXT,
		totalStock INT,
		isService BOOLEAN
      )
    `);

		await db.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY,
		customerId INTEGER UNIQUE,
        name TEXT,
        email TEXT,
        balance REAL,
		creditLimit REAL,
		phone TEXT,
		isSubdealer BOOLEAN
      )
    `);

		await db.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY,
		shopId INTEGER,
        actualAmountPaid REAL,
        amountExpected REAL,
        amountPaid REAL,
		actorId INT,
		isSubdealer BOOLEAN,
		uniqueRef TEXT,
		generatedRef TEXT,
		FOREIGN KEY (actorId) REFERENCES customers(customerId)
      )
    `);

		await db.execute(`
	CREATE TABLE IF NOT EXISTS sales_products (
		id INTEGER PRIMARY KEY,
		saleId INTEGER,
		productId INTEGER,
		quantity INTEGER,
		price REAL,
		FOREIGN KEY (saleId) REFERENCES sales (id),
		FOREIGN KEY (productId) REFERENCES products (productId)
	)
	`);

		console.log("Table Created and DB Initialized.");

		return db;
	} catch (err) {
		console.log(err, "ERR");
		throw err;
	}
}

export function getDB() {
	if (!db) throw new Error("DB not initialized. Call initDB() first.");
	return db;
}

export const alterColumn = async () => {
	const db = getDB();
	if (db) {
		try {
			await db.execute(`
    ALTER TABLE products ADD COLUMN productID INTEGER
  `);
			console.log("productID column added");
		} catch (err) {
			console.warn(
				"Could not add productID column (maybe it already exists):",
				err
			);
		}
	}
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
						`INSERT INTO products (productId, name, price, image, isService, totalStock)
							VALUES (?1, ?2, ?3, ?4, ?5, ?6)
							ON CONFLICT(productId) DO UPDATE SET
								name = excluded.name,
								price = excluded.price,
								image = excluded.image`,
						[
							p.id,
							p.summary,
							parseFloat(p.price),
							p.image || null,
							p.isService,
							Number(p.totalStock),
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
								creditLimit = excluded.creditLimit`,
						[
							p.id,
							p.fullName,
							p.email,
							parseFloat(p.balance),
							p.creditLimit ? parseFloat(p.creditLimit) : 0,
							p.phone,
							isSubdealer,
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
