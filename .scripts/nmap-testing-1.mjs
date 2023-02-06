// .kenv/kenvs/windows-scripts/scripts/nmap-testing-1.ts
import "@johnlindquist/kit";
var IP = await npm("ip");
var xml2js = await npm("xml2js");
var parser = await new xml2js.Parser();
var localhostIp = await IP.address();
var potentialRunningServers = [];
var res = await $`nmap -p  3000-3002 -sV -oX - 10.0.0.200/24 --open`;
var ProcessOutput = await res.stdout;
await console.log("here is a log thign");
await parser.parseString(res, async (err, result) => {
  let filtered = await result.nmaprun.host.filter((host) => {
    return host.ports[0].port[0].service[0].$.product.toLocaleLowerCase().includes("express");
  });
  await filtered.forEach((host) => {
    let ip = host.address[0].$.addr;
    let port = host.ports[0].port[0].$.portid;
    let addrtype = host.address[1]?.$.addrtype;
    let vendor = host.address[1]?.$.vendor;
    if (ip === localhostIp)
      return;
    console.log(`here is the new ip address`);
    console.log(`ip: ${ip} port: ${port}`);
    potentialRunningServers.push({
      addrtype,
      vendor,
      ip,
      port
    });
  });
  await dev({ potentialRunningServers });
  var json_res = await result;
});
