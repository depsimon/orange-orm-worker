import orange from "orange-orm";

const map = orange.map(() => {})

let db: ReturnType<typeof map.postgres> | null = null;

orange.on("query", (query) => {
	console.log("DB Query:", query);
});

/**
 * Initialize the DB connection
 */
export async function initDatabase(connectionString: string) {
	if (!connectionString) {
		throw new Error("Database connection string is missing");
	}

	console.log("connecting to database at", connectionString);

	db = map.postgres(connectionString);

	return db;
}

/**
 * Get the DB connection.
 */
export function getDb() {
	if (!db) {
		throw new Error("Database not initialized");
	}

	return db;
}
