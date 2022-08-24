let users = JSON.parse(localStorage.getItem("users"));
let message = document.getElementById("msg");

function signUp() {
  window.location.href = "../Pages/signup-page.html";
}

//When the login from is successfully submited
document.getElementById("login-form").addEventListener("submit", function (e) {
  let username = document.getElementById("user").value;
  let password = document.getElementById("pass").value;
  let isUser = false;
  let id = 0;

  //Checks if the user's details are correct
  for (let i = 0; i < users.length; i++) {
    if (username == users[i].username && password == users[i].password) {
      isUser = true;
      id = i;
    }
  }

  console.log(isUser);

  if (!isUser) {
    //If details are incorrect
    message.style.color = "red";
    message.innerText = "Invalid username or password";
    username.innerText = "";
    password.innerText = "";
    e.preventDefault();
  } else {
    //If details are correct
    e.preventDefault();
    if (users[id].auth.toLowerCase() == "admin") {
      //If the user is an admin
    } else {
      //If the user is an developer
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
