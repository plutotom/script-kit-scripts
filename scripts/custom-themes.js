// Name: custom themes
// Description: A copy of theme-selector.js but synced to my own repo so I can save my custom themes

import "@johnlindquist/kit";
let themes = {
  ["Script Kit"]: {
    foreground: "255, 255, 255",
    background: "22, 22, 22",
    accent: "251, 191, 36",
    opacity: isMac ? "0.5" : "0.95",
    ui: "255, 255, 255",
    "ui-bg-opacity": "0.05",
    "ui-border-opacity": "0.15",
    vibrancy: "popover",
    appearance: "dark",
  },
  ["Solarized Light"]: {
    foreground: "#657B83",
    background: "#FDF6E3",
    accent: "#268BD2",
    ui: "#c2bea8",
    opacity: isMac ? "0.6" : "1",
    "ui-bg-opacity": "0.5", // the selector background
    "ui-border-opacity": ".01", // the selector border
    // "--color-primary-light": string
    // "--color-secondary-light": string
    // "--color-primary": string
    // "--color-secondary-dark": string
    // "--color-background-light": string
    // "--color-background-dark": string
    // "--opacity-themelight": string
    // "--opacity-themedark": string
  },
};
let guide = await readFile(kitPath("GUIDE.md"), "utf-8");
const themeName = await arg(
  {
    placeholder: "Theme Selector",
    hint: `Design your own: <a href="submit:theme-designer">Open Theme Designer</a>`,
    preview: md(guide),
    onChoiceFocus: (input, { focused }) => {
      setScriptTheme(themes[focused.value]);
    },
    enter: "Set Theme",
  },
  Object.keys(themes).map((theme) => {
    return {
      name: theme,
      description: `This is the ${theme} theme`,
      value: theme,
    };
  })
);
if (themeName === "theme-designer") {
  await run(kitPath("pro", "theme-designer.js"));
} else {
  await setTheme(themes[themeName]);
  await mainScript();
}
//# sourceMappingURL=theme-selector.js.map
