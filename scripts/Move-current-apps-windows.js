// Name: Move current apps windows
// Author: Eduard Uffelmann
// Twitter: @schmedu_
// Example cli usage: ~/.kit/kar align-windows 'ALL' 'LEFT_HALF'

import "@johnlindquist/kit";

const Windows = {
  FRONTMOST: "frontmost",
  ALL: "all",
};

const WindowAlignments = {
  LEFT_HALF: {
    name: "left half",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width / 2,
      height: screen.workArea.height,
    }),
  },
  LEFT_THIRD: {
    name: "left third",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width / 3,
      height: screen.workArea.height,
    }),
  },
  LEFT_TWO_THIRDS: {
    name: "first / left two thirds",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: (screen.workArea.width / 3) * 2,
      height: screen.workArea.height,
    }),
  },
  RIGHT_HALF: {
    name: "right half",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 2,
      y: screen.workArea.y,
      width: screen.workArea.width / 2,
      height: screen.workArea.height,
    }),
  },
  RIGHT_THIRD: {
    name: "right third",
    workArea: (screen) => ({
      x: screen.workArea.x + (screen.workArea.width / 3) * 2,
      y: screen.workArea.y,
      width: screen.workArea.width / 3,
      height: screen.workArea.height,
    }),
  },
  RIGHT_TWO_THIRDS: {
    name: "last / right two thirds",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 3,
      y: screen.workArea.y,
      width: (screen.workArea.width / 3) * 2,
      height: screen.workArea.height,
    }),
  },
  CENTER_THIRD: {
    name: "center third",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 3,
      y: screen.workArea.y,
      width: screen.workArea.width / 3,
      height: screen.workArea.height,
    }),
  },
  TOP_HALF: {
    name: "top half",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width,
      height: screen.workArea.height / 2,
    }),
  },
  TOP_THIRD: {
    name: "top third",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width,
      height: screen.workArea.height / 3,
    }),
  },
  TOP_TWO_THIRDS: {
    name: "top two thirds",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width,
      height: (screen.workArea.height / 3) * 2,
    }),
  },
  BOTTOM_HALF: {
    name: "bottom half",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y + screen.workArea.height / 2,
      width: screen.workArea.width,
      height: screen.workArea.height / 2,
    }),
  },
  BOTTOM_THIRD: {
    name: "bottom third",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y + (screen.workArea.height / 3) * 2,
      width: screen.workArea.width,
      height: screen.workArea.height / 3,
    }),
  },
  BOTTOM_TWO_THIRDS: {
    name: "bottom two thirds",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y + screen.workArea.height / 3,
      width: screen.workArea.width,
      height: (screen.workArea.height / 3) * 2,
    }),
  },
  TOP_LEFT: {
    name: "top left quarter",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width / 2,
      height: screen.workArea.height / 2,
    }),
  },
  TOP_RIGHT: {
    name: "top right quarter",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 2,
      y: screen.workArea.y,
      width: screen.workArea.width / 2,
      height: screen.workArea.height / 2,
    }),
  },
  BOTTOM_LEFT: {
    name: "bottom left quarter",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y + screen.workArea.height / 2,
      width: screen.workArea.width / 2,
      height: screen.workArea.height / 2,
    }),
  },
  BOTTOM_RIGHT: {
    name: "bottom right quarter",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 2,
      y: screen.workArea.y + screen.workArea.height / 2,
      width: screen.workArea.width / 2,
      height: screen.workArea.height / 2,
    }),
  },
  CENTERED: {
    name: "centered",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 6,
      y: screen.workArea.y + screen.workArea.height / 6,
      width: (screen.workArea.width * 2) / 3,
      height: (screen.workArea.height * 2) / 3,
    }),
  },
  FIRST_FOURTH: {
    name: "first fourth",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width / 4,
      height: screen.workArea.height,
    }),
  },
  SECOND_FOURTH: {
    name: "second fourth",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 4,
      y: screen.workArea.y,
      width: screen.workArea.width / 4,
      height: screen.workArea.height,
    }),
  },
  THIRD_FOURTH: {
    name: "third fourth",
    workArea: (screen) => ({
      x: screen.workArea.x + (screen.workArea.width / 4) * 2,
      y: screen.workArea.y,
      width: screen.workArea.width / 4,
      height: screen.workArea.height,
    }),
  },
  FOURTH_FOURTH: {
    name: "fourth fourth",
    workArea: (screen) => ({
      x: screen.workArea.x + (screen.workArea.width / 4) * 3,
      y: screen.workArea.y,
      width: screen.workArea.width / 4,
      height: screen.workArea.height,
    }),
  },
  FIRST_THREE_FOURTHS: {
    name: "first three fourths",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: (screen.workArea.width / 4) * 3,
      height: screen.workArea.height,
    }),
  },
  LAST_THREE_FOURTHS: {
    name: "last three fourths",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 4,
      y: screen.workArea.y,
      width: (screen.workArea.width / 4) * 3,
      height: screen.workArea.height,
    }),
  },
  TOP_LEFT_SIXTH: {
    name: "top left sixth",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width / 3,
      height: screen.workArea.height / 2,
    }),
  },
  TOP_MIDDLE_SIXTH: {
    name: "top middle sixth",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 3,
      y: screen.workArea.y,
      width: screen.workArea.width / 3,
      height: screen.workArea.height / 2,
    }),
  },
  TOP_RIGHT_SIXTH: {
    name: "top right sixth",
    workArea: (screen) => ({
      x: screen.workArea.x + (screen.workArea.width / 3) * 2,
      y: screen.workArea.y,
      width: screen.workArea.width / 3,
      height: screen.workArea.height / 2,
    }),
  },
  BOTTOM_LEFT_SIXTH: {
    name: "bottom left sixth",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y + screen.workArea.height / 2,
      width: screen.workArea.width / 3,
      height: screen.workArea.height / 2,
    }),
  },
  BOTTOM_MIDDLE_SIXTH: {
    name: "bottom middle sixth",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 3,
      y: screen.workArea.y + screen.workArea.height / 2,
      width: screen.workArea.width / 3,
      height: screen.workArea.height / 2,
    }),
  },
  BOTTOM_RIGHT_SIXTH: {
    name: "bottom right sixth",
    workArea: (screen) => ({
      x: screen.workArea.x + (screen.workArea.width / 3) * 2,
      y: screen.workArea.y + screen.workArea.height / 2,
      width: screen.workArea.width / 3,
      height: screen.workArea.height / 2,
    }),
  },
  MAX: {
    name: "max",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width,
      height: screen.workArea.height,
    }),
  },
  ALMOST_MAX: {
    name: "almost maximize",
    workArea: (screen) => ({
      x: screen.workArea.x + screen.workArea.width / 24,
      y: screen.workArea.y + screen.workArea.height / 24,
      width: (screen.workArea.width * 11) / 12,
      height: (screen.workArea.height * 11) / 12,
    }),
  },
  NEXT_SCREEN: {
    name: "next screen",
    workArea: (screen) => ({
      x: screen.workArea.x,
      y: screen.workArea.y,
      width: screen.workArea.width,
      height: screen.workArea.height,
    }),
  },
};

async function setActiveAppsWindows(workArea) {
  await applescript(String.raw`
        tell application "System Events"
          set processName to name of first application process whose frontmost is true as text
          tell process processName to set the position of every window to {${workArea.x}, ${workArea.y}}
          tell process processName to set the size of every window to {${workArea.width}, ${workArea.height}}      
        end tell
    `);
}

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

let windowMode =
  Windows[
    await arg(
      "Which window(s) to move?",
      Object.keys(Windows).map((key) => {
        return {
          name: Windows[key],
          value: key,
        };
      })
    )
  ];

let windowAlignment =
  WindowAlignments[
    await arg(
      "Window Alignment",
      Object.keys(WindowAlignments).map((key) => {
        return {
          name: WindowAlignments[key].name,
          value: key,
        };
      })
    )
  ];

let activeScreen = await getFrontWindowsScreen();
let nextScreen;
if (windowAlignment === WindowAlignments.NEXT_SCREEN) {
  let screens = await getScreens();
  let nextScreens = screens.filter((screen) => screen.id > activeScreen.id);
  nextScreen = nextScreens.length === 0 ? screens[0] : nextScreens[0];
}

let workArea =
  windowAlignment === WindowAlignments.NEXT_SCREEN
    ? windowAlignment.workArea(nextScreen)
    : windowAlignment.workArea(activeScreen);

if (windowMode === Windows.ALL) {

  await setActiveAppsWindows(workArea);
} else {
  await setActiveAppPosition({
    x: workArea.x,
    y: workArea.y,
  });
  await setActiveAppSize({
    width: workArea.width,
    height: workArea.height,
  });
}
