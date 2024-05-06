const currentDate = new Date();

function getDateData(date) {
  let dayNumber = date.getDate();
  const monthNumber = date.getMonth() + 1;
  const month = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear();

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let dayLong = weekday[date.getDay()];
  let fullDate = `${dayNumber}-${month}-${year}`;

  return {
    dayLong,
    dayNumber,
    fullDate,
    year,
    month,
    monthNumber
  }
}

function showTodayDate(date) {
  console.log("show today")
  const { dayLong, year, dayNumber, month } = getDateData(date)
  const arrow = document.querySelector('#arrow_1')
  let todayElement = document.createElement('h1');
  todayElement.innerText = (dayLong + '  ' + dayNumber);

  const currentDateH1Elements = document.querySelectorAll('.current-date h1');
  currentDateH1Elements.forEach((h1) => h1.remove())

  let todayElement2 = document.createElement('h1')
  todayElement2.innerText = (month + '  ' + year)
  arrow.insertAdjacentElement('afterend', todayElement2)
  arrow.insertAdjacentElement('afterend', todayElement);
}

function removeDayToDate (date) {
  date.setDate(date.getDate() - 1)
  
  return date
}

function addDayToDate (date) {
  date.setDate(date.getDate() + 1)
  
  return date
}
 

function getDaysOfTheMonth(date) {
  const { year, monthNumber } = getDateData(date);
  const firstDayOfMonth = new Date(year, monthNumber - 1, 1);
  const dayOne = firstDayOfMonth.getDay();
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const firstDayName = weekday[dayOne];
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // console.log(lastDayOfMonth)
  return {
    firstDayOfMonth,
    firstDayName, 
    lastDayOfMonth
  }
}


function addMonthToCalendar(date) {
  const { firstDayName, firstDayOfMonth, lastDayOfMonth } = getDaysOfTheMonth(date);
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const firstDayInMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  let weekDaysList = document.querySelector('.week-days');

  weekDaysList.innerHTML = '';

  for (let i = 0; i < 7; i++) {
    let weekdayElement = document.createElement('li');
    weekdayElement.innerText = weekday[i];
    weekDaysList.appendChild(weekdayElement);
  }

  const daysInMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0).getDate();
  let currentDay = 1;
  let currentDayOfWeek = weekday.indexOf(firstDayName);
  let currentWeeks = document.querySelectorAll('.weeks > div');


  const settings = app.settings;

  let nextMonthDayCounter = 0
  currentWeeks.forEach((week, index) => {
    week.innerHTML = '';
    if (index === 0) {
      for (let i = currentDayOfWeek; i > 0; i--) {
        let emptyDay = document.createElement('span');
        emptyDay.classList.add('last-month');
        
        const dayNum = removeDayToDate(firstDayInMonth, i).getDate();
        emptyDay.innerText = dayNum
        week.insertAdjacentElement('afterbegin',  emptyDay)

      }

      for (let i = currentDayOfWeek; i < 7; i++) {
        let dayElement = document.createElement('span');
        dayElement.innerText = currentDay;
        week.appendChild(dayElement);
        currentDay++;
      }
    } else if (index === 4) {
      // Add week 4 days
      let weekdayCounter = 7
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        let dayElement = document.createElement('span');
        dayElement.innerText = currentDay;
        week.appendChild(dayElement);
        currentDay++;
        weekdayCounter--
      }

      // Add week 4 next month days
      for (let i = 1; i <= weekdayCounter; i++) {
        nextMonthDayCounter++
        let emptyDay = document.createElement('span');
        emptyDay.classList.add('next-month');
        
        emptyDay.innerText = i
        week.appendChild(emptyDay);

      }
    } else if (index === 5) {

      console.log(currentDayOfWeek)
      let weekdayCounter = 7
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        let dayElement = document.createElement('span');
        dayElement.innerText = currentDay;
        week.appendChild(dayElement);
        currentDay++;
        weekdayCounter--
      }

      // Add week 5 next month days
      for (let i = nextMonthDayCounter +1; i <= weekdayCounter; i++) {
        weekdayCounter++
        
        // lastDayOfMonth
        let emptyDay = document.createElement('span');
        emptyDay.classList.add('next-month');
        
        emptyDay.innerText = i
        // if (weekdayCounter < 7) {
          week.appendChild(emptyDay);
        // }

      }

      // console.log('mas')

      // let weekDaysCounter = 0 

      // console.log('mas2') 


      // for (let i = weekDaysCounter; i > 8; i++) {
        
        // console.log('got', i)
        // let emptyDay = document.createElement('span');
        // emptyDay.classList.add('next-month');
        
        // const dayNum = addDayToDate(firstDayInMonth, i).getDate();
        // emptyDay.innerText = dayNum
        // week.insertAdjacentElement('afterbegin',  emptyDay)

      // }

      // for (let i = 1; i < 7; i++) {
      //   let dayElement = document.createElement('span');
      //   dayElement.innerText = i;
      //   week.appendChild(dayElement);
      //   currentDay++;
      // }

 

      
      // for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
      //   let dayElement = document.createElement('span');
      //   dayElement.innerText = currentDay;
      //   week.appendChild(dayElement);
      //   currentDay++;
      // }



      // for (let i = currentDayOfWeek; i > 0; i--) {
      //   let emptyDay = document.createElement('span');
      //   emptyDay.classList.add('next-month');
        
      //   const dayNum = addDayToDate(firstDayInMonth, i).getDate();
      //   emptyDay.innerText = dayNum
      //   week.insertAdjacentElement('afterbegin',  emptyDay)

      // }

      // for (let i = 1; i < 7; i+1+) {
      //   let dayElement = document.createElement('span');
      //   dayElement.innerText = i;
      //   week.appendChild(dayElement);
      //   currentDay++;
      // }


 

    } else {
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        let dayElement = document.createElement('span');
        dayElement.innerText = currentDay;
        week.appendChild(dayElement);
        currentDay++;
      }
    }
  });


  settings.days = document.querySelectorAll('.weeks span');

  settings.days.forEach(function (day) {
    day.addEventListener('click', function () {
      app.swap(settings.calendar, settings.form);
      settings.input.focus();
    });
  });


  assignUniqueDayIds();
}

function assignUniqueDayIds() {
  const daysContainer = document.querySelector('.weeks');
  const dayElements = daysContainer.querySelectorAll('span');
  let dayIdCounter = 1;

  dayElements.forEach((dayElement) => {
    dayElement.id = `day-${dayIdCounter}`;
    dayIdCounter++;
  });
}

function prevNextMonths() {
  const currentDate = new Date();
  let newDate = new Date(currentDate);

  
  function showNewMonthDate() {
      showTodayDate(newDate);
  }

  
  document.getElementById('arrow_1').addEventListener('click', function() {
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() - 1);
      showNewMonthDate();
  });

  
  document.getElementById('arrow_2').addEventListener('click', function() {
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() + 1);
      showNewMonthDate();
  });
}

const app = {
  settings: {
    container: document.querySelector('.calendar'),
    calendar: document.querySelector('.front'),
    form: document.querySelector('.back'),
    days: document.querySelectorAll('.weeks span'),
    input: document.querySelector('.back input'),
    buttons: document.querySelectorAll('.actions button')
  },

  init: function () {
    this.bindUIActions();

    addMonthToCalendar(currentDate);

    showTodayDate(currentDate)
    prevNextMonths()
  },

  swap: function (currentSide, desiredSide) {
    this.settings.container.classList.toggle('flip');
    currentSide.style.transition = 'opacity 0.9s';

    setTimeout(function () {
      currentSide.style.display = 'none';
      desiredSide.style.display = 'block';
      desiredSide.style.opacity = '1';
    }, 900);
  },

  bindUIActions: function () {
    const settings = this.settings;

    settings.days.forEach(function (day) {
      day.addEventListener('click', function () {
        app.swap(settings.calendar, settings.form);
        settings.input.focus();
      });
    });

    settings.buttons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        if (event.target.classList.contains('save')) {
          console.log('Save button clicked');
          app.swap(settings.form, settings.calendar);
        } else if (event.target.classList.contains('dismiss')) {
          console.log('Dismiss button clicked');
          app.swap(settings.form, settings.calendar);
        }
      });
    });

    document.getElementById('arrow_1').addEventListener('click', function () {
      let newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      currentDate.setTime(newDate.getTime());
      addMonthToCalendar(currentDate);
    });

    document.getElementById('arrow_2').addEventListener('click', function () {
      let newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      currentDate.setTime(newDate.getTime());
      addMonthToCalendar(currentDate);
    });
  }
};

app.init();

