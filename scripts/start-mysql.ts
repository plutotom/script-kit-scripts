// Name: start mysql

import "@johnlindquist/kit";

await $`brew services start mysql`;
await exit();
