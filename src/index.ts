export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		// Route: GET /api/v0/words?length=N&count=M
		if (url.pathname !== "/api/v0/words") {
			return new Response("Not Found", { status: 404 })
		}

		const length = parseInt(url.searchParams.get("length") || "0");
		const count = Math.min(parseInt(url.searchParams.get("count") || "1"), 100);

		if (length < 3 || length > 8) {
			return new Response(
				JSON.stringify({ error: "length must be between 3 and 8" }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}

		const wordsJson = await env.WORDS.get(`words_${length}`);
		if (!wordsJson) {
			return new Response(
				JSON.stringify({ error: "something went wrong" }),
				{ status: 500, headers: { "Content-Type": "application/json" } },
			);
		}

		const words: string[] = JSON.parse(wordsJson);
		const selected: string[] = [];
		for (let i = 0; i < count; i++) {
			const randi = Math.floor(Math.random() * words.length);
			selected.push(words[randi].toLowerCase());
		}

		return new Response(
			JSON.stringify({ words: selected }),
			{ headers: { "Content-Type": "application/json" } },
		);
	},
} satisfies ExportedHandler<Env>;

