
var date, month, year;

function validateDate() {
  errorMessages = document.getElementsByClassName("error-message");
  if (isNaN(date) || isNaN(month) || isNaN(year)) {
    date = "--";
    month = "--";
    year = "--"
    console.log(errorMessages)
    for (let i = 0; i < errorMessages.length; i++) {
      errorMessages[i].style.color = "red";
    }
    return 0;
  }
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].style.color = "white";
  }
  return 1
}

function calculateAge(startingDate, endingDate) {
  let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
  if (!endingDate) {
    endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
  }
  let endDate = new Date(endingDate);
  if (startDate > endDate) {
    const swap = startDate;
    startDate = endDate;
    endDate = swap;
  }
  const startYear = startDate.getFullYear();
  const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let yearDiff = endDate.getFullYear() - startYear;
  let monthDiff = endDate.getMonth() - startDate.getMonth();
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
  let dayDiff = endDate.getDate() - startDate.getDate();
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--;
    } else {
      yearDiff--;
      monthDiff = 11;
    }
    dayDiff += daysInMonth[startDate.getMonth()];
  }


    return [dayDiff, monthDiff, yearDiff]
}


function submitDate() {
  date = parseInt(document.getElementById("dayInput").value);
  month = parseInt(document.getElementById("monthInput").value);
  year = parseInt(document.getElementById("yearInput").value);

  console.log(date, month, year);

  if(validateDate()) {
    retAge = calculateAge(new Date(), new Date(year, month, date));
    date = retAge[0];
    month = retAge[1];
    year = retAge[2];

  }


  document.getElementById("daysDisplay").innerHTML = date;
  document.getElementById("monthsDisplay").innerHTML = month;
  document.getElementById("yearsDisplay").innerHTML = year;



}