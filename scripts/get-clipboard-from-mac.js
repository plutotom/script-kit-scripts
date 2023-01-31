// Name: get clipboard from mac
// Shortcut: ctrl  alt  c
import "@johnlindquist/kit";

// will make a get request to the express server running on the mac that is storying the clipboard data.
// the express server is running on the mac and is listening on port 3000

// get ipv4 address of mac using windows terminal command

// find the ipv4 address of the mac on my network

// find the ipv4 address of the mac on my network with the physical adrees as 50-ed-3c-25-f4-ef and only return the
var MAC_IP = await $`arp -a | findstr "50-ed-3c-25-f4-ef"`;
if (MAC_IP === "") {
  MAC_IP = await env("MAC_IP");
}
MAC_IP = String(MAC_IP).trim();
MAC_IP = MAC_IP.slice(0, 11);
MAC_IP = MAC_IP.trim();

// make post request to localhost:3000
await get(`http://${MAC_IP}:3000/clipboard`)
  .then((res) => {
    clipboard.writeText(res.data.text);
  })
  .catch((err) => {
    dev(`error: ${err}`);
  });
