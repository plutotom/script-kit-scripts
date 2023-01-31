// .kenv/kenvs/plutotom/scripts/mem-to-notion.ts
import "@johnlindquist/kit";
var { MemClient } = await npm(
  "@mem-labs/mem-node"
);
var { TodoistApi } = await npm("@doist/todoist-api-typescript");
var memAuth = await env("MEM_AUTH_TOKEN", "Please enter them mem api key");
var todoistAuth = await env(
  "TODOIST_AUTH_TOKEN",
  "Please enter them todoist api key"
);
var todoistClient = await new TodoistApi(todoistAuth);
var memClient = await new MemClient({
  apiAccessToken: memAuth
});
var todoistTasks = await todoistClient.getTasks().catch((error) => dev(error));
var todaysDate = new Date();
var dd = String(todaysDate.getDate()).padStart(2, "0");
var mm = String(todaysDate.getMonth() + 1).padStart(2, "0");
var yyyy = todaysDate.getFullYear();
todaysDate = mm + "/" + dd + "/" + yyyy;
var memTodoBody = `# Todoist Task ${todaysDate} 
 #todoist 
`;
await todoistTasks.forEach((task) => {
  const taskContent = task.content;
  const taskUrl = task.url;
  const taskDescription = task.description;
  const taskDueDate = task.due?.string;
  memTodoBody += `* [ ] [${taskContent}](${taskUrl})
`;
  if (taskDueDate) {
    memTodoBody += `  * ${taskDueDate}
`;
  }
  if (taskDescription) {
    memTodoBody += `  * ${taskDescription}
`;
  }
});
await memClient.createMem({
  content: memTodoBody
}).catch((error) => {
  dev(error);
});
