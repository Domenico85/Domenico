function getDateData (){
    const date = new Date();
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

function showTodayDate() {
    const {dayLong, year, dayNumber, month } = getDateData()
    let todayDate = document.querySelector('.current-date');
    let todayElement = document.createElement('h1');
    todayElement.innerText = (dayLong + '  ' + dayNumber);
    todayDate.appendChild(todayElement);
    let todayElement2 = document.createElement('h1')
    todayElement2.innerText = (month + '  ' + year)
    todayDate.appendChild(todayElement2)
}
showTodayDate()

function getDaysOfTheMonth(){
    const { year, monthNumber } = getDateData(); 
    const firstDayOfMonth = new Date(year, monthNumber - 1, 1); 
    const dayOne = firstDayOfMonth.getDay(); 
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const firstDayName = weekday[dayOne];
    console.log("Name and number of the first day of the month:", firstDayOfMonth, firstDayName);

    return{
        firstDayOfMonth,
        firstDayName
    }
}

function addMonthToCalendar() {
    const { firstDayName, firstDayOfMonth } = getDaysOfTheMonth();
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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


    currentWeeks.forEach((week, index) => {
        week.innerHTML = '';
        if (index === 0) {
            for (let i = 0; i < currentDayOfWeek; i++) {
                let emptyDay = document.createElement('span');
                emptyDay.classList.add('last-month');
                emptyDay.innerText = '';
                week.appendChild(emptyDay);
            }
            for (let i = currentDayOfWeek; i < 7; i++) {
                let dayElement = document.createElement('span');
                dayElement.innerText = currentDay;
                week.appendChild(dayElement);
                currentDay++;
            }
        } else {
            for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
                let dayElement = document.createElement('span');
                dayElement.innerText = currentDay;
                week.appendChild(dayElement);
                currentDay++;
            }
        }
    });

    const lastWeek = currentWeeks[currentWeeks.length - 1];
    const lastWeekChildrenCount = lastWeek.children.length;
    for (let i = lastWeekChildrenCount; i < 7; i++) {
        let emptyDay = document.createElement('span');
        emptyDay.classList.add('next-month');
        emptyDay.innerText = ' ';
        lastWeek.appendChild(emptyDay);
    }
}

addMonthToCalendar();

const app = {
    settings: {
      container: document.querySelector('.calendar'),
      calendar: document.querySelector('.front'),
      form: document.querySelector('.back'),
      days: document.querySelectorAll('.weeks span'),
      input: document.querySelector('.back input'),
      buttons: document.querySelectorAll('.actions button')
    },
  
    init: function() {
      this.bindUIActions();
    },
  
    swap: function(currentSide, desiredSide) {
        this.settings.container.classList.toggle('flip');
    
        currentSide.style.transition = 'opacity 0.9s';
        currentSide.style.opacity = '0';
    
        setTimeout(function() {
          currentSide.style.display = 'none';
          desiredSide.style.display = 'block';
          desiredSide.style.opacity = '1';
        }, 900);
    },
  
    bindUIActions: function() {
      const settings = this.settings;
  
      settings.days.forEach(function(day) {
        day.addEventListener('click', function() {
          app.swap(settings.calendar, settings.form);
          settings.input.focus();
        });
      });
  
      settings.buttons.forEach(function(button) {
        button.addEventListener('click', function() {
          app.swap(settings.form, settings.calendar);
        });
      });
    }
  };
  
  app.init();
  




 
