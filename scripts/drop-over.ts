// Name: Drop Over
// Notes: this link seems to be how he is listing files in the file explorer https://github.com/johnlindquist/kit/blob/b34d258c4990cb33fbd8262187bee4e95b29fa86/src/lib/file.ts#L4

import "@johnlindquist/kit";

// let fileInfos: [] | any = await drop({
//   placeholder: "placeholder",
// });

// await path({
//   hint: `select a path`,
//   startPath: fileInfos[0].path,
// });

//####################################

let files = [];

let w = await widget(
  `<div class="flex flex-col">
<h2 class="text-2xl">Drop Files</h2>
<span class="text-sm py-1 cursor-pointer" v-for="(file, index) in files" :key="file" :data-file="file">{{file}}</span>
</div>
`,
  {
    containerClass: `p-4 h-screen w-screen overflow-auto`,
    width: 300,
    height: 300,
    draggable: false,
    state: {
      files,
    },
  }
);

w.onDrop((event) => {
  if (event?.dataset?.files) {
    files.push(...event.dataset.files);
    w.setState({
      files,
    });
  }
});

w.onMouseDown((event) => {
  if (event.dataset.file) {
    startDrag(event.dataset.file);
  }
});
