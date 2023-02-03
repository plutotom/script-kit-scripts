// Name: testing weird things

import "@johnlindquist/kit";

// let [latest] = await getClipboardHistory();
// await dev(latest);

enum ServerType {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

let SERVER_TYPE: ServerType = await env(
  "SOCKET_SERVER_TYPE",
  async () => await arg("select Type", [ServerType.CLIENT, ServerType.SERVER])
);

await dev(SERVER_TYPE);

// // #######################################
// let heights = [320, 480, 640];
// let choices = await heights.map((h) => {
//   return {
//     name: `Kitten height: ${h}`,
//     // preview: () => `<img class="w-full" src="http://placekitten.com/640/${h}">`,
//     preview: async () => home(),
//     value: h,
//   };
// });

// let height = await arg("Select a Kitten", choices);

// await div(md(`You selected ${height}`));
