// Name: test-cron-job
// Schedule: */15 * * * *

import "@johnlindquist/kit";

notify(`Testing notification non-await`);
await notify(`Testing notification await`);
