// Name: New Notion Page

import "@johnlindquist/kit";
const { Client } = await npm("@notionhq/client");

// gets the last copied item
// let [latest] = await getClipboardHistory()
// let { value: url } = latest
let notionToken = await env("NOTION_USER_TOKEN");
let notionDatabaseId = await env("NOTION_DATABASE_ID");

const notion = new Client({ auth: process.env.NOTION_USER_TOKEN });

let notion_page_res = await (async () => {
  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: `${notionDatabaseId}`,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `New Note: ${String(new Date().toLocaleString())}`,
            },
          },
        ],
      },
    },
  });
  return response;
})();

// await applescript(String.raw`
//     tell application "Notion"
//         activate
//         open location "${notion_page_res.url}"
//     end tell
// `);

// opens in browser
await open(notion_page_res.url);
