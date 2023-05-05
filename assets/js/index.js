// check if token is present in local storage
if (localStorage.getItem("token") == null) {
  // redirect to login page
  window.location.href = "login.html";
}
// addOption click
$(".addOption").click(function () {
  // get the id of the select element
  var id = $(this).attr("id");
  // id is not defined
  if (id == undefined) {
    alert("id is undefined");
  } else {
    // redirect to id .html
    window.location.href = id + ".html";
  }
});
