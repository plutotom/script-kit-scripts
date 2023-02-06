// Preview: docs
// Name: test-cron-job
// Schedule: */15 * * * *

import "@johnlindquist/kit";
// tail -f ~/.kenv/kenv/plutotom/logs/test-cron-job.log
// await notify(`Stand up and stretch`);

// // Name: test-cron-job
// // Schedule: * /5 * * *

// import "@johnlindquist/kit";

// let [color1, color2, color3] = await fields({
//   onChange: (input, state) => {
//     setHint(state.value);
//   },
//   fields: [{ type: "color" }, { type: "color" }, { type: "color" }],
// });

// await widget("<div>test</div>");

// await term("brew install nmap");
// let res = await term(`nmap -p 3000-3010 --open 192.168.1.0/24`); // scans from 192.168.1.0 to 192.168.1.255
// let res = await term(`git`);
// await $.shell = "/usr/bin/bash";

// let res = await exec(
//   "/opt/homebrew/bin/nmap -p 3000-3010 --open 192.168.1.0/24"
// );
// only scan ips between 100 and 110 and prts 3000-3010
// let res = await $`/opt/homebrew/bin/nmap -p 3000-3010 --open`;

// using nmap list out all host on the network that are running on port 3000-3010 and their ip addresses

// let res = await $`/opt/homebrew/bin/nmap -sV -p 3000-3010 10.0.0/24`;

// sort res and reutrn their ip addresses, ports, and version
let res =
  await $`/opt/homebrew/bin/nmap -sV -p 3000-3010 10.0.0/24 | grep -E "Nmap scan report for|PORT|open|MAC Address"`;

// let res = await $`nmap -v`;

await dev(res.stdout);
// await dev(res.stdout);
// let res = await $`dep`; //
// let res = await term({
//   //defaults to home dir
//   cwd: `~/.kenv/scripts`,
//   command: `nmap`,
// });
// await dev(res /* .stdout */);

// #!/usr/bin/env zx
// let ProcessOutput.toString()
// let content = JSON.parse(await ProcessOutput.stdin());
//
// process.env;

// list out all servers runnon on the network from port 3000 to 3010 not using nmap

// var content = await $`/opt/homebrew/bin/nmap`;
// await dev(content.stdout);
await hide();
// await dev(kit.stdout.);
