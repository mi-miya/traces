$(window).scroll(function() {
	var offset = $(this).scrollTop() / 50;
	$('.top_back').css( 'filter', `blur(${offset}px)`);
});