var reserveCommunication2Data = {}; // 定義一個空的物件用於存儲預約數據

// 檢查手機號碼格式
function phoneNumberCheck() {
    var phoneNumber = document.getElementById('phoneno').value;
    if(!(/^09\d{8}$/.test(phoneNumber))){
        alert("請輸入正確格式手機號碼！");
        return; // 中斷後續程式碼的執行
    } else {
        ReserveCommunication2GrabData();
    }
}


//獲取使用者在本頁面表單填入的資料內容
function ReserveCommunication2GrabData() {
    
    var ownerName = document.getElementById("owner_name").value;
    var phoneno = document.getElementById("phoneno").value;
    var petName = document.getElementById("pet_name").value;
    var petSpecies = document.getElementById("pet_species").value;
    var petAge = document.getElementById("pet_age").value;
    var vaccinationOrNot = document.getElementById("vaccinationOrNot").value;

    var otherDescription = document.getElementById("other_description").value;

    //檢查使用者有沒有漏填資料
    if (ownerName === "") {
        alert("請輸入飼主姓名！");
        return; // 中斷後續程式碼的執行
    }
    if (phoneno === "") {
        alert("請輸入手機號碼！");
        return; // 中斷後續程式碼的執行
    }
    if (petName === "") {
        alert("請輸入寵物名字！");
        return; // 中斷後續程式碼的執行
    }
    if (petSpecies === "") {
        alert("請選擇寵物種類！");
        return; // 中斷後續程式碼的執行
    }
    if (petAge === "") {
        alert("請輸入寵物年齡！");
        return; // 中斷後續程式碼的執行
    }
    if (petAge === "") {
        alert("請輸入寵物年齡！");
        return; // 中斷後續程式碼的執行
    }
    if (vaccinationOrNot === "") {
        alert("請選擇是否曾打過預防針！");
        return; // 中斷後續程式碼的執行
    }

    // 將值存儲到網站內存中
    reserveCommunication2Data.ownerName = ownerName;
    reserveCommunication2Data.phoneno = phoneno;
    reserveCommunication2Data.petName = petName;
    reserveCommunication2Data.petSpecies = petSpecies;
    reserveCommunication2Data.petAge = petAge;
    reserveCommunication2Data.vaccinationOrNot = vaccinationOrNot;

    reserveCommunication2Data.otherDescription = otherDescription;

    
    // 將資料存儲到 localStorage 中
    localStorage.setItem('reserveCommunication2Data', JSON.stringify(reserveCommunication2Data));
}

//使用者都有填好表格後導向reserve_communication3.html

function NextStep() {
    var ownerName = document.getElementById("owner_name").value;
    var phoneno = document.getElementById("phoneno").value;
    var petName = document.getElementById("pet_name").value;
    var petSpecies = document.getElementById("pet_species").value;
    var petAge = document.getElementById("pet_age").value;
    var vaccinationOrNot = document.getElementById("vaccinationOrNot").value;

    if (ownerName != "" && phoneno != "" && petName != "" && petSpecies != "" && petAge != "" && vaccinationOrNot != "") {
        console.log(reserveCommunication2Data);
        window.location.href = "./reserve_communication3.html";
    }
}