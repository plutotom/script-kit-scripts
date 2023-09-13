//  Name: notion quotes
// Description: Goes into my book database, then grabs a random quote and puts it in my daily notes
import "@johnlindquist/kit";
import { Client } from "@notionhq/client";
let notionToken = await env("NOTION_USER_TOKEN");
let notionDatabaseId = await env(
  "NOTION_BOOKLIST_DATABASE_ID",
  "Enter your Booklist database ID"
);
const notion = new Client({ auth: notionToken });
//  grab a random 5 books from the database
let bookList = await (async () => {
  const response = await notion.databases.query({
    database_id: notionDatabaseId,
    page_size: 100,
  });
  return response.results;
})();
let randomBooks = bookList
  .sort(() => Math.random() - Math.random())
  .slice(0, 5);
//    get the content of each book
let randomQuotes = [];
//   loop though each book finding all the quotes that are in each book page. Get the blocks of the pages
randomBooks.forEach(async (book) => {
  let bookPage = await notion.blocks.children.list({
    block_id: book.id,
    page_size: 100,
  });
  //   loop through each block and find the quotes
  bookPage.results.forEach((block) => {
    if (block.type === "child_page") {
      // get the content of the page
      let pageContent = block.child_page;
      //  loop through each block of the page
      pageContent.blocks.forEach((block) => {
        if (block.type === "quote") {
          randomQuotes.push(block.quote.text[0].plain_text);
        }
      });
    } else if (block.type === "quote") {
      randomQuotes.push(block.quote.text[0].plain_text);
    }
  });
});
await dev(randomQuotes);
//    now get the link to each book
let link = randomBooks.map((book) => {
  return `https:www.notion.so/${book.id.replace(/-/g, "")}`;
});
//  let quotesMessage = [  ` ${randomBooks[0].properties.Name.title[0].plain_text} - ${randomBooks[0].properties.Author.rich_text[0].plain_text}`,

// //  > ${randomQuote[0]} [${link[0]}]`,   `> ${randomQuote[1]} [${link[1]}]`,   `> ${randomQuote[2]} [${link[2]}]`,   `>
//  ${randomQuote[3]} [${link[3]}]`,   `
//  > ${randomQuote[4]} [${link[4]}]`,  ].join("\n\n");   await dev(quotesMessage);
