const host = "http://20.127.2.107:3100";
// get token from local storage
const token = localStorage.getItem("token");

$("#sidebar").load("sidebar.html");