// 密碼關閉隱藏功能
$(".SHOWPASS").click(function () {
    var passwordField = $("#PASSWORD");
    var icon = $(this).find("i");
    var fieldType = passwordField.attr("type");

    if (fieldType === "password") {
        passwordField.attr("type", "text");
        icon.removeClass("bi-eye-fill").addClass("bi-eye-slash-fill");
    } else {
        passwordField.attr("type", "password");
        icon.removeClass("bi-eye-slash-fill").addClass("bi-eye-fill");
    }
});

// 加入會員功能
function joinSub() {
    let usn = $('#USERNAME').val();
    let pho = $('#PHONENO').val();
    let eml = $('#EMAIL').val();
    let psw = $('#PASSWORD').val();

    if (usn === '' && pho === '' && eml === '' && psw === '') {
        $("#result").html("");
        $("#result").html("註冊失敗，欄位不得為空");
    } else if (usn === '') {
        $("#result").html("");
        $("#result").html("註冊失敗，請填寫姓名");
    } else if (pho === '') {
        $("#result").html("");
        $("#result").html("註冊失敗，請填寫電話");
    } else if (eml === '') {
        $("#result").html("");
        $("#result").html("註冊失敗，請填寫信箱");
    } else if (psw === '') {
        $("#result").html("");
        $("#result").html("註冊失敗，請填寫密碼");
    } else if (usn !== '' && pho !== '' && eml !== '' && psw !== '') {
        $.ajax({
            method: "POST",
            url: "../php/Join.php",
            // url: "https://tibamef2e.com/thd101/g1/php/Join.php",
            data: {
                USERNAME: usn,
                PHONENO: pho,
                EMAIL: eml,
                PASSWORD: psw
            },
            dataType: "text",
            success: function (response) {
                //更新html內容
                $("#result").html("");
                $("#result").html(response);
            },
            error: function (exception) {
                alert("發生錯誤: " + exception.status);
            }
        });
    }

};

// 列出會員列表
function AllMemberSub() {
    $.ajax({
        method: "POST",
        url: "../php/Select.php",
        // url: "https://tibamef2e.com/thd101/g1/php/Select.php",

        dataType: "json",
        success: function (response) {
            //更新html內容前先清空原有資料
            $("#result2").html("");

            $.each(response, function (index, row) {
                $("#result2").append(row.NAME + "/" + row.PHONENO + "/" + row.PASSWORD + "/" + row.CREATE_DATE + "<br/>");
            });
        },
        error: function (exception) {
            alert("發生錯誤: " + exception.status);
        }
    })
};
// 清空會員列表
$("#clear-btn").click(function (e) {
    e.preventDefault();
    $("#result2").html("");
});

// 註冊結果若為空做出相對應的字
$("#send-btn").click(function (e) {
    var acc = $("#account").val();
    var psw = $("#password").val();

    if (acc === '' && psw === '') {
        e.preventDefault();
        alert('帳號密碼不得為空！');
    } else if (acc === '') {
        e.preventDefault();
        alert('請輸入帳號！');
    } else if (psw === '') {
        e.preventDefault();
        alert('請輸入密碼！');
    }
});