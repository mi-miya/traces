let oldPos;
let timeoutId;
let el;

window.onload = () => {
  oldPos = window.scrollY;
  el = document.getElementById('el');
  
  window.addEventListener( "scroll", () => {
    clearTimeout( timeoutId ) ;
    timeoutId = setTimeout( function () {
      // console.log('スクロール距離 : ', window.scrollY - oldPos);
      // console.log('最大スクロール距離 : ', document.body.offsetHeight - window.innerHeight);
      scrollToAngle(window.scrollY - oldPos, document.body.offsetHeight - window.innerHeight);
      oldPos = window.scrollY;
    }, 200 );
  }) ;
}

function scrollToAngle(scrolled = 0, maxScroll = 0) {
  console.log(45 * (scrolled / maxScroll));
  el.style.transform = `rotate(${45 * (scrolled / maxScroll)}deg)`;
  // el.style.transform = 'rotate(45deg)';
}