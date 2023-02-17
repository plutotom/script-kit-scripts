// Name: apa citation generator

import "@johnlindquist/kit";
const Cite = await npm("citation-js");

let example = await Cite.plugins.input.get("ISBNs");

// let apa = example.format("bibliography", {
//   format: "string",
//   template: "apa",
//   lang: "en-US",
// });

// URL to google book api
//https://developers.google.com/books/docs/v1/reference/volumes/list?apix=true&apix_params=%7B%22q%22:%22praying%20the%20bible%22%7D#try-it
