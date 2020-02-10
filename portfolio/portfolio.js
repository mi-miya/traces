$(window).on('load', () => {
  new Typed("#typed", {
    strings: [
      'Youth is not a time of life;<br>it is a state of mind;<br>Nobody grows old merely by a number of years.<br>We grow old by deserting our ideals.<br><span class="author">- Samuel Ullman "Youth" -</span>',
    ],
    typeSpeed: 50,
    startDelay: 200,
    backSpeed: 0,
    loop: false,
    contentType: 'html'
  });
});

$(window).scroll(function () {
  var offset = $(this).scrollTop() / 1600 + 0.6;
  $('.topShadow').css('opacity', `${offset}`);
});
