document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var today = new Date(); // 取得當前日期
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // 初始視圖為月曆視圖
        timeZone: 'Asia/Taipei',
        locale: 'zh-tw', // 使用繁體中文語言
        events: eventList,
        displayEventTime: false,
        // FullCalendar的配置選項
        // ...
        dateClick: function (info) {
            // 點擊日期後的處理程式碼
            var selectedDate = info.date;
            updateSelectedAppointmentDate(selectedDate);
        },

        eventContent: function (arg) {
            return {
                html: '<div class="event-title">' + arg.event.title + '</div>',
                classNames: ['custom-event-class']
            };
        },

        initialDate: today, // 設定初始日期為今天

    });

    var eventList = [];

    // 設定日期範圍
    var startDate = new Date('2023-01-01');
    var endDate = new Date('2023-12-31');

    var currentDate = new Date(startDate);

    // 迴圈生成事件列表
    while (currentDate <= endDate) {
        var morningCount = 0;
        var afternoonCount = 0;
        var eveningCount = 0;

        // 搜尋對應日期的 APPOINTMENT_CONTENT
        var appointmentContents = document.querySelectorAll('.APPOINTMENT_CONTENT');

        for (var i = 0; i < appointmentContents.length; i++) {
            var appointmentContent = appointmentContents[i];
            var time = appointmentContent.querySelector('span').textContent;

            if (time === '早診') {
                morningCount++;
            } else if (time === '午診') {
                afternoonCount++;
            } else if (time === '夜診') {
                eveningCount++;
            }
        }

        // 早診事件
        var morningEvent = {
            title: '早診: ' + morningCount + '人',
            start: currentDate.toISOString().slice(0, 10) + 'T09:00:00',
            end: currentDate.toISOString().slice(0, 10) + 'T12:00:00',
            allDay: false,
        };

        // 午診事件
        var afternoonEvent = {
            title: '午診: ' + afternoonCount + '人',
            start: currentDate.toISOString().slice(0, 10) + 'T14:00:00',
            end: currentDate.toISOString().slice(0, 10) + 'T18:00:00',
            allDay: false,
        };

        // 晚診事件
        var eveningEvent = {
            title: '晚診: ' + eveningCount + '人',
            start: currentDate.toISOString().slice(0, 10) + 'T19:00:00',
            end: currentDate.toISOString().slice(0, 10) + 'T21:00:00',
            allDay: false,
        };

        eventList.push(morningEvent, afternoonEvent, eveningEvent);

        // 將日期增加一天
        currentDate.setDate(currentDate.getDate() + 1);
    }

    calendar.render();
    calendar.addEventSource(eventList);


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

