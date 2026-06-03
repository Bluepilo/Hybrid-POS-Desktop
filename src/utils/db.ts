import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

export async function initDB() {
	try {
		if (db) return db;

		db = await Database.load("sqlite:app.db");

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
				measurement TEXT,
				vatType TEXT
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
				isBiz BOOLEAN,
				customerTypeId INTEGER
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
				failReason TEXT,
				comment TEXT,
				customerName TEXT,
				customerEmail TEXT,
				customerPhoneNo TEXT,
				paymentMethodId INT,
				reference TEXT,
				transactionAt DATETIME,
				status TEXT,
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
				discountType TEXT,
				costPrice REAL,
				discountPerUnit REAL,
				grossAmount REAL,
				margin REAL,
				netAmount REAL,
				recievableAmount REAL,
				salesRevenue REAL,
				sellingPrice REAL,
				totalDiscount REAL,
				vatAmount REAL,
				vatRate REAL,
				vatType TEXT,
				createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (saleId) REFERENCES sales(id),
				FOREIGN KEY (productId) REFERENCES products(productId)
			)
		`);

		await db.execute(`
			CREATE TABLE IF NOT EXISTS transactions (
				id INTEGER PRIMARY KEY,
				actorId INTEGER,
				type TEXT,
				amount REAL,
				isCredit BOOLEAN,
				createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (actorId) REFERENCES customers(customerId)
			)
		`);

		await db.execute(`
			CREATE TABLE IF NOT EXISTS customerTypes (
				id INTEGER PRIMARY KEY,
				typeId INTEGER UNIQUE,
				name TEXT,
				percentage REAL,
				markType TEXT,
				createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				isBiz BOOLEAN
			)
		`);

		console.log("✅ Tables created successfully.");
		return db;
	} catch (err) {
		console.error("❌ DB initialization failed.", err);
		throw err;
	}
}

export async function clearDB() {
	try {
		if (!db) {
			console.log("No DB Instance");
			return;
		}

		// Disable foreign key checks while dropping tables

		await db.execute(`PRAGMA foreign_keys = OFF`);

		await db.execute(`DROP TABLE IF EXISTS sales_products`);
		await db.execute(`DROP TABLE IF EXISTS sales`);
		await db.execute(`DROP TABLE IF EXISTS users`);
		await db.execute(`DROP TABLE IF EXISTS products`);
		await db.execute(`DROP TABLE IF EXISTS customers`);
		await db.execute(`DROP TABLE IF EXISTS shops`);
		await db.execute(`DROP TABLE IF EXISTS customerTypes`);

		await db.execute(`PRAGMA foreign_keys = ON`);

		db = null;

		await initDB();
	} catch (err) {
		console.log(err, "Error Clearing DB");
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
				err,
			);
		}
	}
};
