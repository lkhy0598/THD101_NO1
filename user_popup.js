$(document).ready(function () {
    // ====== 彈跳視窗函式設定 ======
    // 初始化頁籤及內容的函式
    function POPUP_READY() {
        $('.POPUP_NAVS li').removeClass('TAB_ACTIVE');
        $('.POPUP_TABS_CONTENT div').removeClass('POPUPACTIVE')
    };
    // 登入和註冊的頁籤初始化
    function LOGIN_SIGNUP_TABS_READY() {
        $('.POPUP_NAVS li').removeClass('CLOSETABS');
        $('.FORGETTABS, .CHANGETABS').addClass('CLOSETABS');
    };
    // 忘記及修改密碼的頁籤初始化
    function PASSWORD_TABS_READY() {
        $('.POPUP_NAVS li').addClass('CLOSETABS');
        $('.FORGETTABS, .CHANGETABS').removeClass('CLOSETABS');
    };

    // ====== 彈跳視窗控制 ======
    // 打開彈跳視窗
    $('.LOGIN').click(function () {
        console.log("aaaa");
        // 載入登入頁
        POPUP_READY();
        LOGIN_SIGNUP_TABS_READY();
        $('.POPUP_NAVS li:first-child').addClass('TAB_ACTIVE');
        $('.POPUP_TABS_CONTENT div:first-child').addClass('POPUPACTIVE');
        $('.INPUT_GROUP').removeClass('POPUPACTIVE');

        // 打開視窗
        $('.MODAL').addClass('MODAL_ACTIVE');
        $('.POPUP_WRAP').addClass('POPUP_WRAP_ACTIVE');
    });

    // 關閉彈跳視窗
    $('.POPUP_CLOSEBTN, .MODAL').click(function () {
        $('.MODAL').removeClass('MODAL_ACTIVE');
        $('.POPUP_WRAP').removeClass('POPUP_WRAP_ACTIVE');
    });

    //阻止誤觸MODAL關閉
    $('.POPUP_WRAP').click(function (e) {
        e.stopPropagation();;
    })

    // ====== 登入及註冊 ======
    // 點選頁籤的登入或註冊功能
    $('.POPUP_NAVS li').click(function () {
        var tab_id = $(this).find('a').attr('href');
        // 初始化頁面
        POPUP_READY()
        // 顯示登入頁
        $(this).addClass('TAB_ACTIVE');
        $(tab_id).addClass('POPUPACTIVE');
    });

    // 登入頁內下面的註冊會員
    $('.SIGNUP_BTN').click(function () {
        // 初始化頁面
        POPUP_READY();
        LOGIN_SIGNUP_TABS_READY();
        // 載入註冊頁面
        $('.POPUP_NAVS li:nth-child(2)').addClass('TAB_ACTIVE');
        $('#POPUP_SIGNUP').addClass('POPUPACTIVE');

    });
    // 註冊頁內的送出資料
    $('.SIGNUP_SUB').click(function (e) {
        // 阻止連結PHP
        e.preventDefault();
        // 提示是否成功
        alert('註冊成功，請重新登入!');
        // 載入登入頁
        POPUP_READY();
        LOGIN_SIGNUP_TABS_READY();
        $('.POPUP_NAVS li:first-child').addClass('TAB_ACTIVE');
        $('.POPUP_TABS_CONTENT div:first-child').addClass('POPUPACTIVE');
        $('.INPUT_GROUP').removeClass('POPUPACTIVE');
    });

    // ====== 忘記密碼 ======
    $('.FORGET_BTN').click(function () {
        // 初始化頁面
        POPUP_READY()
        PASSWORD_TABS_READY()

        // 顯示忘記密碼頁
        $('.FORGETTABS').addClass('TAB_ACTIVE');
        $('.CHANGETABS').addClass('CLOSETABS');
        $('#popup_forgetpass').addClass('POPUPACTIVE');
    });
    // 返回登入
    $('.BACKLOGIN_BTN').click(function (e) {
        e.preventDefault();
        // 載入登入頁
        POPUP_READY();
        LOGIN_SIGNUP_TABS_READY();
        $('.POPUP_NAVS li:first-child').addClass('TAB_ACTIVE');
        $('.POPUP_TABS_CONTENT div:first-child').addClass('POPUPACTIVE');
        $('.INPUT_GROUP').removeClass('POPUPACTIVE');
    });
    // ====== 修改密碼 ======
    $('.PASS_SUB').click(function (e) {
        // 阻止連結PHP
        e.preventDefault();
        // 初始化頁面
        $('.FORGETTABS').addClass('CLOSETABS');
        $('.CHANGETABS').removeClass('CLOSETABS');
        $('.POPUP_TABS_CONTENT div').removeClass('POPUPACTIVE');

        // 顯示修改密碼頁
        $('.CHANGETABS').addClass('TAB_ACTIVE');
        $('#popup_changepass').addClass('POPUPACTIVE');

        // 顯示修改完成頁
        $('.PASS_SUB').click(function (e) {
            // 阻止連結PHP
            e.preventDefault();
            $('.POPUP_TABS_CONTENT div').removeClass('POPUPACTIVE');
            $('#popup_changepass_succ').addClass('POPUPACTIVE');
            
            // 延遲三秒後跳轉
            setTimeout(function () {
                // 載入登入頁
                POPUP_READY();
                LOGIN_SIGNUP_TABS_READY();
                $('.POPUP_NAVS li:first-child').addClass('TAB_ACTIVE');
                $('.POPUP_TABS_CONTENT div:first-child').addClass('POPUPACTIVE');
                $('.INPUT_GROUP').removeClass('POPUPACTIVE');
            }, 3000);
        });
    });
});