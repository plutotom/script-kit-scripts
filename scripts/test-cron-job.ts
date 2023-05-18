// Name: test-cron-job

import "@johnlindquist/kit";

notify(`Testing notification non-await`);
await notify(`Testing notification await`);
