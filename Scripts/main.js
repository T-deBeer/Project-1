class User {
  constructor(firstname, lastname, username, password, auth) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.auth = auth;
  }
}

class Project {
  constructor(projName, projDevs, bugs) {
    this.projName = projName;
    this.projDevs = projDevs;
    this.bugs = bugs;
  }
}

class BugTicket {
  constructor(title, description, status) {
    this.title = title;
    this.description = description;
    this.status = status;
  }
}

//Onload global variables
let users = JSON.parse(localStorage.getItem("users"));
let projects = JSON.parse(localStorage.getItem("projects"));
let bugs = [];
//ends

//Onload function - responsible for loading localStorage data into HTML elemeents
window.onload = function () {
  //dummy users section
  if (users.length <= 0) {
    let user = new User("Administrator", "Profile", "Admin", "1234", "admin");
    users.push(user);
    user = new User("Tiaan", "De Beer", "T-deBeer", "577088", "developer");
    users.push(user);
    user = new User("Hardus", "Lotter", "HardusLotter", "578559", "developer");
    users.push(user);
    user = new User("Jaco", "Mathee", "timejunky1", "578381", "developer");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
  //dummy users section ends

  //dummy projects section
  if (projects.length <= 0) {
    let devs = ["T-deBeer", "timejunky1"];
    let bug = new BugTicket(
      "Bug 1",
      "Small bug responsible for issues with porting.",
      "proccessing"
    );
    bugs.push(bug);
    bug = new BugTicket(
      "Bug 2",
      "Mails not being sent when using the contact form.",
      "unresolved"
    );
    bugs.push(bug);
    bug = new BugTicket("Bug 3", "Div not centered", "completed");
    bugs.push(bug);
    let project = new Project("Project 1", devs, bugs);
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  //dummy projects section ends

  //task-page neccesities
  let title = document.getElementById("view-proj");
  let selection = document.getElementById("projects").value;
  let currentUser = localStorage.getItem("currentUser");
  let comboBox = document.getElementById("projects");

  let projs = JSON.parse(localStorage.getItem("projects"));

  console.log(projs);
  title.innerText = "Viewing " + selection;
  document.getElementById("current-user").innerText = currentUser;

  for (let i = 0; i < projs.length; i++) {
    //Goes through all projects in storage
    for (let j = 0; j < projs[i].projDevs.length; j++) {
      //Goes through all registered devs in projects
      if (projs[i].projDevs[j] == currentUser) {
        //If the current user is a developer on the project

        //add the project to the selection list for the current user
        let option = document.createElement("option");
        option.text = projs[i].projName;
        option.value = projs[i].projName;
        if (i == 0) {
          option.selected = true;
          title.innerText = "Viewing " + option.value;
        }
        comboBox.appendChild(option);
        //ends

        //loads bugs into the fields by status
        for (let k = 0; k < projs[i].bugs.length; k++) {
          let section = document.getElementById(projs[i].bugs[k].status);
          let div = document.createElement("div");
          let h3 = document.createElement("h3");
          let p = document.createElement("p");
          let button = document.createElement("button");

          div.id = "bug-" + k;
          div.draggable = true;
          div.classList.add("bug-item");
          div.addEventListener("dragstart", function (ev) {
            ev.dataTransfer.setData("text", ev.target.id);
          });

          h3.innerText = projs[i].bugs[k].title;
          p.innerText = projs[i].bugs[k].description;

          button.type = "button";
          button.classList.add("edit-button");
          button.id = "bug-edit-" + k;
          button.innerText = "Edit";

          div.append(h3, p, button);
          section.appendChild(div);
        }
        //ends
      }
    }
  }

  //task-page neccesities ends
};
//ends
