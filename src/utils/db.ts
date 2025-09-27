import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

export async function initDB() {
	try {
		if (db) return db;

		// Creates (or opens) a SQLite DB file in app’s local data dir
		db = await Database.load("sqlite:app.db");

		await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price REAL,
        image TEXT
      )
    `);
		console.log("DB Initialized");

		return db;
	} catch (err) {
		console.log(err, "ERR");
	}
}

export function getDB() {
	if (!db) throw new Error("DB not initialized. Call initDB() first.");
	return db;
}
