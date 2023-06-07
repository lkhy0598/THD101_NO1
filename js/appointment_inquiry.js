function doQuery(){
    alert('lalala');
    var phoneNo = document.getElementById('phoneNo');
    $.ajax({
        method: "POST",
        url: "https://tibamef2e.com/thd101/g1/php/appointment_inquiry.php",
        data: {
            // phppost:js
            phoneNo:phoneNo
            
        },
        dataType: "text",
        success: function (response) {
           
            $("#petName").html(response);
            
        },
        error: function (exception) {
            alert("ajax發生錯誤" +exception.status);
        }

    });
}