const ImageLength = 30;
let bg_dot;
let nav_icon;
let modal;
let navIconFlg = false;
let imgArray = [];

window.onload = () => {
  nav_icon = document.getElementById('nav_icon');
  bg_dot = document.getElementById('bg_dot');
  modal = document.getElementById('modal');
  for(let idx = 0; idx < ImageLength; idx++) {
    let randomX = Math.random() * 100 - 10;
    let randomY = Math.random() * 100 - 10;
    let randomImage = Math.round(Math.random() * 3) + 1;
    let img = document.createElement('img');
    img.src = `images/${randomImage}.png`;
    img.className = 'bg_image';
    bg_dot.appendChild(img);
    img.style.top = `${randomX}%`;
    img.style.left = `${randomY}%`;
    imgArray.push(img);
  }
  nav_icon.addEventListener('click', (e) => {
    if(navIconFlg) {
      nav_icon.classList.remove('clickNavIcon');
      modal.style.opacity = 0;
      modal.style.pointerEvents = "none";
      navIconFlg = false;
    } else {
      nav_icon.classList.add('clickNavIcon');
      modal.style.opacity = 1;
      modal.style.pointerEvents = "auto";
      navIconFlg = true;
    }
  })
  let idx = 0;
  let repeat = setInterval(() => {
    imgArray[idx].style.opacity = 1;
    idx++;
    if(!imgArray[idx]) {
      clearTimeout(repeat);
    }
  }, 100);
}
