let navFlg = false;
let arrow;
let nav;
let topImage;
let imgIndex = 0;

window.onload = () => {
  init();
}

function init() {
  arrow = document.getElementById('arrow');
  nav = document.getElementById('navigation');
  topImage = document.getElementById('top_image').children;
  window.setInterval(() => {
    if(imgIndex == 0) {
      topImage[0].style.opacity = 1;
      topImage[1].style.opacity = 0;
      imgIndex = 1;
    } else {
      topImage[1].style.opacity = 1;
      topImage[0].style.opacity = 0;
      imgIndex = 0;
    }
  }, 5000);
}

function clickArrow() {
  navFlg = !navFlg;
  if(navFlg) {
    arrow.style.transform = 'rotate(180deg)';
    nav.style.top = '60px';
  } else {
    arrow.style.transform = 'rotate(0)';
    nav.style.top = '-7px';
  }
}

