// .kenv/kenvs/windows-scripts/scripts/scan-for-running-servers-on-network.ts
import "@johnlindquist/kit";
await dev(await $`lsof -i -P -n | grep LISTEN`);
