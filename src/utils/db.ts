import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

export async function initDB() {
	try {
		if (db) return db;

		// Creates (or opens) a SQLite DB file in app’s local data dir
		db = await Database.load("sqlite:app.db");

		await db.execute(`DROP TABLE IF EXISTS products`);

		await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
		productId INTEGER UNIQUE,
        name TEXT,
        price REAL,
        image TEXT
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
						`INSERT INTO products (productId, name, price, image)
							VALUES (?1, ?2, ?3, ?4)
							ON CONFLICT(productId) DO UPDATE SET
								name = excluded.name,
								price = excluded.price,
								image = excluded.image`,
						[p.id, p.name, parseFloat(p.price), p.image || null]
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
