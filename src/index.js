import "./styles.css"

import butterchurn from 'butterchurn';
import butterchurnPresets from 'butterchurn-presets';

// initialize audioContext and get canvas

let visualizer
let canvas = document.querySelector("#canvas")
let resizeCanvas = () => {

  canvas.width = window.innerWidth;


  canvas.height = window.innerHeight;

  if (visualizer) visualizer.setRendererSize(canvas.width, canvas.height);

  console.log(canvas.width, canvas.height)
}
resizeCanvas()

window.addEventListener("resize", resizeCanvas)


let userMediaCallback = stream => {

  let audioContext = new AudioContext()
  let mic = audioContext.createMediaStreamSource(stream)
  visualizer = butterchurn.createVisualizer(audioContext, canvas, {
    width: canvas.width,
    height: canvas.height
  });

  // get audioNode from audio source or microphone

  visualizer.connectAudio(mic);

  // load a preset

  const presets = butterchurnPresets.getPresets();
  let name = "_Rovastar + Geiss - Hurricane Nightmare (Posterize Mix)"
  let preset = presets[name];

  console.log(Object.keys(presets))

  visualizer.loadPreset(preset, 0.0); // 2nd argument is the number of seconds to blend presets

  // resize visualizer


  // render a frame
  let step = () => {
    visualizer.render()
    window.requestAnimationFrame(step)
  }

  step()
  // setInterval(() => {
  //   visualizer.render();

  // }, 100)
}


window.navigator.getUserMedia({ audio: true, video: false }, userMediaCallback, console.log)

