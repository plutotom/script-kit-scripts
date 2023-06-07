// Name: Merge pdfs
// Author: Lucas Sierota
// Description: Merge multiple pdfs into one
// Dependencies:

import "@johnlindquist/kit";

import fs from "fs/promises";
const { PDFDocument } = await npm("pdf-lib");

let files = await drop("Drop your PDF files to merge");
let paths = [];
files.forEach((file) => {
  paths.push(file.path);
});

// keep adding paths until there's no input
while (
  (await arg({
    placeholder: "Select another?",
    hint: `Press only y or n? [y]/[n]`,
  })) === "y"
) {
  files = await drop("Drop your PDF files to merge");
  if (files != "" || files != null || files != []) {
    files.forEach((file) => {
      paths.push(file.path);
    });
  }
}

// merge the pdfs
const pdfsToMerge = await Promise.all(
  paths.map(async (path) => await fs.readFile(path))
);
let finalPath = await env("PDF_MERGE_OUTPUT_FOLDER_LOCATION", async () => {
  return selectFolder("Output folder?");
});

let finalName = await arg("Enter a name for the merged PDF");
finalPath = `${finalPath}/${finalName}.pdf`;

try {
  const mergedPdf = await PDFDocument.create();
  for (const pdfBytes of pdfsToMerge) {
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const buf = await mergedPdf.save(); // Uint8Array
  let exists = await pathExists(finalPath);
  if (!exists) {
    await writeFile(finalPath, buf);
  } else {
    // await div(md(`The path ${finalPath} already exists`));
    finalName + "1";
    await writeFile(finalPath, buf);
  }
} catch (e) {
  log(`Error: ${e}`);
  await div(md(`Error: ${e}`));
}

await div(md(`Merged PDF saved to ${finalPath}`));
