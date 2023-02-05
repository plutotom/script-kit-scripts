// Users/plutotom/.kenv/kenvs/plutotom/scripts/widget-testing.ts
import "@johnlindquist/kit";
var text = await arg("What do you want to say?");
await widget(text, {
  //   vibrancy: "under-page",
  //   webPreferences: { navigateOnDragDrop: false },
  //   draggable: true,
});
