// $(document).ready(function () {
// =================== 前端版面操控功能 ===================

// ====== 密碼關閉隱藏功能 ======
$(".SHOWPASS").click(function () {
    console.log('aaa')
    var passwordField = $(this).siblings(".PASSWORD");
    var icon = $(this).find("i");
    var fieldType = passwordField.attr("type");

    if (fieldType === "password") {
        console.log('bbb')
        passwordField.attr("type", "text");
        icon.removeClass("bi-eye-fill").addClass("bi-eye-slash-fill");
    } else {
        console.log('ccc')
        passwordField.attr("type", "password");
        icon.removeClass("bi-eye-slash-fill").addClass("bi-eye-fill");
    }
});

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
function LOGIN() {
    // console.log("aaaa");
    // 載入登入頁
    POPUP_READY();
    LOGIN_SIGNUP_TABS_READY();
    $('.POPUP_NAVS li:first-child').addClass('TAB_ACTIVE');
    $('.POPUP_TABS_CONTENT div:first-child').addClass('POPUPACTIVE');
    $('.INPUT_GROUP').removeClass('POPUPACTIVE');
    $('.BTN').removeClass('POPUPACTIVE');
    // 清空input裡面的值
    $('.MODAL input').val('');

    // 初始化隱藏密碼
    $(".PASSWORD").attr("type", "password");
    $(".SHOWPASS").find('i').removeClass("bi-eye-slash-fill").addClass("bi-eye-fill");

    // 初始化填空警告
    // 註冊
    $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");

    // 打開視窗
    $('.MODAL').addClass('MODAL_ACTIVE');
    $('.POPUP_WRAP').addClass('POPUP_WRAP_ACTIVE');
};

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
$('.TOSIGNUP_BTN').click(function () {
    // 初始化頁面
    POPUP_READY();
    LOGIN_SIGNUP_TABS_READY();
    // 載入註冊頁面
    $('.POPUP_NAVS li:nth-child(2)').addClass('TAB_ACTIVE');
    $('#POPUP_SIGNUP').addClass('POPUPACTIVE');

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
$('.BACKLOGIN_BTN').click(function () {
    // 載入登入頁
    POPUP_READY();
    LOGIN_SIGNUP_TABS_READY();
    $('.POPUP_NAVS li:first-child').addClass('TAB_ACTIVE');
    $('.POPUP_TABS_CONTENT div:first-child').addClass('POPUPACTIVE');
    $('.INPUT_GROUP').removeClass('POPUPACTIVE');
});


// ====== 修改密碼 ======
$('.TOPASS_BTN').click(function () {
    // 初始化頁面
    $('.FORGETTABS').addClass('CLOSETABS');
    $('.CHANGETABS').removeClass('CLOSETABS');
    $('.POPUP_TABS_CONTENT div').removeClass('POPUPACTIVE');

    // 顯示修改密碼頁
    $('.CHANGETABS').addClass('TAB_ACTIVE');
    $('#popup_changepass').addClass('POPUPACTIVE');

});

// 顯示修改完成頁

// 倒數計時是否中斷
var timeoutId = null;

// 監看是否有點擊返回登入，否則就三秒後跳轉登入頁面
$('.PASS_SUB').click(function () {

    $('.POPUP_TABS_CONTENT div').removeClass('POPUPACTIVE');
    $('#popup_changepass_succ').addClass('POPUPACTIVE');

    // 延遲三秒後跳轉
    timeoutId = setTimeout(function () {

        // 載入登入頁
        POPUP_READY();
        LOGIN_SIGNUP_TABS_READY();
        $('.POPUP_NAVS li:first-child').addClass('TAB_ACTIVE');
        $('.POPUP_TABS_CONTENT div:first-child').addClass('POPUPACTIVE');
        $('.INPUT_GROUP').removeClass('POPUPACTIVE');

    }, 3000);

});

// 點擊返回登入就阻止跳轉回登入頁
$('.SUCC_BTN').click(function () {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
});


//  =================== 連接資料庫的功能 ===================
// 加入會員功能
function joinSub(e) {

    let usn = $('.SIGNUP_USERNAME').val();
    let psw = $('.SIGNUP_PASSWORD').val();
    let vpw = $('.SIGNUP_VERIFPASSWORD').val();
    let pho = $('.SIGNUP_PHONENO').val();
    let eml = $('.SIGNUP_EMAIL').val();
    let vfy = $('.SIGNUP_VERIFY').val();

    if (usn === '' && pho === '' && eml === '' && psw === '' && vpw === '' && vfy === '') {
        // e.preventDefault();
        alert('註冊資料不得為空！');
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").eq(0).css("display", "block");
        return false;
    } else if (usn === '') {
        // e.preventDefault();
        alert('請輸入姓名！');
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").eq(1).css("display", "block");
        return false;
    } else if (psw === '') {
        // e.preventDefault();
        alert('請輸入密碼！');
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").eq(2).css("display", "block");
        return false;
    } else if (vpw === '') {
        // e.preventDefault();
        alert('請輸入確認密碼！');
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").eq(3).css("display", "block");

        return false;
    } else if (pho === '') {
        // e.preventDefault();
        alert('請輸入手機號碼！');
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").eq(4).css("display", "block");

        return false;
    } else if (eml === '') {
        // e.preventDefault();
        alert('請輸入信箱！');
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").eq(5).css("display", "block");

        return false;
    } else if (vfy === '') {
        // e.preventDefault();
        alert('請輸入驗證碼！');
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").eq(6).css("display", "block");
        return false;
    } else if (usn !== '' && psw !== '' && vpw !== '' && pho !== '' && eml !== '' && vfy !== '') {
        if (psw != vpw) {
            // e.preventDefault();
            alert('兩次密碼輸入不相同！');
            $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
            $(".SIGNUP_INPUTS .INPUT_WARN").find("p").eq(8).css("display", "block");
            return false;
        } else if (pho.length < 10) {
            // e.preventDefault();
            alert('手機號碼不正確！');
            $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
            $(".SIGNUP_INPUTS .INPUT_WARN").find("p").eq(9).css("display", "block");
            return false;
        } else {
            $.ajax({
                method: "POST",
                // url: "http://localhost/THD101_NO1/php/Join.php",
                url: "../php/Join.php",
                data: {
                    USERNAME: usn,
                    PHONENO: pho,
                    EMAIL: eml,
                    PASSWORD: psw
                },
                dataType: "text",
                success: function (response, status, xhr) {
                    console.log(response);

                    if (response.includes("註冊成功")) {
                        // 清空註冊資料
                        $('#POPUP_SIGNUP input').val('');
                        // 清空填空警告
                        $(".SIGNUP_INPUTS .INPUT_WARN").find("p").css("display", "none");
                        // 跳轉到註冊成功
                        $('.POPUP_TABS_CONTENT div').removeClass('POPUPACTIVE');
                        $('#popup_signup_succ').addClass('POPUPACTIVE');

                        alert(response);
                        // 監看是否有點擊返回登入，否則就三秒後跳轉登入頁面
                        timeoutId = setTimeout(function () {
                            // 載入登入頁
                            POPUP_READY();
                            LOGIN_SIGNUP_TABS_READY();
                            $('.POPUP_NAVS li:first-child').addClass('TAB_ACTIVE');
                            $('.POPUP_TABS_CONTENT div:first-child').addClass('POPUPACTIVE');
                            $('.INPUT_GROUP').removeClass('POPUPACTIVE');
                        }, 3000);
                    } else {
                        alert(response);
                    }
                },
                error: function (xhr, status, error) {
                    alert("發生錯誤: " + xhr.status); // 显示AJAX请求的错误信息
                }
            });
        }
    }
};

// 登入會員功能
function loginSub() {
    let lusn = $('.LOGIN_USERNAME').val();
    let lpsw = $('.LOGIN_PASSWORD').val();
    let leml = $('.LOGIN_EMAIL').val();

    //input your code...
    $.ajax({
        method: "POST",
        url: '../php/login.php',
        // url: "http://localhost/THD101_NO1/php/login.php",
        data: {
            USERNAME: lusn,
            EMAIL: leml,
            PASSWORD: lpsw
        },
        dataType: "text",
        success: function (response) {
            if (response.includes("登入成功")) {

                console.log(response)
                alert(response);
                window.location.href = window.location.href;
            } else {
                console.log(response)
                alert(response);
            };
        },
        error: function (exception) {
            alert("發生錯誤: " + exception.status);
        }
    });
}

// 登出會員
function logoutSub() {
    $.ajax({
        url: '../php/Logout.php',
        // url: 'http://localhost/THD101_NO1/php/Logout.php',
        type: 'GET',
        success: function (response) {
            // 在成功回應後執行以下動作
            alert(response);
            window.location.href = window.location.href;
        },
        error: function (xhr, status, error) {
            // 在錯誤回應時執行以下動作
            alert('登出失敗!');
        }
    });
}
// });

