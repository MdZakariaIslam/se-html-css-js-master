// check if token is present in local storage
if (localStorage.getItem("token") == null) {
  // redirect to login page
  window.location.href = "login.html";
}
$(document).ready(function () {
  // Initialize DataTable
  var dataTable = $("#myTable").DataTable();

  // ajax call to get all users
  $.ajax({
    url: host + "/v1/user/view",
    type: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(data);
      // loop through all users
      for (var i = 0; i < data.users.length; i++) {
        console.log(data.users[i]);

        var startDate = new Date(data.users[i].dob.split("T")[0]);

        var age = calculateYears(startDate, endDate);
        // add new row to datatable
        dataTable.row.add([
          data.users[i].id,
          data.users[i].full_name,
          age,
          data.users[i].gender,
          data.users[i].phone,
          data.users[i].reffered_by,
          "<a href='/view-report.html?user="+data.users[i].id+"'>View</a>",
        ]);
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
