document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var today = new Date(); // 取得當前日期
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // 初始視圖為月曆視圖
        locale: 'zh-tw', // 使用繁體中文語言
        // FullCalendar的配置選項
        // ...
        dateClick: function (info) {
            // 點擊日期後的處理程式碼
            var selectedDate = info.date;
            updateSelectedAppointmentDate(selectedDate);
        },
        initialDate: today, // 設定初始日期為今天
    });

    calendar.render();

    // 更新預約日期為今天
    updateSelectedAppointmentDate(today);
});

// 更新選擇的預約類型到 localStorage
function updateSelectedAppointmentType() {
    var appointmentTypeSelect = document.getElementById('appointment_type');
    var selectedAppointmentType = appointmentTypeSelect.value;
    localStorage.setItem('selectedAppointmentType', selectedAppointmentType);
}

// 更新選擇的診間編號到 localStorage
function updateSelectedRoomNumber() {
    var roomNumberSelect = document.getElementById('room_number');
    var selectedRoomNumber = roomNumberSelect.value;
    localStorage.setItem('selectedRoomNumber', selectedRoomNumber);
}

// 從 localStorage 中取得選擇的預約類型
function getSelectedAppointmentType() {
    return localStorage.getItem('selectedAppointmentType') || '';
}

// 從 localStorage 中取得選擇的診間編號
function getSelectedRoomNumber() {
    return localStorage.getItem('selectedRoomNumber') || '';
}

// 更新選擇的預約日期
function updateSelectedAppointmentDate(date) {
    var selectedAppointmentDate = document.getElementById('selectedAppointmentDate');
    var selectedAppointmentType = getSelectedAppointmentType();
    var selectedRoomNumber = getSelectedRoomNumber();

    // 更新預約日期
    selectedAppointmentDate.innerHTML = `
      <p>${formatDate(date)} (${getWeekday(date)})</p>
      <p>${selectedAppointmentType}</p>
      <p>${selectedRoomNumber}</p>
    `;
}

// 在預約類型選擇時觸發更新
var appointmentTypeSelect = document.getElementById('appointment_type');
appointmentTypeSelect.addEventListener('change', function () {
    updateSelectedAppointmentType();
    var selectedDate = calendar.getDate();
    updateSelectedAppointmentDate(selectedDate);
});

// 在診間編號選擇時觸發更新
var roomNumberSelect = document.getElementById('room_number');
roomNumberSelect.addEventListener('change', function () {
    updateSelectedRoomNumber();
    var selectedDate = calendar.getDate();
    updateSelectedAppointmentDate(selectedDate);
});

// 初始化選擇的預約類型和診間編號
appointmentTypeSelect.value = getSelectedAppointmentType();
roomNumberSelect.value = getSelectedRoomNumber();

function formatDate(date) {
    var options = { month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('zh-TW', options);
}

function getWeekday(date) {
    var options = { weekday: 'long' };
    return date.toLocaleDateString('zh-TW', options);
}
