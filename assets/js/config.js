const host = "http://20.127.2.107:3100";
// get token from local storage
const token = localStorage.getItem("token");

var endDate = new Date();

function calculateYears(startDate, endDate) {
  var startYear = startDate.getFullYear();
  var endYear = endDate.getFullYear();

  var years = endYear - startYear;

  // Check if the end date has not reached the anniversary of the start date
  if (
    endDate.getMonth() < startDate.getMonth() ||
    (endDate.getMonth() === startDate.getMonth() &&
      endDate.getDate() < startDate.getDate())
  ) {
    years--;
  }

  return years;
}

$("#sidebar").load("sidebar.html");