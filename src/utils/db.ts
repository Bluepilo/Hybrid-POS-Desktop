import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

export async function initDB() {
	try {
		if (db) return db;

		db = await Database.load("sqlite:app.db");

		// Disable foreign key checks while dropping tables

		// await db.execute(`PRAGMA foreign_keys = OFF`);

		// await db.execute(`DROP TABLE IF EXISTS sales_products`);
		// await db.execute(`DROP TABLE IF EXISTS sales`);
		// await db.execute(`DROP TABLE IF EXISTS users`);
		// await db.execute(`DROP TABLE IF EXISTS products`);
		// await db.execute(`DROP TABLE IF EXISTS customers`);
		// await db.execute(`DROP TABLE IF EXISTS shops`);

		// await db.execute(`PRAGMA foreign_keys = ON`);

		await db.execute(`
			CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY,
				userId INTEGER UNIQUE,
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
				costPrice REAL,
				image TEXT,
				totalStock INT,
				isService BOOLEAN,
				barcode TEXT,
				measurement TEXT
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
				discount REAL,
				actorId INT,
				userId INT,
				isSubdealer BOOLEAN,
				hybridRef TEXT UNIQUE,
				uniqueRef TEXT,
				syncStatus TEXT,
				comment TEXT,
				createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (actorId) REFERENCES customers(customerId),
				FOREIGN KEY (userId) REFERENCES users(userId)
			)
		`);

		await db.execute(`
			CREATE TABLE IF NOT EXISTS sales_products (
				id INTEGER PRIMARY KEY,
				saleId INTEGER,
				productId INTEGER,
				quantity INTEGER,
				price REAL,
				createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (saleId) REFERENCES sales(id),
				FOREIGN KEY (productId) REFERENCES products(productId)
			)
		`);

		console.log("✅ Tables created successfully.");
		return db;
	} catch (err) {
		console.error("❌ DB initialization failed.", err);
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
