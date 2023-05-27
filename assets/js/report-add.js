// check if token is present in local storage
if (localStorage.getItem("token") == null) {
  // redirect to login page
  window.location.href = "login.html";
}

function checkAvailability() {
  var patient_id = $("#patient_id").val();
  console.log(patient_id);
  $.ajax({
    url: host + "/v1/user/view/" + patient_id,
    type: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(data);
      var startDate = new Date(data.user.dob.split("T")[0]);

      var age = calculateYears(startDate, endDate);
      $("#name").text("Name: " + data.user.full_name);
      $("#age").text("Age: " + age);
      $("#phone").text("Phone: " + data.user.phone);
    },
    error: function (xhr, status, error) {
      // make the xhr.responseText a json object
      var err = JSON.parse(xhr.responseText);
      // alert the error message
      alert(err.message);
    },
  });
}

$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();

    // get all the inputs into an array.
    var $inputsBlood = $("#blood :input");

    // get an associative array of just the values.
    var dataBlood = {};
    $inputsBlood.each(function () {
      if ($(this).val() != "") {
        dataBlood[this.name] = $(this).val();
      }
    });
    // get all the inputs into an array.
    var $inputsSerum = $("#serum :input");

    // get an associative array of just the values.
    var dataSerum = {};
    $inputsSerum.each(function () {
      if ($(this).val() != "") {
        dataSerum[this.name] = $(this).val();
      }
    });
    // chek if dataBlood is empty
    if ($("#patient_id").val() == "") {
      alert("Please enter patient id");
      return;
    }
    // check dataBlood or dataSerum is empty
    if (
      Object.keys(dataBlood).length == 0 &&
      Object.keys(dataSerum).length == 0
    ) {
      alert("Both Blood and Serum reports are empty");
      return;
    }
    var data = {
      patient_id: $("#patient_id").val(),
      bloodReport: {
        ...dataBlood,
      },
      serumReport: {
        ...dataSerum,
      },
    };
    // make ajax call to insert report
    $.ajax({
      url: host + "/v1/report/add",
      type: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data),
      success: function (data) {
        console.log(data);
        alert("Report added successfully");
        window.location.href = "view-user.html";
      },
    });
  });
});

$("input").keydown(function (event) {
  if (
    !(
      event.keyCode == 8 ||
      event.keyCode == 46 ||
      (event.keyCode >= 35 && event.keyCode <= 40) ||
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    )
  ) {
    event.preventDefault();
  }
});
