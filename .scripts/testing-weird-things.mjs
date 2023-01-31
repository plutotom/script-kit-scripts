// .kenv/kenvs/plutotom/scripts/testing-weird-things.ts
import "@johnlindquist/kit";
var heights = [320, 480, 640];
var choices = await heights.map((h) => {
  return {
    name: `Kitten height: ${h}`,
    // preview: () => `<img class="w-full" src="http://placekitten.com/640/${h}">`,
    preview: async () => home(),
    value: h
  };
});
var height = await arg("Select a Kitten", choices);
await div(md(`You selected ${height}`));
