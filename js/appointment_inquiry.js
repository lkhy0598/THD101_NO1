function doQuery(){
    alert('lalala');
    // 你是要抓整個element，還是value
    var phoneNo = document.getElementById('phoneNo').value;
    // Headers('https://tibamef2e.com/thd101/g1/php/appointment_inquiry.php');
    $.ajax({
        method: "POST",
        // url: "https://tibamef2e.com/thd101/g1/php/appointment_inquiry.php",
        // url: "php/appointment_inquiry.php",
        // 這是本機測試的php路徑
        // JS is inclueded in HTML,so the route must be started from HTML.
        url: "./php/appointment_inquiry.php",
        // 這是上server的路徑
        // url: "../php/appointment_inquiry.php",
        // url: "../php/member_center.php",
        data: {
            // phppost:js
            phoneNo:phoneNo
            
        },
        dataType: "text",
        success: function (response) {
           alert('hello');
            $("#petName").html(response);
            
        },
        error: function (exception) {
            alert("ajax發生錯誤" +exception.status);
        }

    });
}

// 會員搜尋
function doSearchApp(){
    // alert('lala');
    console.log(checksessionResponse);
    var phone = $("#phone").val();
    var name = $("#name").val();

    if (phone === "" && name === "") {
        // 若輸入欄位為空，不執行搜尋操作
        return;
    }
    // console.log(phone);
    $.ajax({            
        method: "POST",
        // url: "http://localhost/THD101_NO1/php/back_search_member.php",
        url:"../php/back_search_member.php",
        data:{
            phone: phone, 
            name: name
        },            
        dataType: "json",
        success: function (response) {
            // console.log(response);
            // 更新html內容前先清空原有資料
            $("#result").html("");
            // 更新html內容(透過jQuery跑迴圈取值)
            $.each(response, function(index, row) {
                $("#result").append(
                    "<ul class='MEMBER_PROFILE_CONTENT BACK_TABLE_CONTENT' >" + 
                    "<li>" + row.NAME +"</li>" +
                    "<li>" + row.PHONENO + "</li>" +
                    "<li>" + row.EMAIL + "</li>" +
                    "<li><i class='bi bi-pencil RE_MEMBER_PROFILE' onclick='doReviseMember(\"" + row.PHONENO + "\")' ></i></li>"
                    + "</ul>"
                );
            });
        },
        error: function(exception) {
            alert("發生錯誤: " + exception.status);
        }
    });
}