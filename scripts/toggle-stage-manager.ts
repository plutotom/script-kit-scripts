// Name: Toggle Stage Manager

import "@johnlindquist/kit";

await applescript(
  `set currStageManagerMode to (do shell script "echo $(defaults read com.apple.WindowManager GloballyEnabled 2> /dev/null)") as integer
    if currStageManagerMode is 0 then
        do shell script "defaults write com.apple.WindowManager GloballyEnabled -bool true"
    else
        do shell script "defaults write com.apple.WindowManager GloballyEnabled -bool false"
    end if`
);

await exit();
