// Menu: Update EpicReact deps (Example)
// Description: Update all the dependencies in the epicreact workshop repos

const repos = [
  "advanced-react-hooks",
  "advanced-react-patterns",
  "bookshelf",
  "react-fundamentals",
  "react-hooks",
  "react-performance",
  "react-suspense",
  "testing-react-apps",
];

const script = `git add -A && git stash && git checkout main && git pull && git commit -am 'update from kit' --no-verify && git push && git status`;
for (const repo of repos) {
  const scriptString = JSON.stringify(
    `cd ~/code/epic-react/${repo} && ${script}`
  );
  //   exec(
  //     `osascript -e 'tell application "Terminal" to activate' -e 'tell application "Terminal" to do script ${scriptString}'`
  //   );
  // or
  terminal(scriptString); // (I don't need to await this because I don't care about waiting)
}
