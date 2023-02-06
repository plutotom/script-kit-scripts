// Name: nmap testing 1

import "@johnlindquist/kit";

const IP = await npm("ip");
const xml2js = await npm("xml2js");
const parser = await new xml2js.Parser();
const localhostIp = await IP.address();

let potentialRunningServers = [];

// convert xml to json
// let res = await $`nmap -p 3000-3002 -oX - 10.0.0.200/24 --open`;
let res = await $`nmap -p  3000-3002 -sV -oX - 10.0.0.200/24 --open`;

// get teh stdout of the process
let ProcessOutput = await res.stdout;

await console.log("here is a log thign");
await parser.parseString(res, async (err, result) => {
  //   await inspect(result);

  // filter by the ports service product, it should include "node" or "express".
  let filtered = await result.nmaprun.host.filter((host) => {
    return host.ports[0].port[0].service[0].$.product
      .toLocaleLowerCase()
      .includes("express" || "node");
  });

  // log out the filtered ip addresses and port number that the service is running on that is not running on the localhost
  await filtered.forEach((host) => {
    let ip = host.address[0].$.addr;
    let port = host.ports[0].port[0].$.portid;
    let addrtype = host.address[1]?.$.addrtype;
    let vendor = host.address[1]?.$.vendor;

    if (ip === localhostIp) return;
    console.log(`here is the new ip address`);
    console.log(`ip: ${ip} port: ${port}`);
    potentialRunningServers.push({
      addrtype,
      vendor,
      ip,
      port,
    });
  });
  await dev({ potentialRunningServers: potentialRunningServers });

  var json_res = await result;
});

// await hide();
