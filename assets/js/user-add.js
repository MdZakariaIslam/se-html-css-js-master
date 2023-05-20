// check if token is present in local storage
if (localStorage.getItem("token") == null) {
  // redirect to login page
  window.location.href = "login.html";
}
$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();

    // get all the inputs into an array.
    var $inputs = $("#add_Patient :input");

    // get an associative array of just the values.
    var data = {};
    $inputs.each(function () {
      data[this.name] = $(this).val();
    });
    // check all fields are filled
    if (
      data.full_name == "" ||
      data.age == "" ||
      data.reffered_by == "" ||
      data.phone == "" ||
      data.address == "" ||
      data.phone == ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    // send json object to server
    $.ajax({
      url: host + "/v1/user/register",
      type: "POST",
      data: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + token,
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        window.location.href = "index.html";
      },
      error: function (xhr, status, error) {
        // make the xhr.responseText a json object
        var err = JSON.parse(xhr.responseText);
        // alert the error message
        alert(err.message);
      },
    });
  });
});

$("#age").keydown(function (event) {
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
$("#age").keyup(function (event) {
  age_val = $(this).val();
  if (age_val > 100) {
    $(this).val(100);
  }
  var currentDate = new Date();
  var date_of_birth_val = Math.abs(currentDate.getFullYear() - age_val);
  $("#datepicker").val(date_of_birth_val);
});
$("#phone").keydown(function (event) {
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
