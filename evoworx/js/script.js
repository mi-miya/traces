let el;
let elChi;
let cursor;
let follow_cursor;
let width = 0;
let cs = 8;
let fcs = 32;

window.onload = function () {
  el = document.getElementById('transition');
  elChi = el.children;
  cursor = document.getElementById('my_cursor');
  follow_cursor = document.getElementById('follow_cursor');
  // TODO: FIXME: ページ遷移後の再読込がされていない
  let mySwiper = new Swiper ('.works_slider', {
    loop: true,
    speed: 500,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    }
  });
  transitionLeave1();
};

function transitionLeave1() {
  let requestId = window.requestAnimationFrame(transitionLeave1);
  elChi[0].style.width = `${width}%`;
  elChi[1].style.width = `${width}%`;
  if(50 < width) {
    window.cancelAnimationFrame(requestId);
    width = 100;
    transitionLeave2();
  }
  width += 16;
}

function transitionLeave2() {
  if(width < 0) {
    width = 0;
  }
  let requestId = window.requestAnimationFrame(transitionLeave2);
  el.style.width = `${width}%`;
  // TODO: HACK: css animation を使った方がスタイリッシュで自由が聞く
  if(width <= 0) {
    window.cancelAnimationFrame(requestId);
  }
  if(width < 20) {
    width -= 3;
  } else {
    width -= 8;
  }
}

function initTransition() {
  el.style.width = "100%";
  elChi[0].style.width = "0%";
  elChi[1].style.width = "0%";
}

barba.init({
  transitions: [{
    sync: true,
    leave() {
      transitionLeave1();
    },
  }]
});

document.body.addEventListener("mousemove", function(e){
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.transform = `translate(${x-cs/2}px, ${y-cs/2}px)`;
  hoverElement(x, y);
  setTimeout(() => {
    follow_cursor.style.transform = `translate(${x-fcs/2}px, ${y-fcs/2}px)`;
  }, 150);
});

function hoverElement(x, y) {
  let hoverEl = document.elementFromPoint(x, y)
  if(hoverEl.tagName == "A") {
    follow_cursor.style.backgroundColor = "#0228fc";
    fcs = 60;
  } else {
    follow_cursor.style.backgroundColor = "#fcfc02";
    fcs = 32;
  }
  follow_cursor.style.width = `${fcs}px`;
  follow_cursor.style.height = `${fcs}px`;
}

let links = document.querySelectorAll('a[href]');
let cbk = function(e) {
  if(e.currentTarget.href === window.location.href) {
    e.preventDefault();
    e.stopPropagation();
  }
};

for(let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', cbk);
}