// Name: csv Valadator

import "@johnlindquist/kit";
import CSVFileValidator from "csv-file-validator";

import * as fs from "fs";

const config = {
  isHeaderNameOptional: false,
  isColumnIndexAlphabetic: false,
  headers: [
    {
      name: "Highlight",
      inputName: "Highlight",
      required: true,
      requiredError: function (headerName, rowNumber, columnNumber) {
        return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
      },
    },
    {
      name: "Title",
      inputName: "Title",
      required: false,
      optional: true,
    },
    {
      name: "Author",
      inputName: "Author",
      unique: false,
      optional: true,
    },
    {
      name: "ISBN",
      inputName: "ISBN",
      optional: true,
    },
    {
      name: "Location",
      inputName: "Location",
      optional: true,
      validate: function (value) {
        return !isNaN(value);
      },
      validateError: function (headerName, rowNumber, columnNumber) {
        return `${headerName} is not a valid number in the ${rowNumber} row / ${columnNumber} column`;
      },
    },
    {
      name: "Tags",
      inputName: "Tags",
      optional: true,
    },
    {
      name: "Note",
      inputName: "Note",
      optional: true,
    },
    {
      name: "Date",
      inputName: "Date",
      optional: true,
    },
  ],
};

let fileFirst = await drop("Drop your PDF files to merge");
let path = await fileFirst[0].path;

// path = "/Users/plutotom/Downloads/Highlights for The End of Apologetics.csv";
let file = await fs.readFileSync(path, "utf8");
let csvData,
  error,
  isError = false;

await CSVFileValidator(file, config)
  .then((data) => {
    data.data; // Array of objects from file
    data.inValidData; // Array of error messages
    if (data.inValidData.length > 0) {
      csvData = data;
      isError = true;
      error = data.inValidData;
    }
  })
  .catch((err) => {
    dev({ error: err, unsure: "somthing went wrong idk error" });
  });

if (isError) {
  // error looks like htis Error: [{"rowIndex":2,"columnIndex":5,"message":"Location is not a valid number in the 2 row / 5 column"}]
  let html = "<table>";
  html += "<tr><th>Row Index</th><th>Column Index</th><th>Message</th></tr>";
  await error.forEach(async (errorRow) => {
    html += `<tr><td>Row Index: ${errorRow.rowIndex}: </td><td>${errorRow.columnIndex}</td><td>${errorRow.message}</td></tr>`;
  });
  html += "</table>";
  await div(md(html));
} else {
  await div(md(`All is good`));
}
