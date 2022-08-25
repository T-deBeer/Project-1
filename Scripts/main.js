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
  constructor(
    title,
    description,
    status,
    dateCreated,
    dateResolved,
    dueDate,
    type
  ) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.dateCreated = dateCreated;
    this.dateResolved = dateResolved;
    this.dueDate = dueDate;
    this.type = type;
  }
}

//Onload global variables
let users = [];
let projects = [];
let bugs = [];
//ends

//Onload function - responsible for loading localStorage data into HTML elemeents
window.onload = function () {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  //dummy users section
  if (JSON.parse(localStorage.getItem("users") || "[]").length <= 0) {
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
  if (JSON.parse(localStorage.getItem("projects") || "[]").length <= 0) {
    let devs = ["T-deBeer", "timejunky1"];
    let bug = new BugTicket(
      "Bug 1",
      "Small bug responsible for issues with porting.",
      "proccessing",
      "2022/08/24",
      "",
      "2022/08/27",
      "bug"
    );
    bugs.push(bug);
    bug = new BugTicket(
      "Bug 2",
      "Mails not being sent when using the contact form.",
      "unresolved",
      "2022/08/24",
      "",
      "2022/08/27",
      "bug"
    );
    bugs.push(bug);
    bug = new BugTicket(
      "Bug 3",
      "Div not centered",
      "proccessing",
      "2022/08/22",
      "",
      "2022/08/27",
      "bug"
    );
    bugs.push(bug);
    let project = new Project("Project 1", devs, bugs);
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  //dummy projects section ends

  //task-page neccesities
  if (document.URL.includes("task-page")) {
    let title = document.getElementById("view-proj");
    let selection = document.getElementById("projects").value;
    let currentUser = localStorage.getItem("currentUser");
    let comboBox = document.getElementById("projects");

    let projs = JSON.parse(localStorage.getItem("projects"));

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
            let type = document.createElement("p");
            let button = document.createElement("button");

            div.id = "bug-" + k;
            div.draggable = true;
            div.classList.add("bug-item");
            div.addEventListener("dragstart", function (ev) {
              ev.dataTransfer.setData("text", ev.target.id);
            });

            h3.innerText = div.id + ": " + projs[i].bugs[k].title;
            type.innerText = projs[i].bugs[k].type.toUpperCase();
            type.style.fontWeight = "bold";
            p.innerText = projs[i].bugs[k].description;

            button.type = "button";
            button.classList.add("edit-button");
            button.id = "bug-edit-" + k;
            button.innerText = "Edit";

            console.log(new Date(projs[i].bugs[k].dueDate).addDays(-2));

            if (new Date() >= new Date(projs[i].bugs[k].dueDate)) {
              div.style.border = "0.25rem solid red";
            } else if (
              new Date() <= new Date(projs[i].bugs[k].dueDate) &&
              new Date() >= new Date(projs[i].bugs[k].dueDate).addDays(-2)
            ) {
              div.style.border = "0.25rem solid orange";
            } else {
              div.style.border = "0.25rem solid lightgreen";
            }

            div.append(h3, type, p, button);
            section.appendChild(div);
          }
          //ends
        }
      }
    }
  }
  //task-page neccesities ends

  //admin-hub neccesities
  if (document.URL.includes("admin-hub")) {
    let currentUser = localStorage.getItem("currentUser");
    document.getElementById("current-admin").innerText = currentUser;

    //Loads the table of developers
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let projects = JSON.parse(localStorage.getItem("projects") || "[]");
    let devs = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].auth == "developer") {
        devs.push(users[i]);
      }
    }

    for (const dev of devs) {
      let projCount = 0;
      let projBugs = 0;
      let tr = document.createElement("tr");
      let fullname = document.createElement("td");
      let username = document.createElement("td");
      let totalProjects = document.createElement("td");
      let bugs = document.createElement("td");

      fullname.innerText = dev.firstname + " " + dev.lastname;
      username.innerText = dev.username;
      for (let j = 0; j < projects.length; j++) {
        if (projects[j].projDevs.includes(dev.username)) {
          projCount++;
          projBugs += projects[j].bugs.length;
        }
      }

      totalProjects.innerText = projCount;
      bugs.innerText = projBugs;

      tr.append(fullname, username, totalProjects, bugs);
      document.getElementById("dev-table").appendChild(tr);
    }
    //end of data table load

    //loading bugs ticket table
    for (let project of projects) {
      for (let bug of project.bugs) {
        let tr = document.createElement("tr");
        let title = document.createElement("td");
        let bugProject = document.createElement("td");
        let dateCreated = document.createElement("td");
        let status = document.createElement("td");
        let dueDate = document.createElement("td");

        title.innerText = bug.title;
        bugProject.innerText = project.projName;
        dateCreated.innerText = formatDate(new Date(bug.dateCreated));
        status.innerText = bug.status.toUpperCase();
        dueDate.innerText = formatDate(new Date(bug.dueDate));

        tr.append(title, bugProject, status, dateCreated, dueDate);
        document.getElementById("bug-table").appendChild(tr);
      }
    }
    //bug ticket table ends

    //loading project table
    for (let project of projects) {
      let tr = document.createElement("tr");
      let name = document.createElement("td");
      let numberOfDevs = document.createElement("td");
      let numberOfBugs = document.createElement("td");
      let percentage = document.createElement("td");

      name.innerText = project.projName;
      numberOfDevs.innerText = project.projDevs.length;

      let count = 0;
      for (let bug of project.bugs) {
        if (bug.status == "completed") {
          count++;
        }
      }
      percentage.innerText =
        ((count / project.bugs.length) * 100).toFixed(2) + "%";

      numberOfBugs.innerText = project.bugs.length - count;

      tr.append(name, numberOfDevs, numberOfBugs, percentage);
      document.getElementById("project-table").appendChild(tr);
    }
    //loading project table ends
  }

  //admin-hub neccesities ends
}; //End of onload

//formats the date to a readable format
function formatDate(dateEntered) {
  let month = dateEntered.getMonth() + 1;
  let day = Number(dateEntered.getDate());
  let year = dateEntered.getFullYear();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
}
