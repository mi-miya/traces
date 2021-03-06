let oldPos = 0;
let timeoutId = 0;
let scrolls = [];
let minShakeAngle = 0.3; // 最小振れ角
let attenuation = 0.8; // 振幅減衰率
let defaultAngle = 40; // 基準振れ角

window.onload = () => {
  oldPos = window.scrollY;
  let shakes = Array.from(document.getElementsByClassName('shakes'));
  let canvas = document.getElementById('contents_board');
  let context = canvas.getContext('2d');
  context.font = "20px serif";
  context.fillText("Hello world", 10, 50);
  shakes.forEach((shake) => {
    scrolls.push(new Scroll(shake));
  });

  window.addEventListener( "scroll", () => {
    clearTimeout( timeoutId );
    timeoutId = setTimeout( function () {
      let distance = Math.abs(window.scrollY - oldPos);
      let angleRate = distance / (document.body.clientHeight - window.innerHeight);
      let angle = angleRate * defaultAngle;
      scrolls.forEach((scroll) => {
        scroll.shakeSet(angle);
      });
      oldPos = window.scrollY;
    }, 15);
  });
}

class Scroll {
  constructor(el) {
    this.el = el;
    this.maxAngle = 0;
    this.add = 1;
    this.animationId;
    this.animateFlg = false;
    this.angleRate = Math.random() + 0.5;
    this.animationInterval = 200 * Math.random() + 500;
    el.style.transition = `transform ${this.animationInterval}ms ease-in-out`;
    this.shakeSet(10);
  }

  shakeSet(angle) {
    angle *= this.angleRate;
    if(this.maxAngle < angle) {
      this.maxAngle = angle;
      if(!this.animateFlg) {
        this.animateFlg = true;
        this._shake();
      }
    }
  }

  _shake() {
    this.animationId = setInterval(() => {
      this.el.style.transform = `rotate(${this.maxAngle * this.add}deg)`;
      this.add = this.add * -1;
      if(this.maxAngle < minShakeAngle) {
        this.el.style.transform = `rotate(0deg)`;
        clearInterval(this.animationId);
        this._clearVariable();
        return;
      }
      this.maxAngle *= attenuation;
    }, this.animationInterval);
  }

  _clearVariable() {
    this.add = 1;
    this.maxAngle = 0;
    this.animateFlg = false;
  }
}