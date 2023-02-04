// .kenv/kenvs/plutotom/scripts/scan-for-running-servers-on-network.ts
import "@johnlindquist/kit";
await dev(await $`lsof -i -P -n | grep LISTEN`);
