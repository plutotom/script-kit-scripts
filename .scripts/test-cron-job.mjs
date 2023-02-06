// ../../../../.kenv/kenvs/windows-scripts/scripts/test-cron-job.ts
import "@johnlindquist/kit";
var res = await $`/opt/homebrew/bin/nmap -sV -p 3000-3010 10.0.0/24 | grep -E "Nmap scan report for|PORT|open|MAC Address"`;
await dev(res.stdout);
await hide();
