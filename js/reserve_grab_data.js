var reserveData = {}; // 定義一個空的物件用於存儲預約數據

//在選擇預約類型為寵物溝通時指定醫師選項變成只有溝通師姓名，反之變回獸醫師姓名
function changeReserveType() {
  var reserveType = document.getElementById("reserve_type").value;
  var doctorChoices = document.getElementById("doctor_choices");

  // 清空原有的選項
  doctorChoices.innerHTML = "";

  // 根據選擇的預約類型動態添加選項
  if (reserveType === "寵物溝通") {
    var option1 = document.createElement("option");
    option1.value = "羅婉瑜";
    option1.text = "羅婉瑜";
    doctorChoices.appendChild(option1);

  } else {
    // 一般掛號類型的選項
    var option2 = document.createElement("option");
    option2.value = "不指定";
    option2.text = "不指定";
    doctorChoices.appendChild(option2);

    var option3 = document.createElement("option");
    option3.value = "林佳緯";
    option3.text = "林佳緯";
    doctorChoices.appendChild(option3);

    var option4 = document.createElement("option");
    option4.value = "詹宗豪";
    option4.text = "詹宗豪";
    doctorChoices.appendChild(option4);

    var option5 = document.createElement("option");
    option5.value = "林育楣";
    option5.text = "林育楣";
    doctorChoices.appendChild(option5);

    var option6 = document.createElement("option");
    option6.value = "汪玉婷";
    option6.text = "汪玉婷";
    doctorChoices.appendChild(option6);

    var option7 = document.createElement("option");
    option7.value = "范植鑫";
    option7.text = "范植鑫";
    doctorChoices.appendChild(option7);

    var option8 = document.createElement("option");
    option8.value = "賴偉峰";
    option8.text = "賴偉峰";
    doctorChoices.appendChild(option8);
  }
}

//獲取使用者在本頁面表單填入的資料內容
function ReserveGrabData() {
  var reserveType = document.getElementById("reserve_type").value;
  var doctorChoices = document.getElementById("doctor_choices").value;
  var reserveDate = document.getElementById("reserve_date").value;
  var reserveTime = document.getElementById("reserve_time").value;

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

  //檢查使用者有沒有誤填日期
  var today = new Date().toISOString().split("T")[0]; // 獲取當前日期

  if (reserveDate != "" && reserveDate < today) {
    alert("預約日期不能早於今天！");
    return; // 中斷後續程式碼的執行
  }

  // 將值存儲到網站內存中
  reserveData.reserveType = reserveType;
  reserveData.doctorChoices = doctorChoices;
  reserveData.reserveDate = reserveDate;
  reserveData.reserveTime = reserveTime;

  // 將資料存儲到 localStorage 中
  localStorage.setItem('reserveData', JSON.stringify(reserveData));

  console.log(reserveData); // 在控制台上輸出存儲的數據

}

//控制當使用者選擇的預約類型是寵物溝通時導向reserve_communication2.html，選一般掛號則導向reserve_normal2.html

function RecognizingType() {
  var reserve_type = document.getElementById("reserve_type").value;
  var reserveDate = document.getElementById("reserve_date").value;
  var reserveTime = document.getElementById("reserve_time").value;

  if (reserve_type === "一般掛號" && reserveDate != "" && reserveTime != "") {
    window.location.href = "../reserve_normal2.html";
  } else if (reserve_type === "寵物溝通" && reserveDate != "" && reserveTime != "") {
    window.location.href = "../reserve_communication2.html";
  }
}

// 從 localStorage 中取得預約數據
function GetReserveDataFromLocalStorage() {
  var reserveData = JSON.parse(localStorage.getItem('reserveData'));

  // 使用 reserveData 中的資料進行後續處理

  console.log(reserveData); // 在控制台上輸出從 localStorage 中取得的資料
}