# Notion Ops Agent Memory

## Auth Pattern

- `$MOTTO_SESSION_TOKEN` and `$MOTTO_API_KEY` are NOT set in the shell environment by default in sub-agent calls.
- Load from `.env`: `export $(grep -E '^MOTTO_API_KEY' "/Users/mottodigital-lewis/LOCAL EXECUTIVE AI AGENT REPO/Exectuive/.env" | xargs)`
- Always try `$MOTTO_SESSION_TOKEN` first; fall back to `$MOTTO_API_KEY` from `.env`.

## Database Creation (Notion Proxy)

- Endpoint: `POST /proxy/notion/v1/databases`
- Parent must be `{"type": "page_id", "page_id": "UUID"}` for inline databases on a page.
- `is_inline: true` creates the database embedded in the page (not a standalone page).
- Property type keys: `title`, `select`, `rich_text`, `url`, `email`, `phone_number`, `checkbox`, `number`, `relation`, `date`.
- Select options must include `name` and `color`; valid colors: `blue`, `yellow`, `orange`, `green`, `red`, `pink`, `purple`, `gray`, `brown`, `default`.

## Known Database IDs

| Database | ID |
|----------|-----|
| Inbound Requests (AIOS Website Outreach) | `31fe0cb5-63d9-8114-95db-f96be3919a34` |
| Parent: Website Outreach System project page | `30ce0cb5-63d9-8153-92a8-e4f95d745224` |
