import { WorkerEntrypoint } from "cloudflare:workers";
import { initDatabase } from "~/database";

export default class Backend extends WorkerEntrypoint<CloudflareBindings> {
	override async fetch(request: Request) {
		const db = await initDatabase(
			"postgresql://wrangler:password@127.0.0.1:5432/postgres",
		);

		return Response.json({
            result: true,
			db: await db.query("SELECT 1"),
        })
	}
}
