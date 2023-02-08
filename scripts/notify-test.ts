// Name: notify test

import "@johnlindquist/kit";

// await notify("hello world");
let { notify } = await kit("desktop");

await notify("Some title", "some subtitle");

await hide();
await exit();
