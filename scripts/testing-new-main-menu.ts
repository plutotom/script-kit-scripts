// Name: Testing New Main Menu
// Shortcut:

import "@johnlindquist/kit"

onTab("Run", async (input = "") => {
    await attemptImport(kitPath("cli", "app-run.js"), "--input", input)
})

onTab("A", async (input = "") => {
    await selectScript("Scripts that start with 'A'", true, (scripts)=> scripts.filter(script => script.name.startsWith("a")))
})

onTab("B", async (input = "") => {
    await selectScript("Scripts that start with 'B'", true, (scripts)=> scripts.filter(script => script.name.startsWith("B")))
})

