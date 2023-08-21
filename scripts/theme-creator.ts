// Name: Theme Creator

// This will create a file at ~/.kenv/theme.txt
// Edit the file, then hit save to update the theme

import "@johnlindquist/kit"

let themePath = kenvPath("theme.txt")

if (!(await isFile(themePath))) {
  let defaultTheme = `
--color-primary: 255, 155, 255
--color-secondary: 255, 113, 39
--color-background: 255, 255, 255
    `.trim()

  await writeFile(themePath, defaultTheme)
}

await edit(themePath)

let { watch } = await npm("chokidar")

setIgnoreBlur(true)
let mS = mainScript()

watch(themePath).on("change", async () => {
  let contents = await readFile(themePath, "utf-8")

  let theme = contents.split("\n").reduce((acc, line) => {
    let [k, v] = line.trim().split(":")
    acc[k.trim()] = v.trim()
    return acc
  }, {})

  setTheme(theme)
})

await mS
