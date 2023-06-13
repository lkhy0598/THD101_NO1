var reserveData = {}; // 定義一個空的物件用於存儲預約數據
var calendar = document.getElementById("calendar");
var calendar2 = document.getElementById("calendar2");
var CALENDARS = document.getElementById("CALENDARS");



//動態偵測選擇預約類型為寵物溝通時指定醫師選項變成只有溝通師姓名，反之變回獸醫師姓名，並在下方顯示相對應班表
function changeReserveType() {
  var reserveType = document.getElementById("reserve_type").value;
  var doctorChoices = document.getElementById("doctor_choices");

  // 清空原有的選項
  doctorChoices.innerHTML = "";

  // 根據選擇的預約類型動態更動指定醫師的下拉選單
  if (reserveType === "寵物溝通") {
    // 指定醫師的下拉選單只顯示溝通師
    var option1 = document.createElement("option");
    option1.value = "羅婉瑜";
    option1.text = "羅婉瑜";
    doctorChoices.appendChild(option1);

  } else if (reserveType === "一般掛號") {
    // 指定醫師的下拉選單只顯示獸醫師
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

  // 根據選擇的預約類型動態添加選項並顯示對應溝通師或獸醫師班表
  if (reserveType === "一般掛號") {
    CALENDARS.innerHTML = '<div id="calendar"></div>';
  } else if (reserveType === "寵物溝通") {
    CALENDARS.innerHTML = '<div id="calendar2"></div>';
  } else {
    // CALENDARS.innerHTML = '';
  }

  // // 重新初始化 FullCalendar 插件
  // // 這裡僅提供一個範例，請依據您自己的實際情況進行修改
  
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

}

//控制當使用者選擇的預約類型是寵物溝通時導向reserve_communication2.html，選一般掛號則導向reserve_normal2.html

function RecognizingType() {
  var reserve_type = document.getElementById("reserve_type").value;
  var reserveDate = document.getElementById("reserve_date").value;
  var reserveTime = document.getElementById("reserve_time").value;
  //檢查使用者有沒有誤填日期
  var today = new Date().toISOString().split("T")[0]; // 獲取當前日期

  if (reserveDate != "" && reserveDate < today) {
    return; // 中斷後續程式碼的執行
  }

  if (reserve_type === "一般掛號" && reserveDate != "" && reserveTime != "") {
    window.location.href = "./reserve_normal2.html";
  } else if (reserve_type === "寵物溝通" && reserveDate != "" && reserveTime != "") {
    window.location.href = "./reserve_communication2.html";
  }
}

//使用者click表格想填寫時時檢查使用者是否登入，若否則alert提醒
var reserve_type_select = document.getElementById("reserve_type");
var doctor_choices_select = document.getElementById("doctor_choices");
var reserve_date_date = document.getElementById("reserve_date");
var reserve_time_select = document.getElementById("reserve_time");

function logInCheck() {
  $.ajax({
    url: '../php/checksession.php',
    // url: 'http://localhost/THD101_NO1/php/checksession.php',
    type: 'POST',
    dataType: 'text',
    success: response => {
      this.checksessionResponse = response;
      if (response === 'notlogin') {
        // 使用者未登入，提醒他要登入才能進行預約
        alert("進行預約前請先登入會員！");
      }
    },
    error: error => {
      // 處理錯誤
    }
  });
}

reserve_type_select.addEventListener('click', logInCheck);
doctor_choices_select.addEventListener('click', logInCheck);
reserve_date_date.addEventListener('click', logInCheck);
reserve_time_select.addEventListener('click', logInCheck);

//----------- 班表月曆 -----------//

var calendar = document.getElementById("calendar");
    var calendar2 = document.getElementById("calendar2");
    var CALENDARS = document.getElementById("CALENDARS");

    function changeCalendar() {
      var reserveType = document.getElementById("reserve_type").value;

      // 根據選擇的預約類型動態添加選項並顯示對應溝通師或獸醫師班表
      if (reserveType === "一般掛號") {

        var calendarEl = document.getElementById('calendar');
        var today = new Date(); // 使用 JavaScript 原生 Date 物件取得當前日期

        var morningStartTime = '09:00:00'; // 早診開始時間
        var morningEndTime = '12:00:00'; // 早診結束時間
        var afternoonStartTime = '14:00:00'; // 午診開始時間
        var afternoonEndTime = '18:00:00'; // 午診結束時間
        var eveningStartTime = '19:00:00'; // 夜診開始時間
        var eveningEndTime = '21:00:00'; // 夜診結束時間

        var eventList = [];

        var firstWeekSunday = new Date('2023-05-28'); // 第一週的星期日
        var currentDate = new Date(firstWeekSunday); // 當前日期，從第一週的星期日開始

        while (currentDate.getFullYear() <= 2023) {

          var firstWeekMonday = new Date(currentDate); // 第一週的星期一
          firstWeekMonday.setDate(currentDate.getDate() + 1);
          var firstWeekTuesday = new Date(firstWeekMonday); // 第一週的星期二
          firstWeekTuesday.setDate(firstWeekMonday.getDate() + 1);
          var firstWeekWednesday = new Date(firstWeekMonday); // 第一週的星期三
          firstWeekWednesday.setDate(firstWeekMonday.getDate() + 2);
          var firstWeekThursday = new Date(firstWeekMonday); // 第一週的星期四
          firstWeekThursday.setDate(firstWeekMonday.getDate() + 3);
          var firstWeekFriday = new Date(firstWeekMonday); // 第一週的星期五
          firstWeekFriday.setDate(firstWeekMonday.getDate() + 4);
          var firstWeekSaturday = new Date(firstWeekMonday); // 第一週的星期六
          firstWeekSaturday.setDate(firstWeekMonday.getDate() + 5);
          var firstWeekSunday = new Date(firstWeekMonday); // 第一週的星期日
          firstWeekSunday.setDate(firstWeekMonday.getDate() + 6);

          var secondWeekMonday = new Date(firstWeekSunday); // 第二週的星期一
          secondWeekMonday.setDate(firstWeekSunday.getDate() + 1);
          var secondWeekTuesday = new Date(secondWeekMonday); // 第二週的星期二
          secondWeekTuesday.setDate(secondWeekMonday.getDate() + 1);
          var secondWeekWednesday = new Date(secondWeekMonday); // 第二週的星期三
          secondWeekWednesday.setDate(secondWeekMonday.getDate() + 2);
          var secondWeekThursday = new Date(secondWeekMonday); // 第二週的星期四
          secondWeekThursday.setDate(secondWeekMonday.getDate() + 3);
          var secondWeekFriday = new Date(secondWeekMonday); // 第二週的星期五
          secondWeekFriday.setDate(secondWeekMonday.getDate() + 4);
          var secondWeekSaturday = new Date(secondWeekMonday); // 第二週的星期六
          secondWeekSaturday.setDate(secondWeekMonday.getDate() + 5);
          var secondWeekSunday = new Date(secondWeekMonday); // 第二週的星期日
          secondWeekSunday.setDate(secondWeekMonday.getDate() + 6);

          var thirdWeekMonday = new Date(secondWeekSunday); // 第三週的星期一
          thirdWeekMonday.setDate(secondWeekSunday.getDate() + 1);
          var thirdWeekTuesday = new Date(thirdWeekMonday); // 第三週的星期二
          thirdWeekTuesday.setDate(thirdWeekMonday.getDate() + 1);
          var thirdWeekWednesday = new Date(thirdWeekMonday); // 第三週的星期三
          thirdWeekWednesday.setDate(thirdWeekMonday.getDate() + 2);
          var thirdWeekThursday = new Date(thirdWeekMonday); // 第三週的星期四
          thirdWeekThursday.setDate(thirdWeekMonday.getDate() + 3);
          var thirdWeekFriday = new Date(thirdWeekMonday); // 第三週的星期五
          thirdWeekFriday.setDate(thirdWeekMonday.getDate() + 4);
          var thirdWeekSaturday = new Date(thirdWeekMonday); // 第三週的星期六
          thirdWeekSaturday.setDate(thirdWeekMonday.getDate() + 5);
          var thirdWeekSunday = new Date(thirdWeekMonday); // 第三週的星期日
          thirdWeekSunday.setDate(thirdWeekMonday.getDate() + 6);

          // 新增事件至第一週的星期一
          eventList.push({
            title: '林佳緯',
            start: formatDate(firstWeekMonday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekMonday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(firstWeekMonday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekMonday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(firstWeekMonday) + 'T' + morningStartTime,
            end: formatDate(firstWeekMonday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(firstWeekMonday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekMonday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(firstWeekMonday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekMonday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(firstWeekMonday) + 'T' + morningStartTime,
            end: formatDate(firstWeekMonday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(firstWeekMonday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekMonday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(firstWeekMonday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekMonday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第一週的星期二
          eventList.push({
            title: '林佳緯',
            start: formatDate(firstWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(firstWeekTuesday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(firstWeekTuesday) + 'T' + morningStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(firstWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(firstWeekTuesday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(firstWeekTuesday) + 'T' + morningStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(firstWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(firstWeekTuesday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第一週的星期三
          eventList.push({
            title: '詹宗豪',
            start: formatDate(firstWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(firstWeekWednesday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(firstWeekWednesday) + 'T' + morningStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(firstWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(firstWeekWednesday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(firstWeekWednesday) + 'T' + morningStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(firstWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(firstWeekWednesday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第一週的星期四
          eventList.push({
            title: '范植鑫',
            start: formatDate(firstWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(firstWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(firstWeekThursday) + 'T' + morningStartTime,
            end: formatDate(firstWeekThursday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(firstWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(firstWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(firstWeekThursday) + 'T' + morningStartTime,
            end: formatDate(firstWeekThursday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(firstWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(firstWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第一週的星期五
          eventList.push({
            title: '范植鑫',
            start: formatDate(firstWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(firstWeekFriday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekFriday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(firstWeekFriday) + 'T' + morningStartTime,
            end: formatDate(firstWeekFriday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(firstWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(firstWeekFriday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekFriday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(firstWeekFriday) + 'T' + morningStartTime,
            end: formatDate(firstWeekFriday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(firstWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(firstWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第一週的星期六
          eventList.push({
            title: '汪玉婷',
            start: formatDate(firstWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(firstWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(firstWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(firstWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(firstWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(firstWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(firstWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(firstWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(firstWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第二週的星期一
          eventList.push({
            title: '林佳緯',
            start: formatDate(secondWeekMonday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekMonday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(secondWeekMonday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekMonday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(secondWeekMonday) + 'T' + morningStartTime,
            end: formatDate(secondWeekMonday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(secondWeekMonday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekMonday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(secondWeekMonday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekMonday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(secondWeekMonday) + 'T' + morningStartTime,
            end: formatDate(secondWeekMonday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(secondWeekMonday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekMonday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(secondWeekMonday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekMonday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第二週的星期二
          eventList.push({
            title: '林佳緯',
            start: formatDate(secondWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(secondWeekTuesday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(secondWeekTuesday) + 'T' + morningStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(secondWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(secondWeekTuesday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(secondWeekTuesday) + 'T' + morningStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(secondWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(secondWeekTuesday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第二週的星期三
          eventList.push({
            title: '詹宗豪',
            start: formatDate(secondWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(secondWeekWednesday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(secondWeekWednesday) + 'T' + morningStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(secondWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(secondWeekWednesday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(secondWeekWednesday) + 'T' + morningStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(secondWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(secondWeekWednesday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第二週的星期四
          eventList.push({
            title: '范植鑫',
            start: formatDate(secondWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(secondWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(secondWeekThursday) + 'T' + morningStartTime,
            end: formatDate(secondWeekThursday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(secondWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(secondWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(secondWeekThursday) + 'T' + morningStartTime,
            end: formatDate(secondWeekThursday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(secondWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(secondWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第二週的星期五
          eventList.push({
            title: '范植鑫',
            start: formatDate(secondWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(secondWeekFriday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekFriday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(secondWeekFriday) + 'T' + morningStartTime,
            end: formatDate(secondWeekFriday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(secondWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(secondWeekFriday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekFriday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(secondWeekFriday) + 'T' + morningStartTime,
            end: formatDate(secondWeekFriday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(secondWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(secondWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第二週的星期六
          eventList.push({
            title: '范植鑫',
            start: formatDate(secondWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(secondWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(secondWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(secondWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(secondWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(secondWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(secondWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(secondWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(secondWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第三週的星期一
          eventList.push({
            title: '林佳緯',
            start: formatDate(thirdWeekMonday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekMonday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(thirdWeekMonday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekMonday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(thirdWeekMonday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekMonday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(thirdWeekMonday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekMonday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(thirdWeekMonday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekMonday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(thirdWeekMonday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekMonday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(thirdWeekMonday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekMonday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(thirdWeekMonday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekMonday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第三週的星期二
          eventList.push({
            title: '林佳緯',
            start: formatDate(thirdWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(thirdWeekTuesday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(thirdWeekTuesday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(thirdWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(thirdWeekTuesday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(thirdWeekTuesday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(thirdWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(thirdWeekTuesday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第三週的星期三
          eventList.push({
            title: '詹宗豪',
            start: formatDate(thirdWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(thirdWeekWednesday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(thirdWeekWednesday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(thirdWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(thirdWeekWednesday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(thirdWeekWednesday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(thirdWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(thirdWeekWednesday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第三週的星期四
          eventList.push({
            title: '范植鑫',
            start: formatDate(thirdWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(thirdWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(thirdWeekThursday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(thirdWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(thirdWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(thirdWeekThursday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林佳緯',
            start: formatDate(thirdWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(thirdWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第三週的星期五
          eventList.push({
            title: '范植鑫',
            start: formatDate(thirdWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(thirdWeekFriday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(thirdWeekFriday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(thirdWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '汪玉婷',
            start: formatDate(thirdWeekFriday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + eveningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(thirdWeekFriday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(thirdWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '林育楣',
            start: formatDate(thirdWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          // 新增事件至第三週的星期六
          eventList.push({
            title: '范植鑫',
            start: formatDate(thirdWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '范植鑫',
            start: formatDate(thirdWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第一診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(thirdWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '賴偉峰',
            start: formatDate(thirdWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第二診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(thirdWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '第三診間'
          });

          eventList.push({
            title: '詹宗豪',
            start: formatDate(thirdWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '第三診間'
          });

          currentDate.setDate(currentDate.getDate() + 21); // 前進三週
        }

        // 格式化日期為 YYYY-MM-DD
        function formatDate(date) {
          var year = date.getFullYear();
          var month = (date.getMonth() + 1).toString().padStart(2, '0');
          var day = date.getDate().toString().padStart(2, '0');
          return year + '-' + month + '-' + day;
        }

        // 初始化日曆
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          timeZone: 'Asia/Taipei',
          locale: 'zh-tw',
          displayEventTime: false,
          navLinks: false,
          events: eventList,
          eventContent: function (arg) {
            return {
              html: '<div class="event-title">' + arg.event.title + '</div>'
            };
          },
          initialDate: today // 設定初始日期為今天
        });

        calendar.render();

      } else if (reserveType === "寵物溝通") {

        var calendarEl = document.getElementById('calendar2');
        var today = new Date(); // 使用 JavaScript 原生 Date 物件取得當前日期

        var morningStartTime = '09:00:00'; // 早診開始時間
        var morningEndTime = '12:00:00'; // 早診結束時間
        var afternoonStartTime = '14:00:00'; // 午診開始時間
        var afternoonEndTime = '18:00:00'; // 午診結束時間
        var eveningStartTime = '19:00:00'; // 夜診開始時間
        var eveningEndTime = '21:00:00'; // 夜診結束時間

        var eventList = [];

        var firstWeekSunday = new Date('2023-05-28'); // 第一週的星期日
        var currentDate = new Date(firstWeekSunday); // 當前日期，從第一週的星期日開始

        while (currentDate.getFullYear() <= 2023) {

          var firstWeekMonday = new Date(currentDate); // 第一週的星期一
          firstWeekMonday.setDate(currentDate.getDate() + 1);
          var firstWeekTuesday = new Date(firstWeekMonday); // 第一週的星期二
          firstWeekTuesday.setDate(firstWeekMonday.getDate() + 1);
          var firstWeekWednesday = new Date(firstWeekMonday); // 第一週的星期三
          firstWeekWednesday.setDate(firstWeekMonday.getDate() + 2);
          var firstWeekThursday = new Date(firstWeekMonday); // 第一週的星期四
          firstWeekThursday.setDate(firstWeekMonday.getDate() + 3);
          var firstWeekFriday = new Date(firstWeekMonday); // 第一週的星期五
          firstWeekFriday.setDate(firstWeekMonday.getDate() + 4);
          var firstWeekSaturday = new Date(firstWeekMonday); // 第一週的星期六
          firstWeekSaturday.setDate(firstWeekMonday.getDate() + 5);
          var firstWeekSunday = new Date(firstWeekMonday); // 第一週的星期日
          firstWeekSunday.setDate(firstWeekMonday.getDate() + 6);

          var secondWeekMonday = new Date(firstWeekSunday); // 第二週的星期一
          secondWeekMonday.setDate(firstWeekSunday.getDate() + 1);
          var secondWeekTuesday = new Date(secondWeekMonday); // 第二週的星期二
          secondWeekTuesday.setDate(secondWeekMonday.getDate() + 1);
          var secondWeekWednesday = new Date(secondWeekMonday); // 第二週的星期三
          secondWeekWednesday.setDate(secondWeekMonday.getDate() + 2);
          var secondWeekThursday = new Date(secondWeekMonday); // 第二週的星期四
          secondWeekThursday.setDate(secondWeekMonday.getDate() + 3);
          var secondWeekFriday = new Date(secondWeekMonday); // 第二週的星期五
          secondWeekFriday.setDate(secondWeekMonday.getDate() + 4);
          var secondWeekSaturday = new Date(secondWeekMonday); // 第二週的星期六
          secondWeekSaturday.setDate(secondWeekMonday.getDate() + 5);
          var secondWeekSunday = new Date(secondWeekMonday); // 第二週的星期日
          secondWeekSunday.setDate(secondWeekMonday.getDate() + 6);

          var thirdWeekMonday = new Date(secondWeekSunday); // 第三週的星期一
          thirdWeekMonday.setDate(secondWeekSunday.getDate() + 1);
          var thirdWeekTuesday = new Date(thirdWeekMonday); // 第三週的星期二
          thirdWeekTuesday.setDate(thirdWeekMonday.getDate() + 1);
          var thirdWeekWednesday = new Date(thirdWeekMonday); // 第三週的星期三
          thirdWeekWednesday.setDate(thirdWeekMonday.getDate() + 2);
          var thirdWeekThursday = new Date(thirdWeekMonday); // 第三週的星期四
          thirdWeekThursday.setDate(thirdWeekMonday.getDate() + 3);
          var thirdWeekFriday = new Date(thirdWeekMonday); // 第三週的星期五
          thirdWeekFriday.setDate(thirdWeekMonday.getDate() + 4);
          var thirdWeekSaturday = new Date(thirdWeekMonday); // 第三週的星期六
          thirdWeekSaturday.setDate(thirdWeekMonday.getDate() + 5);
          var thirdWeekSunday = new Date(thirdWeekMonday); // 第三週的星期日
          thirdWeekSunday.setDate(thirdWeekMonday.getDate() + 6);

          // 新增事件至第一週的星期一


          // 新增事件至第一週的星期二
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekTuesday) + 'T' + morningStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第一週的星期三
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekWednesday) + 'T' + morningStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第一週的星期四
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(firstWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第一週的星期五
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekFriday) + 'T' + morningStartTime,
            end: formatDate(firstWeekFriday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第一週的星期六
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(firstWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(firstWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(firstWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第二週的星期一

          // 新增事件至第二週的星期二
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekTuesday) + 'T' + morningStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第二週的星期三
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekWednesday) + 'T' + morningStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第二週的星期四
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(secondWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第二週的星期五
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekFriday) + 'T' + morningStartTime,
            end: formatDate(secondWeekFriday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第二週的星期六
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(secondWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(secondWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(secondWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第三週的星期一

          // 新增事件至第三週的星期二
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekTuesday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekTuesday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekTuesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第三週的星期三
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekWednesday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekWednesday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekWednesday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第三週的星期四
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekThursday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekThursday) + 'T' + eveningStartTime,
            end: formatDate(thirdWeekThursday) + 'T' + eveningEndTime,
            allDay: false,
            description: '無診間'
          });


          // 新增事件至第三週的星期五
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekFriday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekFriday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekFriday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          // 新增事件至第三週的星期六
          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekSaturday) + 'T' + morningStartTime,
            end: formatDate(thirdWeekSaturday) + 'T' + morningEndTime,
            allDay: false,
            description: '無診間'
          });

          eventList.push({
            title: '羅婉瑜',
            start: formatDate(thirdWeekSaturday) + 'T' + afternoonStartTime,
            end: formatDate(thirdWeekSaturday) + 'T' + afternoonEndTime,
            allDay: false,
            description: '無診間'
          });

          currentDate.setDate(currentDate.getDate() + 21); // 前進三週
        }

        // 格式化日期為 YYYY-MM-DD
        function formatDate(date) {
          var year = date.getFullYear();
          var month = (date.getMonth() + 1).toString().padStart(2, '0');
          var day = date.getDate().toString().padStart(2, '0');
          return year + '-' + month + '-' + day;
        }

        // 初始化日曆
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          timeZone: 'Asia/Taipei',
          locale: 'zh-tw',
          displayEventTime: false,
          navLinks: false,
          events: eventList,
          eventContent: function (arg) {
            return {
              html: '<div class="event-title">' + arg.event.title + '</div>'
            };
          },
          initialDate: today // 設定初始日期為今天
        });

        calendar.render();

      } else {
        // CALENDARS.innerHTML = '';
      }
    }