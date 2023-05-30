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

    // 在localStorage值更改時即時更新選擇的預約類型和診間編號
    window.addEventListener('storage', function (event) {
        if (event.key === 'selectedAppointmentType') {
            appointmentTypeSelect.value = event.newValue;
            var selectedDate = calendar.getDate();
            updateSelectedAppointmentDate(selectedDate);
        } else if (event.key === 'selectedRoomNumber') {
            roomNumberSelect.value = event.newValue;
            var selectedDate = calendar.getDate();
            updateSelectedAppointmentDate(selectedDate);
        }
    });

    function updateSelectedAppointmentType() {
        var selectedAppointmentType = appointmentTypeSelect.value;
        localStorage.setItem('selectedAppointmentType', selectedAppointmentType);
    }

    function updateSelectedRoomNumber() {
        var selectedRoomNumber = roomNumberSelect.value;
        localStorage.setItem('selectedRoomNumber', selectedRoomNumber);
    }

    function getSelectedAppointmentType() {
        return localStorage.getItem('selectedAppointmentType') || '';
    }

    function getSelectedRoomNumber() {
        return localStorage.getItem('selectedRoomNumber') || '';
    }

    function updateSelectedAppointmentDate(date) {
        var selectedAppointmentDate = document.getElementById('selectedAppointmentDate');
        var selectedAppointmentType = getSelectedAppointmentType();
        var selectedRoomNumber = getSelectedRoomNumber();

        selectedAppointmentDate.innerHTML = `
            <p>${formatDate(date)} (${getWeekday(date)})</p>
            <p>${selectedAppointmentType}</p>
            <p>${selectedRoomNumber}</p>
        `;
    }

    function formatDate(date) {
        var options = { month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('zh-TW', options);
    }

    function getWeekday(date) {
        var options = { weekday: 'long' };
        return date.toLocaleDateString('zh-TW', options);
    }
});
