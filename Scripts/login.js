let users = JSON.parse(localStorage.getItem("users"));
let message = document.getElementById("msg");

function signUp() {
  window.location.href = "../Pages/signup-page.html";
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  let username = document.getElementById("user").value;
  let password = document.getElementById("pass").value;
  let isUser = false;
  let id = 0;

  for (let i = 0; i < users.length; i++) {
    if (username == users[i].username && password == users[i].password) {
      isUser = true;
      id = i;
    }
  }

  console.log(isUser);

  if (!isUser) {
    message.style.color = "red";
    message.innerText = "Invalid username or password";
    username.innerText = "";
    password.innerText = "";
    e.preventDefault();
  } else {
    e.preventDefault();
    if (users[id].auth == "admin") {
      alert("Welcome: " + users[id].username);
      localStorage.setItem("currentUser", users[id].username);
      window.location.href = "../Pages/admin-hub.html";
    } else {
      alert("Welcome: " + users[id].username);
      localStorage.setItem("currentUser", users[id].username);
      window.location.href = "../Pages/task-page.html";
    }
  }
});

function createNewUser() {
  let username = document.getElementById("user").value;
  let password = document.getElementById("pass").value;
  let confirmPassword = document.getElementById("conf-pass").value;
}
