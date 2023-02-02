// Users/plutotom/.kenv/kenvs/plutotom/scripts/drop-over.ts
import "@johnlindquist/kit";
var files = [];
var w = await widget(
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
      files
    }
  }
);
w.onDrop((event) => {
  if (event?.dataset?.files) {
    files.push(...event.dataset.files);
    w.setState({
      files
    });
  }
});
w.onMouseDown((event) => {
  if (event.dataset.file) {
    startDrag(event.dataset.file);
  }
});
