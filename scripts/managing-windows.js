import "@johnlindquist/kit";

async function getActiveAppsFrontMostWindowsPosition() {
  let positionStr = await applescript(String.raw`
          tell application "System Events"
              set processName to name of first application process whose frontmost is true as text
              tell process processName to get position of window 1
          end tell
      `);
  let positionArray = positionStr.split(",").map((str) => parseInt(str.trim()));
  return {
    x: positionArray[0],
    y: positionArray[1],
  };
}

async function getFrontWindowsScreen() {
  let position = await getActiveAppsFrontMostWindowsPosition();
  let screens = await getScreens();
  return screens.find((screen) => {
    return (
      position.x >= screen.bounds.x &&
      position.x <= screen.bounds.x + screen.bounds.width &&
      position.y >= screen.bounds.y &&
      position.y <= screen.bounds.y + screen.bounds.height
    );
  });
}
async function setActiveAppsWindows(workArea) {
  await applescript(String.raw`
          tell application "System Events"
            set processName to name of first application process whose frontmost is true as text
            tell process processName to set the position of every window to {${workArea.x}, ${workArea.y}}
            tell process processName to set the size of every window to {${workArea.width}, ${workArea.height}}      
          end tell
      `);
}

// list out all screens
let screens = await getScreens(); // screens are monitors
