/*
 # This script is a test for making fancy widgets
 * This normaly would be show at the top of the scrip in the file list,
 but it does not because it is being repalced by the preview in the docs
  */
// Name: Widget Testing
// preview: docs

import "@johnlindquist/kit";

let text = await arg("What do you want to say?");
await widget(text, {
  //   vibrancy: "under-page",
  //   webPreferences: { navigateOnDragDrop: false },
  //   draggable: true,
});
