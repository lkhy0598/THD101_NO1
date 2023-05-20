$(document).ready(function () {
    $(window).scroll(function () {
        if ($('.M_HEADER_NAV ul').css('display') == 'none') {
            if ($(window).scrollTop() === 0) {
                // 導覽列陰影
                $('.HEADER_NAV, .M_HEADER_NAV_BG')
                    .removeClass('HEADER_NAV_SHADOW');

                // RWD導覽列底色
                $('.M_HEADER_NAV_BG')
                    .removeClass('M_HEADER_BG_ACTIVE');

                // LOGO形變
                $('.HEADERLOGO_BG_BOX')
                    .addClass('HEADERLOGE_BG_TOP ')
                    .removeClass('HEADERLOGE_BG_SCROLL');

                $('.HEADERLOGO_PAW')
                    .removeClass('HEADERLOGO_S');

                $('.HEADER_LOGO_NAME')
                    .removeClass('HEADERNAME_S');


            } else {
                // 導覽列陰影
                $('.HEADER_NAV, .M_HEADER_NAV_BG')
                    .addClass('HEADER_NAV_SHADOW');

                // RWD導覽列底色
                $('.M_HEADER_NAV_BG')
                    .addClass('M_HEADER_BG_ACTIVE');

                // LOGO形變
                $('.HEADERLOGO_BG_BOX')
                    .addClass('HEADERLOGE_BG_SCROLL')
                    .removeClass('HEADERLOGE_BG_TOP');

                $('.HEADERLOGO_PAW')
                    .addClass('HEADERLOGO_S');

                $('.HEADER_LOGO_NAME')
                    .addClass('HEADERNAME_S');
            }
        }
    });
});


// ========= RWD nav ==========
$(document).ready(function () {
// 漢堡線點擊相關功能
    $(".TOGGLE").click(function () {
        $('.TOGGLE > span').toggleClass('close');
        $('.TOGGLE').toggleClass('close');
        $(".M_HEADER_NAV > ul").slideToggle();
        $(".HEADER_NAV, .M_HEADER_NAV_BG").removeClass('HEADER_NAV_SHADOW');
        $(".M_HEADER_NAV_BG").removeClass('M_HEADER_BG_ACTIVE');

        if ($("#TOGGLE")) {
            // $('.M_HEADER_NAV')
            //     .toggleClass('M_HEADER_NAV_SHADOW ');

            $('.M_HEADERLOGO_BG_BOX')
                .toggleClass('M_HEADERLOGE_BG_SCROLL')
                .toggleClass('M_HEADERLOGE_BG_TOP');

            $('.M_HEADERLOGO_PAW')
                .toggleClass('M_HEADERLOGO_S');

            $('.M_HEADER_LOGO_NAME')
                .toggleClass('M_HEADERNAME_S')
        }
    });

});

// 畫面停止3秒自動移除RWD導覽列的底色
// 計時器
var timer;

// 監聽滾動事件
$(window).on('scroll', resetTimer);

// 開始計時
startTimer();

// 重新計時的函式
function resetTimer() {
    clearTimeout(timer);
    startTimer();
}
// 計時兩秒後移除導覽列底色
function startTimer() {
    timer = setTimeout(function () {
        $('.M_HEADER_NAV_BG').removeClass('M_HEADER_BG_ACTIVE');
        $('.M_HEADER_NAV_BG').removeClass('HEADER_NAV_SHADOW');
    }, 2000);
}

// 撥打電話功能
$('.PHONE_BTN').on('click', function () {
    var phoneNumber = "0900-000-000";
    // 检查设备是否支持电话功能
    if ('call' in navigator) {
        // 请求拨打电话
        navigator.call(phoneNumber);
    } else {
        console.log('本設備不支援撥打電話功能！');
        alert('本設備不支援撥打電話功能！');
    }
});
