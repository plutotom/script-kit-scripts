// Name: copy My IP
// Description: Get my IP address and copy it to the clipboard
// Author: Kim Døfler

import "@johnlindquist/kit";

let ip = (await $`dig +short @ns1.google.com -t txt o-o.myaddr.l.google.com`)
  ?._combined;
ip = ip.replaceAll(/"/gi, "").trim();
await copy(ip);
