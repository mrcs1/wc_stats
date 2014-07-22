$(document).ready(function() {
    $(document).scroll(function () {
        var scroll = $(this).scrollTop();
        var topDist = $(".rte-header").position();
        if (scroll > topDist.top) {
            $('nav.ww1').css({"position":"fixed","top":"0"});
        } else {
            $('nav.ww1').css({"position":"static","top":"auto"});
        }
    });
});