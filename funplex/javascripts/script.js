let selected;
let position = {
  top: null,
  about: null,
  service: null,
  recruit: null
}

window.onload = () => {
  let index = 0;
  let svg_bg = document.getElementById('svg_bg');
  let r = Raphael("svg_area", "100%", "100%");
  position['top'] = document.getElementById('top');
  position['about'] = document.getElementById('about');
  position['service'] = document.getElementById('service');
  position['recruit'] = document.getElementById('recruit');
  selected = document.getElementsByClassName('selected')[0];
  r.setViewBox(0, 0, 14, 28, false);
  let letter = r.path("M0,0L0,0z");
  letter.animate({path: game[index]});
  svg_bg.innerHTML= `<img style="animation: bgZoom 4.5s ease-out;" src="images/${index}.jpg">`;
  index++;
  setInterval(() => {
    letter.animate({path: game[index]}, 250);
    svg_bg.innerHTML= `<img style="animation: bgZoom 4.5s ease-out;" src="images/${index}.jpg">`;
    index++;
    if(index >= 4) {
      index = 0;
    }
  }, 4500);
}

function clickLinks(pos) {
  selected.classList.remove('selected');
  selected = event.target;
  selected.classList.add('selected');
  window.scrollBy({
    left: 0, 
    top: position[pos].getBoundingClientRect().top - 95,
    behavior: 'smooth'
  });
}
