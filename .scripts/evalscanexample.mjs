// .kenv/kenvs/windows-scripts/scripts/evalscanexample.ts
import "@johnlindquist/kit";
var Evilscan = await npm("evilscan");
var options = {
  // 192.168.0.0/24 --port=21-23,80
  target: "10.0.0/24",
  // target: "10.0.0.209",
  port: "3000-3010",
  status: "Open",
  // Timeout, Refused, Open, Unreachable
  banner: true,
  display: "json"
};
var evilscan = new Evilscan(options);
evilscan.on("result", async (data) => {
  console.log(data);
});
evilscan.on("error", (err) => {
  throw new Error(err.toString());
});
evilscan.on("done", () => {
  console.log("Done");
});
evilscan.run();
