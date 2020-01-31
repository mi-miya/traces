let wrapper;
let canvas;
let context;
let time = 0;
let drawFlg = false;
const INTERVAL = 60;
const LINE_WIDTH = 80;
let oldPathX = 0;
let oldPathY = 0;
let bgBreakPoint = 0;
let drawImageNumber = 0;
let images = [
  "images/bg_img1.jpg",
  "images/bg_img2.jpg",
  "images/bg_img3.jpg",
];

window.onload = () => {
  wrapper = document.getElementById('wrapper');
  bgBreakPoint = Math.round((wrapper.clientHeight - window.innerHeight) / 3);
  canvas = document.getElementById('bg');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  context = canvas.getContext('2d');
  window.addEventListener('mousedown', e => {
    mousedownOrTouchstart(e);
  });
  window.addEventListener('touchstart', e => {
    mousedownOrTouchstart(e);
  });
  window.addEventListener('mousemove', e => {
    mousemoveOrTouchmove(e);
  });
  window.addEventListener('touchmove', e => {
    mousemoveOrTouchmove(e);
  });
  window.addEventListener('mouseup', e => {
    mouseupOrTouchend();
  });
  window.addEventListener('touchend', e => {
    mouseupOrTouchend();
  });
  window.addEventListener('scroll', e => {
    if(window.scrollY < bgBreakPoint) {
      if(drawImageNumber != 0) {
        drawImageNumber = 0;
        changeBgImage();
      }
    } else if(window.scrollY < bgBreakPoint*2) {
      if(drawImageNumber != 1) {
        drawImageNumber = 1;
        changeBgImage();
      }
    } else {
      if(drawImageNumber != 2) {
        drawImageNumber = 2;
        changeBgImage();
      }
    }
  })
  graduallyOpaque();
}

function changeBgImage() {
  canvas.style.backgroundImage = `url('${images[drawImageNumber]}')`;
}

function mousedownOrTouchstart(e) {
  drawFlg = true;
  if(e.type == "mousedown") {
    oldPathX = e.clientX;
    oldPathY = e.clientY;
  } else {
    oldPathX = e.touches[0].clientX;
    oldPathY = e.touches[0].clientY;
  }
}
function mousemoveOrTouchmove(e) {
  if(drawFlg) {
    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineWidth = LINE_WIDTH;
    context.beginPath();
    context.moveTo(oldPathX, oldPathY);
    if(e.type == "mousemove") {
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      context.closePath();
      oldPathX = e.clientX;
      oldPathY = e.clientY;
    } else {
      context.lineTo(e.touches[0].clientX, e.touches[0].clientY);
      context.stroke();
      context.closePath();
      oldPathX = e.touches[0].clientX;
      oldPathY = e.touches[0].clientY;
    }
  }
}
function mouseupOrTouchend() {
  drawFlg = false;
}

function graduallyOpaque(timeStamp) {
  if(timeStamp - time > INTERVAL) {
    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.fillStyle = "rgba(255, 255, 255, 0.005)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    time = timeStamp;
  }
  window.requestAnimationFrame(graduallyOpaque);
}

// mouseDownでイベント開始

// mousemoveでマウス座標の周りのOpacityをゼロにする