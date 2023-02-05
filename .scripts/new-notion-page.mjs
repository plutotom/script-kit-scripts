// .kenv/kenvs/plutotom/scripts/new-notion-page.ts
import "@johnlindquist/kit";
var { Client } = await npm("@notionhq/client");
var notionToken = await env("NOTION_USER_TOKEN");
var notionDatabaseId = await env("NOTION_DATABASE_ID");
var notion = new Client({ auth: process.env.NOTION_USER_TOKEN });
var notion_page_res = await (async () => {
  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: `${notionDatabaseId}`
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: "From Script kit: placeholder"
            }
          }
        ]
      }
    }
  });
  return response;
})();
await applescript(String.raw`
    tell application "Notion"
        activate
        open location "${notion_page_res.url}"
    end tell
`);
