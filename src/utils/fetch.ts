import { getDB } from "./db";

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
