var reserveNormal2Data = {}; // 定義一個空的物件用於存儲預約數據

//獲取使用者在本頁面表單填入的資料內容
function ReserveGrabData() {
    var ownerName = document.getElementById("owner_name").value;
    var phoneno = document.getElementById("phoneno").value;
    var petName = document.getElementById("pet_name").value;
    var petSpecie = document.getElementById("pet_specie").value;
    var petAge = document.getElementById("pet_age").value;
    var vaccinationOrNot = document.getElementById("vaccinationOrNot").value;
    //-----------目前進度------------//

    // 將值存儲到網站內存中
    reserveData.reserveType = reserveType;
    reserveData.doctorChoices = doctorChoices;
    reserveData.reserveDate = reserveDate;
    reserveData.reserveTime = reserveTime;

    console.log(reserveData); // 在控制台上輸出存儲的數據

    //檢查使用者有沒有漏填資料
    if (reserveType === "") {
        alert("請選擇預約類型");
        return; // 中斷後續程式碼的執行
    }
    if (reserveDate === "") {
        alert("請選擇預約日期");
        return; // 中斷後續程式碼的執行
    }
    if (reserveTime === "") {
        alert("請選擇預約時段");
        return; // 中斷後續程式碼的執行
    }

}