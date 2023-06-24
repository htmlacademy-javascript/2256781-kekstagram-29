const DATA = [
  {
    start: '08:00',
    end: '17:30',
    meetingAt: '14:40',
    duration: 90,
  },
  {
    start: '8:0',
    end: '10:0',
    meetingAt: '8:0',
    duration: 120,
  },
  {
    start: '08:00',
    end: '14:30',
    meetingAt: '14:00',
    duration: 90,
  },
  {
    start: '14:00',
    end: '17:30',
    meetingAt: '08:0',
    duration: 90,
  },
  {
    start: '08:00',
    end: '17:30',
    meetingAt: '08:00',
    duration: 900,
  },
];

const makeSchedule = () => {
  const add = (meeting) => {
    const isCorrect = add.check(meeting);

    if (isCorrect) {
      add.correctList.push(meeting);
    }
    return add;
  };
  add.addCheck = (check) => {
    add.correctList = [];
    add.check = check;
    return add;
  };
  return add;
};

const checkFunctionOneWay = ({ start, end, meetingAt, duration }) => {
  let isCorrect = false;

  const [startDayWorkHour, startDayWorkMinute] = start.split(':').map((value) => parseInt(value, 10));
  const [endDayWorkHour, endDayWorkMinute] = end.split(':').map((value) => parseInt(value, 10));
  const [startMeetingHour, startMeetingMinute] = meetingAt.split(':').map((value) => parseInt(value, 10));

  // проверю что начало встречи попадает в раб. интервал дня
  if (
    startMeetingHour > startDayWorkHour ||
    (startMeetingHour === startDayWorkHour && startMeetingMinute >= startDayWorkMinute)
  ) {
    // вычислю точку в которой закончится встреча

    // переменная нужна, если при сложении минут
    // получился переход разряда (т.е. минут > 60)
    let extraHour = 0;

    const endMeetingMinute =
      (duration % 60) + startMeetingMinute > 60
        ? (extraHour++, ((duration % 60) + startMeetingMinute) % 60)
        : (duration % 60) + startMeetingMinute;
    const endMeetingHour = Math.trunc(duration / 60) + startMeetingHour + extraHour;

    // теперь проверю, что встреча учитывая заданную ей регулярность
    // закончиться до конца раб. дня
    if (
      endMeetingHour < endDayWorkHour ||
      (endMeetingHour === endDayWorkHour && endMeetingMinute <= endDayWorkMinute)
    ) {
      isCorrect = true;
    }
  }

  return isCorrect;
};

const checkFunctionTwoWay = ({ start, end, meetingAt, duration }) => {
  let isCorrect = false;

  const convertToMinutes = (partOfTime) => {
    const [hour, minute] = partOfTime.split(':').map(Number);
    return hour * 60 + minute;
  };

  const startDayWork = convertToMinutes(start);
  const endDayWork = convertToMinutes(end);
  const startMeeting = convertToMinutes(meetingAt);

  if (startMeeting >= startDayWork && startMeeting + duration <= endDayWork) {
    isCorrect = true;
  }

  return isCorrect;
};

// Usage example
const addChart = makeSchedule();
addChart.addCheck(checkFunctionOneWay);
// addChart.addCheck(checkFunctionTwoWay);

DATA.forEach((obj) => {
  addChart(obj);
});

// console.log(addChart.correctList); // вывод валидных строчек расписания (здесь это 1 и 2 объект см. выше константый массив DATA)
