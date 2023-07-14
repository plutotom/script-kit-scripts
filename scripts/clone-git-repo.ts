// Name: Clone A Repository
// Author: Most coded from Orhan Erday then i added onto it
// Twitter: @orhan_erday

import "@johnlindquist/kit";
const { Octokit } = await npm("octokit");

// const projectLocation = await env(
//   "PROJECT_LOCATION",
//   "Enter project location (defaults to home dir), i.e. /Documents/Coding"
// );

// var w = await widget(
//   `<div style="margin:10px;">

//       <h1 style="color: black;">Set your project location </h1>
//       <p style="color: black;">i.e. /Documents/Coding</p>
//     </div>
//     `,
//   {
//     width: 300,
//     height: 75,
//   }
// );

let projectLocation = await env("PROJECT_LOCATION", async () => {
  return selectFolder("Coding Folder Location?");
});

interface RawRepositoryType {
  id: string;
  name: string;
  html_url: string;
  full_name: string;
  visibility: string[];
  description: string;
  homepage?: string;
  owner: {
    login: string;
  };
  open_issues_count: number;
}

interface OptionType<ValueType = unknown> {
  name: string;
  description?: string;
  preview?: string;
  value: ValueType;
}

const auth = await env(`GH_CLASSIC_TOKEN`, "Enter your GitHub access token");
const octokit = new Octokit({ auth });

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();

const cloneAndOpenRepo = async (repo, name) =>
  await term({
    //defaults to home dir
    cwd: projectLocation,
    command: `git clone ${repo} && cd ${name} && code .`,
    // The footer is optional. All terms continue with the same shortcuts
    footer: `ctrl+c or cmd+enter to continue`,
  });

const mapRawRepo = (repo: RawRepositoryType) => ({
  name: repo.full_name,
  description: [
    repo.visibility[0].toUpperCase() + repo.visibility.slice(1),
    repo.description,
    repo.homepage,
  ]
    .filter(Boolean)
    .join("  ·  "),
  value: repo,
});

const mapReposResponse = (response: { data: RawRepositoryType[] }) =>
  (response.data || []).map(mapRawRepo);

async function fetchAllRepos() {
  return await octokit.paginate(
    octokit.rest.repos.listForAuthenticatedUser,
    { sort: "updated", per_page: 100 },
    mapReposResponse
  );
}

async function fetchRecentRepos() {
  const res = await octokit.request("GET /user/repos", {
    sort: "updated",
    per_page: 50,
  });
  return res.data;
}

async function fetchOwnerRepos() {
  const res = await octokit.request("GET /user/repos", {
    sort: "updated",
    per_page: 50,
    affiliation: "owner",
  });
  return res.data;
}

function getTabHandler(getter: () => Promise<OptionType<RawRepositoryType>[]>) {
  return async function handler() {
    const repos = await getter();
    const repoSelected = await arg(`Hello ${login}. Search for a repo`, repos);
    let name = repoSelected.name;

    if (repos.length === 0) {
      await div(`<div class="p-4 bg-white">No repos</div>`);
      await handler();
    }

    await cloneAndOpenRepo(repoSelected.clone_url, name);
    await exit();
  };
}

async function cloneByUrl(input = "") {
  let repo = await arg("Enter a repository, i.e: orhanerday/open-ai");
  let name = repo.split("/")[1];
  cloneAndOpenRepo(repo, name);
  // Call toggle to keep the prompt open and create another todo
  // await fetchNoRepos();
}

const recentTab = getTabHandler(fetchRecentRepos);
onTab("Recent", recentTab);
onTab("Owner", getTabHandler(fetchOwnerRepos));
onTab("All", getTabHandler(fetchAllRepos));
onTab("clone by url", cloneByUrl);

await recentTab();
