// check if token is present in local storage
if (localStorage.getItem("token") == null) {
  // redirect to login page
  window.location.href = "login.html";
}
$(document).ready(function () {
  // get url parameter
  var url_string = window.location.href;
  var url = new URL(url_string);
  var user = url.searchParams.get("user");
  console.log(user);
  // Initialize DataTable
  var dataTable = $("#myTable").DataTable();
  var url = "";
  if (user == null) {
    url = host + "/v1/report/view";
  } else {
    url = host + "/v1/report/view/user/" + user;
  }
  // ajax call to get all users
  $.ajax({
    url: url,
    type: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      // loop through all users
      for (var i = 0; i < data.reports.length; i++) {
        console.log(data.reports[i]);

        var startDate = new Date(data.reports[i].patient.dob.split("T")[0]);

        var age = calculateYears(startDate, endDate);
        // add new row to datatable
        if (data.reports[i].approve === false) {
          dataTable.row.add([
            data.reports[i].id,
            data.reports[i].patient.full_name,
            age,
            data.reports[i].createdAt.split("T")[0],
            "<a href='/report.html?id=" +
              data.reports[i].id +
              "'>View</a>  <a href='#'onClick='approve(" +
              data.reports[i].id +
              ")'>Approve</a>",
          ]);
        } else {
          dataTable.row.add([
            data.reports[i].id,
            data.reports[i].patient.full_name,
            age,
            data.reports[i].createdAt.split("T")[0],
            "<a href='/report.html?id=" +
              data.reports[i].id +
              "'>View</a>",
          ]);
        }
      }
      // draw the table
      dataTable.draw();
    },
    error: function (xhr, status, error) {
      // make the xhr.responseText a json object
      var err = JSON.parse(xhr.responseText);
      // alert the error message
      alert(err.message);
    },
  });
});
function approve(id) {
  var data = {
    id: id,
  };
  $.ajax({
    url: host + "/v1/report/approve",
    type: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(data),
    success: function (data) {
      alert("Report Approved");
    },
  });
}
