// QA索引跳轉的函式
function smoothScrollTo(targetId) {
    var targetOffset = $('#' + targetId).offset().top;
    var scrollOffset = targetOffset - 200; // 到目標位置後再往上 200 像素

    $('html, body').animate({
        scrollTop: scrollOffset
    }, 400);
};

$(document).ready(function () {

    // QA索引跳轉
    $('.QA_NAVS li').click(function () {
        // 初始化所有
        $('.ACCORDION_TITLE_BOX').removeClass('ACC_TITLE_ACTIVE');
        $('.ACCORDION_CONTENT_BOX').slideUp();
    });


    // QA手風琴
    $('.ACCORDION_TITLE_BOX').click(function () {
        // 先移除所有折疊面板標題的 active class，隱藏所有折疊面板內容
        $('.ACCORDION_TITLE_BOX').removeClass('ACC_TITLE_ACTIVE');
        $('.ACCORDION_CONTENT_BOX').slideUp();

        // 如果點擊的折疊面板內容沒有顯示，則顯示內容，並將該標題的 active class 添加上
        if (!$(this).next().is(':visible')) {
            $(this).addClass('ACC_TITLE_ACTIVE');
            $(this).next().slideDown();
        }
    });
    // // 手機板時禁用HOVER效果
    // if ($(window).width() <= 414) {
    //     $('.ACCORDION_TITLE_BOX').off('mouseenter mouseleave');
    // };
});