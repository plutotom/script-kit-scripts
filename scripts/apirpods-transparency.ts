// Name: apirpods transparency

import "@johnlindquist/kit";

// write a apple script that list all menue bar items
// write a apple script that list all menue bar items

// await applescript(`
// tell application "System Events"
// 	tell process "SystemUIServer"

// 	end tell
// end tell
// `);

// await applescript(`
// tell application "System Events"
// 	tell process "SystemUIServer"
// 		set menuBarItems to every menu bar item of menu bar 1 whose description contains "wifi"
// 		set menuBarItemsNames to name of menuBarItems
// 		repeat with item in menuBarItemsNames
// 			display dialog item
// 		end repeat
// 	end tell
// end tell
// `);

await applescript(`
tell application "System Events"
	tell process "SystemUIServer"
        try
            click (menu bar item 1 of menu bar 1 whose description contains "wifi")
        on error
            display alert "Volume icon not found"
        end try
        try
			click menu item "Isaiah airpods" of menu 1 of result
            if value of attribute "AXMenuItemMarkChar" of menu item "Transparency" of menu 1 of result is "✓" then
				click menu item "Noise Cancellation" of menu 1 of result
				return "Noise Cancellation active"
			else
				click menu item "Transparency" of menu 1 of result
				return "Transparency mode active"
			end if
		on error
			tell application "System Events"
				key code 53
                display alert "AirPods not connected"
			end tell
		end try
	end tell
end tell
`);

await applescript(`
display alert "end"
`);
