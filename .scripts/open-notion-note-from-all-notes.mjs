// .kenv/kenvs/windows-scripts/scripts/open-notion-note-from-all-notes.ts
import "@johnlindquist/kit";
var { Client } = await npm("@notionhq/client");
var notionToken = await env("NOTION_USER_TOKEN");
var notionDatabaseId = await env(
  "NOTION_ALL_NOTES_DATABASE_ID",
  "Enter your notes database ID"
);
var notion = new Client({ auth: process.env.NOTION_USER_TOKEN });
var notion_data_base = await (async () => {
  const response = await notion.databases.query({
    database_id: notionDatabaseId,
    page_size: 20
  });
  return response;
})();
var notionPageUrl = await arg(
  "Pick a project",
  notion_data_base.results.map((page) => ({
    name: page.properties.Name?.title[0]?.plain_text,
    description: page.properties.Area?.relation[0] + page.properties["#Tag"].relation[0],
    value: page.url
  }))
);
await applescript(String.raw`
    tell application "Notion"
        activate
        open location "${notionPageUrl}"
    end tell
`);
