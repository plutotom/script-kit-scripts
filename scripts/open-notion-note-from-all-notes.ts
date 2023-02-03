// Name: open notion note from all notes

import "@johnlindquist/kit";
const { Client } = await npm("@notionhq/client");

// gets the last copied item
// let [latest] = await getClipboardHistory()
// let { value: url } = latest
let notionToken = await env("NOTION_USER_TOKEN");
let notionDatabaseId = await env(
  "NOTION_ALL_NOTES_DATABASE_ID",
  "Enter your notes database ID"
);
const notion = new Client({ auth: process.env.NOTION_USER_TOKEN });

let notion_data_base = await (async () => {
  const response = await notion.databases.query({
    database_id: notionDatabaseId,
    page_size: 20,
  });
  return response;
})();

// await dev(
//   notion_data_base.results.filter((page) => {
//     return page.properties["#Tag"]?.relation !== null;
//   })
// );
// await dev(notion_data_base);

// await inspect("");
let notionPageUrl = await arg(
  "Pick a project",
  notion_data_base.results.map((page) => ({
    name: page.properties.Name?.title[0]?.plain_text,
    description:
      page.properties.Area?.relation[0] + page.properties["#Tag"].relation[0],
    value: page.url,
  }))
);

// await dev(notionPageUrl);

await applescript(String.raw`
    tell application "Notion"
        activate
        open location "${notionPageUrl}"
    end tell
`);

// opens in browser
// await open(notion_page_res.url);
