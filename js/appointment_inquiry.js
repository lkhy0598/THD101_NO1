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
        // url: "php/appointment_inquiry.php",
        // 這是上server的路徑
        // url: "../php/appointment_inquiry.php",
        url: "../php/member_center.php",
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