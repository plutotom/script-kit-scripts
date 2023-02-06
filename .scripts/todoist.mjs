// .kenv/kenvs/windows-scripts/scripts/todoist.ts
import "@johnlindquist/kit";
var { TodoistApi } = await npm("@doist/todoist-api-typescript");
var { formatRelative } = await npm("date-fns");
var today = new Date();
var fromNow = (date) => formatRelative(new Date(date), today);
function sortTaskByDueDateOrOrder(a, b) {
  const dateA = a.due?.datetime ? new Date(a.due?.datetime).getTime() : Infinity;
  const dateB = b.due?.datetime ? new Date(b.due?.datetime).getTime() : Infinity;
  return dateA - dateB || a.order - b.order;
}
var apiKey = await env(
  "TODOIST_AUTH_TOKEN",
  "Please enter your Todoist API key"
);
var api = new TodoistApi(apiKey);
var allProjects = await api.getProjects();
var projectTabs = [{ id: void 0, name: "All" }, ...allProjects].reduce(
  (acc, project) => ({
    ...acc,
    [project.name]: async function(tasks) {
      if (!tasks) {
        tasks = await api.getTasks(
          project.id ? { project_id: project.id } : void 0
        );
      }
      const options = tasks.sort(sortTaskByDueDateOrOrder).map((task) => ({
        name: task.content,
        description: task.due?.datetime ? fromNow(task.due?.datetime) : void 0,
        value: task.id
      }));
      const taskIdToComplete = await arg(
        `Search for a task in "${project.name}"`,
        options
      );
      await api.closeTask(taskIdToComplete);
      await projectTabs[project.name](
        tasks.filter((t) => t.id !== taskIdToComplete)
      );
    }
  }),
  {}
);
var newTask = async () => {
  const content = await arg("What is your task about?");
  const dueString = await arg("Enter the due date or leave empty");
  const projectId = await arg(
    "In which project? (leave empty for Inbox)",
    allProjects.map((project) => ({
      name: project.name,
      value: project.id
    }))
  );
  try {
    await api.addTask({
      content,
      dueString,
      dueLang: "en",
      project_id: projectId
    });
    notify(`The task "${content}" was added!`);
  } catch (err) {
    await div(`<p class="m-4 px-6 py-2 rounded bg-white border" style="border-color: red;">
      🔴 The task could not be added: <code class="inline">${err.responseData}</code>
    </p>`);
  }
  await newTask();
};
onTab("New", newTask);
Object.keys(projectTabs).forEach((projectName) => {
  onTab(projectName, projectTabs[projectName]);
});
