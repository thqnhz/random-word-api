import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = "./data";

function main() {
	const entries: { key: string; value: string }[] = [];
	for (let length = 3; length <= 8; length++) {
		const filepath = join(DATA_DIR, `${length}_letter.txt`);
		const content = readFileSync(filepath, "utf-8");
		const words = content.trim().split(" ");

		entries.push({
			key: `words_${length}`,
			value: JSON.stringify(words),
		});
	}
	writeFileSync("./kv-bulk.json", JSON.stringify(entries, null, 2));
}

main();

