$(document).ready(function () {
    $('.INFORMATION_NAVS li:first-child').addClass('INFORTAB_ACTIVE');
    $('.INFORMATION_BOX ul:first-child').addClass('INFORACTIVE');

    $('.INFORMATION_NAVS li').click(function (e) {
        e.preventDefault();
        var tab_id = $(this).find('a').attr('href');

        $('.INFORMATION_NAVS li').removeClass('INFORTAB_ACTIVE');
        $('.INFORMATION_BOX ul').removeClass('INFORACTIVE');

        $(this).addClass('INFORTAB_ACTIVE');
        $(tab_id).addClass('INFORACTIVE');
    });
});