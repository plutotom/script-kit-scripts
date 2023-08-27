// Name: add reading log
// aliases: log
import "@johnlindquist/kit";
const { Client } = await npm("@notionhq/client");

let notionToken = await env("NOTION_USER_TOKEN");
let notionDatabaseId = await env(
  "NOTION_READING_LOG_DATABASE_ID",
  "Enter your notes database ID"
);

const notion = new Client({ auth: notionToken });
let bookLogBookList = await (async () => {
  const response = await notion.databases.retrieve({
    database_id: notionDatabaseId,
  });
  return response.properties.Book.select.options;
})();

let selectedBookId = await arg(
  "Pick a book",
  bookLogBookList.map((book) => ({
    name: book.name,
    value: book.id,
  }))
);
let bookTitle = bookLogBookList.find((book) => book.id === selectedBookId).name;

// get list of books from notion database
let [name, end_page, read_pages, book] = await fields([
  {
    name: "Entry Name",
    label: "entry_name",
    type: "text",
    placeholder: "Entry Name",
    value: `Reading Log: ${String(new Date().toLocaleString())} ${bookTitle}`,
  },
  {
    required: true,
    name: "End Page",
    label: "end_page",
    type: "number",
    placeholder: "40",
  },
  {
    required: true,
    name: "Read pages",
    label: "read_pages",
    type: "number",
    placeholder: "40",
  },
  {
    name: "Book",
    label: "book",
    type: "text",
    value: bookTitle,
  },
]);

// post this to the notion database
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
              content: name,
            },
          },
        ],
      },
      "End Page": {
        number: Number(end_page),
      },
      "Pages Read": {
        number: Number(read_pages),
      },
      Book: {
        select: {
          name: book,
        },
      },
    },
  });
  return response;
})();
await exit();
