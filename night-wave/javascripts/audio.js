const URL = 'data/wave.mp3';

let audioCtx = new window.AudioContext();
let request = new XMLHttpRequest();
let coloring;

window.onload = () => {
  coloring = document.getElementsByClassName('coloring');
  request.send();
}

request.open('GET', URL, true);
request.responseType = 'arraybuffer';
request.onload =  () => {
  audioCtx.decodeAudioData(request.response, (audioBuffer) => {
    let sourceNode = audioCtx.createBufferSource();
    let gainNode = audioCtx.createGain();
    let analyser = audioCtx.createAnalyser();
    sourceNode.buffer = audioBuffer;
    gainNode.gain.value = 0.5;
    sourceNode.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    sourceNode.start();
    setInterval(() => {
      let times = new Uint8Array(analyser.fftSize);
      analyser.getByteTimeDomainData(times);
      let value = (Math.max.apply(null, times) - 128) * 10 + 60;
      (value > 256) ? value = 256 : value;
      for(let idx = 0; idx < coloring.length; idx++) {
        coloring[idx].style.color = `rgb(${value}, ${value}, 256)`;
      }
    }, 500);
  });
}