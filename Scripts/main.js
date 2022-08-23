class User {
  constructor(firstname, lastname, username, password, auth) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.auth = auth;
  }
}

class BugTicket {
  constructor(title, description, status, devs) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.devs.push(devs)
  }
}

let users = [];
//Loads dummy data into localstorage
window.onload = function () {
  //dummy users section
  let user = new User("Administrator", "Profile", "Admin", "1234", "admin");
  users.push(user);
  user = new User("Tiaan", "De Beer", "T-deBeer", "1007", "developer");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  //dummy users section ends

  console.log(localStorage.getItem("users"));
};
