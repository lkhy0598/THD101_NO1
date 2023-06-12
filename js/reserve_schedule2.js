document.addEventListener('DOMContentLoaded', function () {
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
});
