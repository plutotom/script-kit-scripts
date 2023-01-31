// Name: Todoist to Mem
// Description: Takes a mem page url then sends it to notion
// Shortcut: cmd + shift + m

import "@johnlindquist/kit";

// do this to get types to come with import.
const { MemClient }: typeof import("@mem-labs/mem-node") = await npm(
  "@mem-labs/mem-node"
);
const { TodoistApi }: typeof import("@doist/todoist-api-typescript") =
  await npm("@doist/todoist-api-typescript");

const memAuth = await env("MEM_AUTH_TOKEN", "Please enter them mem api key");
const todoistAuth = await env(
  "TODOIST_AUTH_TOKEN",
  "Please enter them todoist api key"
);

const memToDoPage = "576f58c0-d1b9-4b64-b2f7-cd9d5f7d6b8b";
const todoistClient = await new TodoistApi(todoistAuth);
const memClient = await new MemClient({
  apiAccessToken: memAuth,
});

const todoistTasks = await todoistClient
  .getTasks()
  .catch((error) => dev(error));

//url
//content
//description
// get me todays date in a readable format
let todaysDate: Date | String = new Date();
let dd = String(todaysDate.getDate()).padStart(2, "0");
let mm = String(todaysDate.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = todaysDate.getFullYear();

todaysDate = mm + "/" + dd + "/" + yyyy;

let memTodoBody = `# Todoist Task ${todaysDate} \n #todoist \n`;
await todoistTasks.forEach((task) => {
  const taskContent = task.content;
  const taskUrl = task.url;
  const taskDescription = task.description;
  const taskDueDate = task.due?.string;
  memTodoBody += `* [ ] [${taskContent}](${taskUrl})\n`;
  if (taskDueDate) {
    memTodoBody += `  * ${taskDueDate}\n`;
  }
  if (taskDescription) {
    memTodoBody += `  * ${taskDescription}\n`;
  }
});

await memClient
  .createMem({
    content: memTodoBody,
  })
  .catch((error) => {
    dev(error);
  });

// const axios = await npm("axios");
// const response = await axios({
//   method: "post",
//   url: `https://api.mem.ai/v0/mems/${memToDoPage}/append`,

//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "ApiAccessToken 4f405468-fb2-48b8-942b-99805214391f",
//   },
//   data: { content: "fdsafsda" },
// })
//   .then((response) => {
//     dev(response.data);
//     dev("success");
//   })
//   .catch((error) => {
//     dev(error);
//   });
