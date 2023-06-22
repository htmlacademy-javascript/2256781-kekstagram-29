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

const checkFunction = ({ start, end, meetingAt, duration }) => {
  let isCorrect = false;

  start = start.split(':').map((value) => parseInt(value, 10));
  end = end.split(':').map((value) => parseInt(value, 10));
  meetingAt = meetingAt.split(':').map((value) => parseInt(value, 10));

  // проверю что начало встречи попадает в раб. интервал дня
  if (meetingAt[0] >= start[0] && meetingAt[0] <= end[0]) {
    // вычислю точку в которой закончится встреча

    // переменная ниже нужна, если при сложении минут
    // получился переход разряда (т.е. минут > 60)
    let extraHour = 0;

    const pointMinute =
      (duration % 60) + meetingAt[1] > 60
        ? (extraHour++, ((duration % 60) + meetingAt[1]) % 60)
        : (duration % 60) + meetingAt[1];
    const pointHour = Math.trunc(duration / 60) + meetingAt[0] + extraHour;

    // теперь проверю, что встреча учитывая заданную ей регулярность
    // закончиться до конца раб. дня
    if (pointHour < end[0] || (pointHour === end[0] && pointMinute <= end[1])) {
      isCorrect = true;
    } // console.log(start, end, meetingAt, duration, pointHour + ' - ' + pointMinute, isCorrect);
  }

  return isCorrect;
};

// Usage example
const addChart = makeSchedule();
addChart.addCheck(checkFunction);

DATA.forEach((obj) => {
  addChart(obj);
});

// console.log(addChart.correctList); // вывод валидных строчек расписания (здесь это 1 и 2 объект см. выше константый массив DATA)
