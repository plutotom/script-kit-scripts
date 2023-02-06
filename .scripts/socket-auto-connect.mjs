// ../../../../.kenv/kenvs/windows-scripts/scripts/socket-auto-connect.ts
import "@johnlindquist/kit";
var IP = await npm("ip");
var xml2js = await npm("xml2js");
var parser = await new xml2js.Parser();
var localhostIp = await IP.address();
var potentialRunningServers = [
  {
    addrtype: "im an example",
    vendor: "idk",
    ip: "10.0.0.222",
    port: "3002"
  },
  {
    addrtype: "im an example2",
    vendor: "idkels",
    ip: "2332",
    port: "3002"
  }
];
var potentialRunningServersDb = await db("potentialRunningServers", {
  data: potentialRunningServers
});
var scanForOpenServers = async () => {
  let res = await $`nmap -p  3000-3010 -sV -oX - 10.0.0.200/24 --open`;
  let ProcessOutput = await res.stdout;
  await console.log("here is a log thign");
  await parser.parseString(res, async (err, result) => {
    let filtered = await result.nmaprun.host.filter((host) => {
      return host.ports[0].port[0].service[0].$.product.toLocaleLowerCase().includes("express");
    });
    await filtered.forEach((host) => {
      let ip = host.address[0].$.addr;
      let port = host.ports[0].port[0].$.portid;
      let addrtype = host.address[1].$.addrtype;
      let vendor = host.address[1].$.vendor;
      if (ip === localhostIp)
        return;
      console.log(`here is the new ip address`);
      console.log(`ip: ${ip} port: ${port}`);
      potentialRunningServers.push({ addrtype, vendor, ip, port });
    });
  });
  return potentialRunningServers;
};
var tempHold = await potentialRunningServersDb.data;
while (true) {
  await arg({
    choices: await potentialRunningServersDb.data?.data?.map((server) => {
      return `${server.addrtype} ${server.vendor} ${server.ip} ${server.port}`;
    })
  });
  let testingRes = arg(
    "Select a server to connect to",
    await scanForOpenServers().then((res) => {
      return res.map((server) => {
        return `${server.addrtype} ${server.vendor} ${server.ip} ${server.port}`;
      });
    })
  );
}
potentialRunningServersDb.data = potentialRunningServers;
await potentialRunningServersDb.write();
