$(function() {
  let canvas = $('#canvas1')[0];
  let context = canvas.getContext('2d');
  context.fillStyle = "red";
  context.fillRect(0, 0, canvas.width, canvas.height);
  // スワイプするエリアの図形サイズ
  const SWIPE_AREA_WIDTH = 170;
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
  let radius = 0;

  context.strokeRect(
    SWIPE_AREA_MIN.x,
    SWIPE_AREA_MIN.y,
    SWIPE_AREA_WIDTH,
    SWIPE_AREA_HEIGHT
  );

  let mouseMoveEvent = function(event) {
    if(checkVlidPoint()){
      tapEndXY = {x: event.offsetX, y: event.offsetY};
      radius = Math.abs(tapStartX - event.offsetX);
      drawCircle();
    }
  };
  canvas.addEventListener('mousedown', function(event){
    if(checkVlidPoint()){
      tapFlug = true;
      tapStartX = event.offsetX;
      canvas.addEventListener('mousemove', mouseMoveEvent);
    }
  });
  window.addEventListener("mouseup",function(e) {
    if(tapFlug) {
      canvas.removeEventListener('mousemove', mouseMoveEvent);
      tapFlug = false;
    }
  });

  function checkVlidPoint() {
    return SWIPE_AREA_MIN.x < event.offsetX &&
      SWIPE_AREA_MAX.x > event.offsetX &&
      SWIPE_AREA_MIN.y < event.offsetY &&
      SWIPE_AREA_MAX.y > event.offsetY;
  }

  function drawCircle() {
    // fill
    context.globalAlpha = 1.0;
    context.beginPath ();
    context.globalCompositeOperation = 'destination-out';
    context.arc(100, 100, radius, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    context.fill();
    // stroke
    context.globalCompositeOperation = 'source-over';
    context.beginPath ();
    context.lineWidth = 2.5;
    context.strokeStyle = "#ffffff";
    context.globalAlpha = 1.0;
    var radiusDummy = radius;
    while(0 < context.globalAlpha && 0 < radiusDummy){
      context.beginPath ();
      context.arc(100, 100, radiusDummy, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
      radiusDummy -= context.lineWidth;
      context.globalAlpha = context.globalAlpha - 0.15;
      context.stroke();
    }
  }
})

// TODO: jQueryは不要のため削除