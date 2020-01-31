$(function() {
    var code = '';
    var textNumber = 0;
    var textCount = 0;
    var doch = $(document).innerHeight();
    var winh = $(window).innerHeight();
    var bottom = doch - winh;

    setInterval(function() {
        $('#cursor').toggle();
    }, 700);

    $.ajax({
        type: "GET",
        url: 'https://gist.githubusercontent.com/mi-miya/a4dc9d5ace56137a054d3c5b5fe37760/raw/d698a7457ed6d53ea0299d2a856c4385c3fb7f61/code.txt',
        dataType: "text",
        success: function(data){
            code = data;
            textCount = code.length;
        }
    });

    $(window).keydown(function(e){
        keyEvent();
    });
    $(window).keyup(function(e){
        keyEvent();
    });
    $(window).keypress(function(e){
        keyEvent();
    });

    function keyEvent() {
        $('#cursor').before(code[textNumber]);
        textNumber += 1;
        if(textCount <= textNumber) {
            textNumber = 0;
        }
        doch = $(document).innerHeight();
        winh = $(window).innerHeight();
        bottom = doch - winh;
        if (!bottom <= $(window).scrollTop()) {
            $("body, html").animate({scrollTop:bottom}, 0);
        }
    };
});
