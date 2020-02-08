$(function() {
  let canvas = $('#swipeCanvas')[0];
  let context = canvas.getContext('2d');
  // スワイプするエリアの図形サイズ
  const SWIPE_AREA_WIDTH = 180;
  const SWIPE_AREA_HEIGHT = 60;
  // スワイプエリアの左上座標
  const SWIPE_AREA_MIN = {
    x: (canvas.width - SWIPE_AREA_WIDTH) / 2,
    y: (canvas.height - SWIPE_AREA_HEIGHT) / 2
  };
  // スワイプエリアの右下座標
  const SWIPE_AREA_MAX = {
    x: (canvas.width + SWIPE_AREA_WIDTH) / 2,
    y: (canvas.height + SWIPE_AREA_HEIGHT) / 2
  };
  let tapStartX = 0;
  let tapFlug = false;

  let drawCanvasData = context.getImageData(0, 0, canvas.width, canvas.height);
  let drawCanvasArray = drawCanvasData.data;
  let canvasImage = new Image();
  let canvasImageData;
  let canvasImageArray;
  canvasImage.src = 'image2.png';
  let rootImage = new Image();
  let rootImageData;
  let rootImageArray;
  rootImage.src = 'image1.png';
  let radius = _radius = 0;
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let startTime;

  canvasImage.onload = () => {
    context.drawImage(canvasImage, 0, 0);
    canvasImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    canvasImageArray = canvasImageData.data;
    console.info('Canvas image loaded.');
  }

  rootImage.onload = () => {
    context.drawImage(rootImage, 0, 0);
    rootImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    rootImageArray = rootImageData.data;
    console.info('Root image loaded.');
    initJS();
  }

  function initJS() {
    drawTapArea();
    $('canvas').css('background-image', 'url("image1.png")');
    imageHidden('.img2');
  }

  function checkInsideCircle(cx, cy, r) {
    return Math.pow((cx - x), 2) + Math.pow((cy - y), 2) - Math.pow(r, 2) <= 0;
  }

  function drawTapArea() {
    context.beginPath();
    context.strokeRect(
      SWIPE_AREA_MIN.x,
      SWIPE_AREA_MIN.y,
      SWIPE_AREA_WIDTH,
      SWIPE_AREA_HEIGHT
    )
    context.stroke();
  }

  function checkVlidPoint() {
    return SWIPE_AREA_MIN.x < event.offsetX &&
      SWIPE_AREA_MAX.x > event.offsetX &&
      SWIPE_AREA_MIN.y < event.offsetY &&
      SWIPE_AREA_MAX.y > event.offsetY;
  }

  function enlargeCircle() {
    for(var cy = (y - radius); cy <= (y + radius); cy++) {
      for(var cx = (x - radius); cx <= (x + radius); cx++) {
        if(checkInsideCircle(cx, cy, radius)) {
          if(cx < 0 || cy < 0) {
            continue;
          }
          let index = (canvas.width * cy + cx) * 4;
          drawCanvasArray[index] = canvasImageArray[index];
          drawCanvasArray[index+1] = canvasImageArray[index+1];
          drawCanvasArray[index+2] = canvasImageArray[index+2];
          drawCanvasArray[index+3] = 255;
        }
      }
    }
    context.putImageData(drawCanvasData, 0, 0);
    drawTapArea();
  }

  function shrinkCircle() {
    for(var cy = (y - _radius); cy <= (y + _radius); cy++) {
      for(var cx = (x - _radius); cx <= (x + _radius); cx++) {
        if(!checkInsideCircle(cx, cy, radius)) {
          let index = (canvas.width * cy + cx) * 4;
          drawCanvasArray[index] = rootImageArray[index];
          drawCanvasArray[index+1] = rootImageArray[index+1];
          drawCanvasArray[index+2] = rootImageArray[index+2];
          drawCanvasArray[index+3] = 255;
        }
      }
    }
    context.putImageData(drawCanvasData, 0, 0);
    drawTapArea();
  }

  function enlargeAnimationCircle() {
    let requestId = window.requestAnimationFrame(enlargeAnimationCircle);
    enlargeCircle();
    if(radius > 620) {
      window.cancelAnimationFrame(requestId);
      imageHidden('.img1');
    }
    radius += 30;
  }

  function shrinkAnimationCircle() {
    let requestId = window.requestAnimationFrame(shrinkAnimationCircle);
    if(radius < 0) {
      radius = 0;
    }
    shrinkCircle();
    if(radius == 0) {
      window.cancelAnimationFrame(requestId);
    }
    _radius = radius;
    radius -= 10;
  }

  function imageHidden(cls) {
    $(cls).css('display', 'none');
    switch (cls) {
      case '.img1':
        $('.img2').css('display', 'block');
        break;
      case '.img2':
        $('.img1').css('display', 'block');
    }
  }

  $('#onemore').on('click', function() {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setInterval(() => {
      window.location.reload(false);
    }, 1000);
  })

  let mouseMoveEvent = function(event) {
    if(checkVlidPoint()){
      radius = Math.abs(tapStartX - event.offsetX);
      if(radius > _radius) {
        enlargeCircle();
      } else if(radius < _radius) {
        shrinkCircle();
      }
      _radius = radius;
    }
  };
  $('#swipeCanvas').mousedown(function(e) {
    radius = _radius = 0;
    if(checkVlidPoint()){
      tapFlug = true;
      tapStartX = event.offsetX;
      canvas.addEventListener('mousemove', mouseMoveEvent);
    }
  });
  $(window).mouseup(function(e) {
    if(tapFlug) {
      canvas.removeEventListener('mousemove', mouseMoveEvent);
      startTime = Date.now();
      if(radius > 140) {
        enlargeAnimationCircle();
      } else {
        shrinkAnimationCircle();
      }
      tapFlug = false;
    }
  });
})
