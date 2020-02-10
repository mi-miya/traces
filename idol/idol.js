$(window).on('load', function(){
    $('.menu_icon').on('click', function(){
        if($(this).hasClass("menu_off")){
            $(this).removeClass("menu_off").addClass("menu_on");
            $('.header_nav').removeClass("display_off").addClass("display_on");
        } else {
            $(this).removeClass("menu_on").addClass("menu_off");
            $('.header_nav').removeClass("display_on").addClass("display_off");
        }
    });
    
    var width = $(window).width();

    if(width <= 640){
        $('.scroll').slick({
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1300,
            arrows: false,
            dots: false,
            easing: "swing",
            swipeToSlide: true,
            centerMode: false,
        });
    } else {
        $('.scroll').slick({
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1300,
            arrows: false,
            dots: false,
            easing: "swing",
            swipeToSlide: true,
            centerMode: true,
            centerPadding: '15%'
        });
    }
})