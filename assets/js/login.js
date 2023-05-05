$(document).ready(function () {
  $("button").click(function () {
    var username = $("#username").val();
    var password = $("#password").val();
    if (username == "" || password == "") {
      alert("Please fill all fields...!!!!!!");
    } else {
      // make json object
      let user = {
        username: username,
        password: password,
      };
      // send json object to server
      $.ajax({
        url: host + "/v1/admin/login",
        type: "POST",
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        },
        error: function (xhr, status, error) {
          // make the xhr.responseText a json object
          var err = JSON.parse(xhr.responseText);
          // alert the error message
          alert(err.message);
        },
      });
    }
  });
});
