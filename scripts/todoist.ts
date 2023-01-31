// Name: Todoist
// Description: Create and browse your Todoist Tasks
// Author: Vogelino
// Twitter: @soyvogelino

import "@johnlindquist/kit";
const { TodoistApi } = await npm("@doist/todoist-api-typescript");
const { formatRelative } = await npm("date-fns");

interface ProjectType {
  id: string;
  name: string;
}

interface TaskType {
  id: string;
  content: string;
  order: number;
  due?: {
    datetime: string;
  };
}

const today = new Date();
const fromNow = (date: string) => formatRelative(new Date(date), today);

function sortTaskByDueDateOrOrder(a: TaskType, b: TaskType) {
  const dateA = a.due?.datetime
    ? new Date(a.due?.datetime).getTime()
    : Infinity;
  const dateB = b.due?.datetime
    ? new Date(b.due?.datetime).getTime()
    : Infinity;
  return dateA - dateB || a.order - b.order;
}

const apiKey = await env(
  "TODOIST_AUTH_TOKEN",
  "Please enter your Todoist API key"
);

const api = new TodoistApi(apiKey);
const allProjects = (await api.getProjects()) as ProjectType[];

const projectTabs = [{ id: undefined, name: "All" }, ...allProjects].reduce(
  (acc, project) => ({
    ...acc,
    [project.name]: async function (tasks?: TaskType[]) {
      if (!tasks) {
        tasks = (await api.getTasks(
          project.id ? { project_id: project.id } : undefined
        )) as TaskType[];
      }
      const options = tasks.sort(sortTaskByDueDateOrOrder).map((task) => ({
        name: task.content,
        description: task.due?.datetime
          ? fromNow(task.due?.datetime)
          : undefined,
        value: task.id,
      }));
      const taskIdToComplete = await arg(
        `Search for a task in "${project.name}"`,
        options
      );

      await api.closeTask(taskIdToComplete);
      await projectTabs[project.name](
        tasks.filter((t) => t.id !== taskIdToComplete)
      );
    },
  }),
  {}
);

const newTask = async () => {
  const content = await arg("What is your task about?");
  const dueString = await arg("Enter the due date or leave empty");
  const projectId = await arg(
    "In which project? (leave empty for Inbox)",
    allProjects.map((project) => ({
      name: project.name,
      value: project.id,
    }))
  );
  try {
    await api.addTask({
      content,
      dueString,
      dueLang: "en",
      project_id: projectId,
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
