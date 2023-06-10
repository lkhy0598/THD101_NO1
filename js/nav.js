$(document).ready(function () {
    // 強制漢堡線都是紅色
    $('.SPAN1').addClass('M_HEADER_TOGGLE_ACTIVE');
    $('.SPAN2').addClass('M_HEADER_TOGGLE_ACTIVE');
    $('.SPAN3').addClass('M_HEADER_TOGGLE_ACTIVE');

    $(window).scroll(function () {
        if ($(window).scrollTop() === 0) {
            // 導覽列陰影
            $('.HEADER_NAV, .M_HEADER_NAV')
                .removeClass('HEADER_NAV_SHADOW ');

            // RWD導覽列底色
            $('.M_HEADER_NAV')
                .removeClass('M_HEADER_BG_ACTIVE ');

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
            $('.HEADER_NAV, .M_HEADER_NAV')
                .addClass('HEADER_NAV_SHADOW ');

            // RWD導覽列底色
            $('.M_HEADER_NAV')
                .addClass('M_HEADER_BG_ACTIVE ');

            // RWD TOGGLE變色
            // $('.SPAN1').addClass('M_HEADER_TOGGLE_ACTIVE');
            // $('.SPAN2').addClass('M_HEADER_TOGGLE_ACTIVE');
            // $('.SPAN3').addClass('M_HEADER_TOGGLE_ACTIVE');



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

var element = $('.TOGGLE');

// 畫面停止3秒自動移除RWD導覽列的底色
// 計時器
var timer;

// 监听滚动事件
$(window).on('scroll', resetTimer);

// 开始计时器
startTimer();

// 重置计时器
function resetTimer() {
    clearTimeout(timer);
    startTimer();
}

// 开始计时器函数
function startTimer() {
    // 设置2秒后执行移除class的函数
    timer = setTimeout(function () {
        // 执行需要的操作，例如移除class
        $('.M_HEADER_NAV').removeClass('M_HEADER_BG_ACTIVE');
        $('.M_HEADER_NAV').removeClass('HEADER_NAV_SHADOW');

        // $('.SPAN1').removeClass('M_HEADER_TOGGLE_ACTIVE')
        // $('.SPAN2').removeClass('M_HEADER_TOGGLE_ACTIVE')
        // $('.SPAN3').removeClass('M_HEADER_TOGGLE_ACTIVE')
    }, 2000);
}

// ========= RWD NAV的LOGO 變化==========
$(document).ready(function () {

    $(".TOGGLE").click(function () {


        if ($("#TOGGLE")) {
            $('.M_HEADER_NAV')
                .toggleClass('M_HEADER_NAV_SHADOW ');

            $('.M_HEADERLOGO_BG_BOX')
                .toggleClass('M_HEADERLOGE_BG_SCROLL ')
                .toggleClass('M_HEADERLOGE_BG_TOP ');

            $('.M_HEADERLOGO_PAW')
                .toggleClass('M_HEADERLOGO_S ');

            $('.M_HEADER_LOGO_NAME')
                .toggleClass('M_HEADERNAME_S')
        }

    });

});

// 判斷是否登入相關功能 ========================
// showMember();
//顯示會員資訊
function showMember() {
    $.ajax({
        method: "POST",
        url: "../php/Member.php",
        // url: "http://localhost/THD101_NO1/php/Member.php",
        data: {},
        dataType: "text",
        success: function (response) {

            //窄版顯示>>Header.html
            $("#SHOWMEMBER").html(response);

        },
        error: function (exception) {
            alert("數據載入失敗: " + exception.status);
        }
    });
}

// 按登入紐停止預設行為
$(document).ready(function (e) {
    $('.LOGIN').click(function (e) {
        e.preventDefault();
    });
});


