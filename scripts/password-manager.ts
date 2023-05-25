// Menu: Password Manager
// Description: Manager all your passwords justing using few keys
// Shortcut: Command + Shift + J
// Author: @rockingrohit9639
// alias: pass

import "@johnlindquist/kit";
const { nanoid } = await npm("nanoid");
const Cryptr = await npm("cryptr");

const CRYPTR_KEY = await env("CRYPTR_KEY");
const cryptr = new Cryptr(CRYPTR_KEY);

const { passwords, write } = await db("passwords", { passwords: [] });

type Option = {
  name: string;
  description: string;
  value: "COPY_PASSWORD" | "ADD_NEW_PASSWORD";
};

const PM_OPTIONS: Option[] = [
  {
    name: "Copy Password",
    description: "Copy one of the saved passwords",
    value: "COPY_PASSWORD",
  },
  {
    name: "Add New Password",
    description: "Add a new password to the database",
    value: "ADD_NEW_PASSWORD",
  },
];

const choice: Option["value"] = await arg(
  "What would you like to do?",
  PM_OPTIONS
);

/** Doing operation on basis of choice */
if (choice === "ADD_NEW_PASSWORD") {
  addNewPassword();
}

if (choice === "COPY_PASSWORD") {
  listAndCopyPassword();
}

async function addNewPassword() {
  const title = await arg({
    placeholder: "Title",
    hint: "Title for which your password belongs e.g Facebook etc.",
  });
  const password = await arg({
    placeholder: "Password",
    hint: `Password you want to save for ${title}`,
  });

  /** Encrypting the password */
  const encryptedPassword = cryptr.encrypt(password);

  const id = nanoid(5);
  const newPassword = { id, title, password: encryptedPassword };
  passwords.push(newPassword);

  /** Saving the password in db */
  await write();
  notify(`Password for ${title} added successfully!`);
}

async function listAndCopyPassword() {
  const passwordToCopy = await arg(
    "Which password would you like to copy ?",
    () =>
      passwords.map(({ title, password }) => ({ name: title, value: password }))
  );

  /** Decrypting the password */
  const decryptedPassword = cryptr.decrypt(passwordToCopy);

  /** Copying the password to clipboard */
  copy(decryptedPassword);
  notify("Password copied to you clipboard!");
}
