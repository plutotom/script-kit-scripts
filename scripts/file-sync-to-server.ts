// Name: file sync to server

import "@johnlindquist/kit";
import Rsync from "rsync";

declare enum RsyncStatusCode {
  0 = "Success",
  1 = "Syntax or usage error",
  2 = "Protocol incompatibility",
  3 = "Errors selecting input/output files, dirs",
}

// Equivalent to writing `rsync -a example-source/ example-destination/` on terminal
const rsync = new Rsync()
  // The -a flag means "archive" to say we are copying the full directory not just a file
  .flags("a")
  // Reads from the `.env` file in the project directory
  .source(process.env.SOURCE_DIR)
  .destination(process.env.DESTINATION_DIR);

rsync.execute((error, code: RsyncStatusCode, cmd) => {
  // List of rsync status codes
  // https://stackoverflow.com/a/20738063
  // console.log("backup completed with status code: " + RsyncStatusCode.code);
  console.log("backup completed with status code: " + RsyncStatusCode.code);
});
