// Name: tracking numbers
// alias: track
import "@johnlindquist/kit";
const { nanoid } = await npm("nanoid");

const { trackingNumbers, write } = await db("trackingNumbers", {
  trackingNumbers: [],
});

type Option = {
  name: string;
  description: string;
  value:
    | "COPY_TRACKING_NUMBER"
    | "ADD_NEW_TRACKING_NUMBER"
    | "DELETE_TRACKING_NUMBER";
};

const PM_OPTIONS: Option[] = [
  {
    name: "Open Tracking Number",
    description: "Open a Saved Tracking Number in the Browser",
    value: "COPY_TRACKING_NUMBER",
  },
  {
    name: "Add New Tracking Number",
    description: "Add a new Tracking Number to the database",
    value: "ADD_NEW_TRACKING_NUMBER",
  },
  {
    name: "delete a tracking number",
    description: "delete a tracking number from the database",
    value: "DELETE_TRACKING_NUMBER",
  },
];

const choice: Option["value"] = await arg(
  "What would you like to do?",
  PM_OPTIONS
);

/** Doing operation on basis of choice */
if (choice === "ADD_NEW_TRACKING_NUMBER") {
  addNewTrackingNumber();
}

if (choice === "COPY_TRACKING_NUMBER") {
  listAndCopyTrackingNumber();
}

if (choice === "DELETE_TRACKING_NUMBER") {
  deleteTrackingNumber();
}

async function deleteTrackingNumber() {
  const trackingNumber = await arg(
    "Which tracking number would you like to delete ?",
    () =>
      trackingNumbers.map(({ title, trackingNumber }) => ({
        name: title,
        value: trackingNumber,
      }))
  );

  const newTrackingNumbers = trackingNumbers.filter(
    (t) => t.trackingNumber !== trackingNumber
  );

  trackingNumbers.length = 0;
  trackingNumbers.push(...newTrackingNumbers);

  /** Saving the password in db */
  await write();
  notify(`Tracking Number deleted successfully!`);
}

async function addNewTrackingNumber() {
  const title = await arg({
    placeholder: "Title",
    hint: "Title for which your Tracking Number belongs e.g Ebay, Amazon etc.",
  });

  const trackingNumber = await arg({
    placeholder: "Tracking Number",
    hint: `Tracking Number you want to save for ${title}`,
  });

  const id = nanoid(5);
  const newTrackingNumber = { id, title, trackingNumber: trackingNumber };
  trackingNumbers.push(newTrackingNumber);

  /** Saving the password in db */
  await write();
  notify(`Tracking Number for ${title} added successfully!`);
}

async function listAndCopyTrackingNumber() {
  const trackingNumber = await arg(
    "Which tracking number would you like to copy ?",
    () =>
      trackingNumbers.map(({ title, trackingNumber }) => ({
        name: title,
        value: trackingNumber,
      }))
  );

  /** Copying the password to clipboard */
  copy(trackingNumber);
  try {
    // await browse("https://www.google.com/search?q=" + trackingNumber);
    await browse("https://parcelsapp.com/en/tracking/" + trackingNumber);
    // get the element with the id="tracking-info" and return it

    // const trackingInfo = await scrapeSelector(
    //   `https://parcelsapp.com/en/tracking/${trackingNumber}`,
    //   "#tracking-info",
    //   (el) => {
    //     return el.innerText;
    //   }
    // );
  } catch (e) {
    dev(e);
  }
  notify("tracking number copied to you clipboard!");
}
