function getDateData (){
    const date = new Date();
    let dayNumber = date.getDate()
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
    month
  }
}

function showTodayDate() {
    const {dayLong, year, dayNumber, month } = getDateData()
    let todayDate = document.querySelector('.current-date');
    console.log(todayDate)
    let todayElement = document.createElement('h1');
    todayElement.innerText = (dayLong + '  ' + dayNumber);
    todayDate.appendChild(todayElement);
    let todayElement2 = document.createElement('h1')
    todayElement2.innerText = (month + '  ' + year)
    todayDate.appendChild(todayElement2)
}
showTodayDate()


// Que dia de la semana es el uno de este mes (Mayo)?