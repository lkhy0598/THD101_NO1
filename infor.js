$(document).ready(function () {
    $('.INFORMATION_NAVS li:first-child').addClass('INFORTAB_ACTIVE');
    $('.INFORMATION_BOX ul:first-child').addClass('INFORACTIVE');
    $('.INFORMATION_NAV_BG').css({
        'left': '0%',
        'transform': 'translateX(0%)'
    });


    $('.INFORMATION_NAVS li').click(function (e) {
        e.preventDefault();
        var tab_id = $(this).find('a').attr('href');

        $('.INFORMATION_NAVS li').removeClass('INFORTAB_ACTIVE');
        $('.INFORMATION_BOX ul').removeClass('INFORACTIVE');

        $(this).addClass('INFORTAB_ACTIVE');
        $(tab_id).addClass('INFORACTIVE');
    });
    // 標籤底色
    $('.TABL').click(function (e) {
        // e.preventDefault();
        $('.INFORMATION_NAV_BG').css({
            'left': '0%',
            'transform': 'translateX(0%)'
        });
    });
    $('.TABC').click(function (e) {
        // e.preventDefault();
        $('.INFORMATION_NAV_BG').css({
            'left': '50%',
            'transform': 'translateX(-50%)'
        });
    });
    $('.TABR').click(function (e) {
        // e.preventDefault();
        $('.INFORMATION_NAV_BG').css({
            'left': '100%',
            'transform': 'translateX(-100%)'
        });
    });
});