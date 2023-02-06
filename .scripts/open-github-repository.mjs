// Users/plutotom/.kenv/kenvs/plutotom/scripts/open-github-repository.ts
import "@johnlindquist/kit";
var { Octokit } = await npm("octokit");
var auth = await env(`GH_CLASSIC_TOKEN`, "Enter your GitHub access token");
var octokit = new Octokit({ auth });
var {
  data: { login }
} = await octokit.rest.users.getAuthenticated();
var mapRawRepo = (repo) => ({
  name: repo.full_name,
  description: [
    repo.visibility[0].toUpperCase() + repo.visibility.slice(1),
    repo.description,
    repo.homepage
  ].filter(Boolean).join("  ·  "),
  value: repo
});
var mapReposResponse = (response) => (response.data || []).map(mapRawRepo);
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
    per_page: 50
  });
  return res.data;
}
async function fetchOwnerRepos() {
  const res = await octokit.request("GET /user/repos", {
    sort: "updated",
    per_page: 50,
    affiliation: "owner"
  });
  return res.data;
}
function getTabHandler(getter) {
  return async function handler() {
    const repos = await getter();
    const repoSelected = await arg(`Hello ${login}. Search for a repo`, repos);
    if (repos.length === 0) {
      await div(`<div class="p-4 bg-white">No repos</div>`);
      await handler();
    }
    await browse(repoSelected.html_url);
    exit();
  };
}
var recentTab = getTabHandler(fetchRecentRepos);
onTab("Recent", recentTab);
onTab("Owner", getTabHandler(fetchOwnerRepos));
onTab("All", getTabHandler(fetchAllRepos));
await recentTab();
