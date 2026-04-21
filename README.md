# Random Word API

Simple word generator api hosted on Cloudflare Worker for [Furina's](https://github.com/thqnhz/furinabot) wordle minigame.

## Usage

```
GET /api/v0/words?length=N&count=M
```

Parameters:
- length (required): Word length (between 3 and 8 letters)
- count (optional): Number of words to return (default: 1, max: 100)

Example:

```bash
curl "https://api.thanhz.id.vn/api/v0/words?length=5&count=3
```

Response:

```json
{
    "words": ["exert", "marri", "drill"]
}
```

## Self host

You can self-host this api on your own Cloudflare Workers account.

1. Clone the repo:

```bash
git clone https://github.com/thqnhz/word-list-api.git
cd word-list-api
```

2. Install dependencies:

```bash
npm i
```

3. Login to Cloudflare:

```bash
npx wrangler login
```

4. Create KV namespace:

```bash
npx wrangler kv namespace create WORDS
```

It will prompt you to auto import the namespace id into `wrangler.jsonc`, you can press Enter to do it automatically.

Or you can change the `id` field of `kv_namespace` in `wrangler.jsonc` manually.

5. Populate the KV:

```bash
npx tsx scripts/populate-kv.ts
npm wrangler kv put --remote --namespace-id=YOUR_NAMESPACE_ID kv-bulk.json
```

6. Deploy

```bash
npx wrangler deploy
```

## License

The project is licensed under [MIT](LICENSE) license.

