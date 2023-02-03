// Name: scan for running servers on network

import "@johnlindquist/kit";

// scan network for other runing serves using the termnal commands.

// netstat -tulpn
// ifconfig
// netstat -anb
// arp -a
// nmap -sP
await dev(await $`lsof -i -P -n | grep LISTEN`);
