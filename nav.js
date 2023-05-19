$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() === 0) {
            // 導覽列陰影
            $('.HEADER_NAV')
                .removeClass('HEADER_NAV_SHADOW ');

            // LOGO形變
            $('.HEADERLOGO_BG_BOX')
                .addClass('HEADERLOGE_BG_TOP ')
                .removeClass('HEADERLOGE_BG_SCROLL ');

            $('.HEADERLOGO_PAW')
                .removeClass('HEADERLOGO_S ');

            $('.HEADER_LOGO_NAME')
                .removeClass('HEADERNAME_S ');


        } else {
            // 導覽列陰影
            $('.HEADER_NAV')
                .addClass('HEADER_NAV_SHADOW ');
            // LOGO形變
            $('.HEADERLOGO_BG_BOX')
                .addClass('HEADERLOGE_BG_SCROLL ')
                .removeClass('HEADERLOGE_BG_TOP ');

            $('.HEADERLOGO_PAW')
                .addClass('HEADERLOGO_S ');

            $('.HEADER_LOGO_NAME')
                .addClass('HEADERNAME_S ');
        }
    });
});