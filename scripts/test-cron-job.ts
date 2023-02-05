// Name: test-cron-job
// Schedule: */15 * * * *

import "@johnlindquist/kit";

// await notify(`Stand up and stretch`);

// // Name: test-cron-job
// // Schedule: * /5 * * *

// import "@johnlindquist/kit";

// let [color1, color2, color3] = await fields({
//   onChange: (input, state) => {
//     setHint(state.value);
//   },
//   fields: [{ type: "color" }, { type: "color" }, { type: "color" }],
// });

// await widget("<div>test</div>");

// let res = await term(`nmap -p 3000-3010 --open 192.168.1.0/24`); // scans from 192.168.1.0 to 192.168.1.255
// let res = await term(`nmap`);
// let res = await exec("nmap");
let res = await $`nmap`;
// await dev(res);
// await hide();
