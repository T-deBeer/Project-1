class DevUser {
  constructor(firstname, lastname, username, password, auth) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.auth = auth;
  }
}

//Opens up the add dev modal
document
  .getElementById("Add-DEV-button")
  .addEventListener("click", function () {
    let modal = document.getElementById("AddDev-modal");

    modal.style.display = "block";
  });

//Opens up the dev Reset warning modal
document
  .getElementById("Reset-DEV-button")
  .addEventListener("click", function () {
    let modal = document.getElementById("ResetDEV-modal");

    modal.style.display = "block";
  });

//Opens up the remove dev modal
document
  .getElementById("Remove-DEV-button")
  .addEventListener("click", function () {
    let modal = document.getElementById("RemoveDEV-modal");
    modal.style.display = "block";
  });

//When remove button is clicked in the remove modal(Remove from localstorage)
document
  .getElementById("Remove-DEVform")
  .addEventListener("submit", function () {
    let RemoveDevUsername = document.getElementById("Remove-DEV").value;

    let users = [];
    let newUsers = [];
    ("");
    users = JSON.parse(localStorage.getItem("users") || "[]");
    len = users.length;

    for (let i = 0; i < len; i++) {
      if (users[i].username != RemoveDevUsername && len != 0) {
        let DevName = users[i].firstname;
        let DevSurname = users[i].lastname;
        let DevUsername = users[i].username;
        let DevPassword = users[i].password;
        let DevAuth = users[i].auth;
        let user = new DevUser(
          DevName,
          DevSurname,
          DevUsername,
          DevPassword,
          DevAuth
        );
        newUsers.push(user);
      }
    }

    localStorage.clear("users");
    localStorage.setItem("users", JSON.stringify(newUsers));
  });

//Add developer to local storage(Button inside add modal)
document.getElementById("edit-DEVform").addEventListener("submit", function () {
  let users = [];
  users = JSON.parse(localStorage.getItem("users") || "[]");
  //console.log(users);
  let DevName = document.getElementById("DEV-Add-Name").value;
  let DevSurname = document.getElementById("DEV-Add-Surname").value;
  let DevUsername = document.getElementById("DEV-Add-Username").value;
  let DevPassword = document.getElementById("DEV-Add-Password").value;

  let user = new DevUser(
    DevName,
    DevSurname,
    DevUsername,
    DevPassword,
    "developer"
  );
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
});

//When reset button is clicked in reset modal
document
  .getElementById("Reset-DEVform")
  .addEventListener("submit", function () {
    localStorage.clear("users");

    users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = new DevUser(
      "Administrator",
      "Profile",
      "Admin",
      "1234",
      "admin"
    );
    users.push(user);
    user = new DevUser("Tiaan", "De Beer", "T-deBeer", "577088", "developer");
    users.push(user);
    user = new DevUser(
      "Hardus",
      "Lotter",
      "HardusLotter",
      "578559",
      "developer"
    );
    users.push(user);
    user = new DevUser("Jaco", "Mathee", "timejunky1", "578381", "developer");
    users.push(user);
    user = new DevUser(
      "Tobias",
      "van Schalkwyk",
      "Rat3l",
      "578552",
      "developer"
    );
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));
  });

//Close the add dev modal
document
  .getElementById("closeDEV-modal")
  .addEventListener("click", function () {
    let modal = document.getElementById("AddDev-modal");
    modal.style.display = "none";
  });

//Close the remove dev modal
document
  .getElementById("closeRemoveDEV-modal")
  .addEventListener("click", function () {
    let modal = document.getElementById("RemoveDEV-modal");
    modal.style.display = "none";
  });

//Close the reset dev modal
document
  .getElementById("closeResetDEV-modal")
  .addEventListener("click", function () {
    let modal = document.getElementById("ResetDEV-modal");
    modal.style.display = "none";
  });

function logOut() {
  if (confirm("Are you sure you want to log out?")) {
    window.location.href = "../Pages/login-page.html";
  }
}

//FUNCTIONS FOR SHOWING BUGS BASED ON THEIR STATUS
function showResolved() {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");

  let elmtTable = document.getElementById("bug-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  for (let project of projects) {
    for (let bug of project.bugs) {
      if (bug.status == "completed") {
        let tr = document.createElement("tr");
        let title = document.createElement("td");
        let bugProject = document.createElement("td");
        let dateCreated = document.createElement("td");
        let status = document.createElement("td");
        let dueDate = document.createElement("td");

        title.innerText = bug.title;
        bugProject.innerText = project.name;
        dateCreated.innerText = formatDate(new Date(bug.dateCreated));
        status.innerText = bug.status.toUpperCase();
        dueDate.innerText = formatDate(new Date(bug.dueDate));

        tr.append(title, bugProject, status, dateCreated, dueDate);
        if (new Date() >= new Date(bug.dueDate)) {
          tr.style.color = "red";
        } else if (
          new Date() <= new Date(bug.dueDate) &&
          new Date() >= new Date(bug.dueDate).addDays(-2)
        ) {
          tr.style.color = "orange";
        } else {
          tr.style.color = "lightgreen";
        }
        document.getElementById("bug-table").appendChild(tr);
      }
    }
  }
}
function showUnresolved() {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");

  let elmtTable = document.getElementById("bug-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  for (let project of projects) {
    for (let bug of project.bugs) {
      if (bug.status == "unresolved") {
        let tr = document.createElement("tr");
        let title = document.createElement("td");
        let bugProject = document.createElement("td");
        let dateCreated = document.createElement("td");
        let status = document.createElement("td");
        let dueDate = document.createElement("td");

        title.innerText = bug.title;
        bugProject.innerText = project.name;
        dateCreated.innerText = formatDate(new Date(bug.dateCreated));
        status.innerText = bug.status.toUpperCase();
        dueDate.innerText = formatDate(new Date(bug.dueDate));

        tr.append(title, bugProject, status, dateCreated, dueDate);
        if (new Date() >= new Date(bug.dueDate)) {
          tr.style.color = "red";
        } else if (
          new Date() <= new Date(bug.dueDate) &&
          new Date() >= new Date(bug.dueDate).addDays(-2)
        ) {
          tr.style.color = "orange";
        } else {
          tr.style.color = "lightgreen";
        }
        document.getElementById("bug-table").appendChild(tr);
      }
    }
  }
}
function showProcessing() {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");

  let elmtTable = document.getElementById("bug-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  for (let project of projects) {
    for (let bug of project.bugs) {
      if (bug.status == "proccessing") {
        let tr = document.createElement("tr");
        let title = document.createElement("td");
        let bugProject = document.createElement("td");
        let dateCreated = document.createElement("td");
        let status = document.createElement("td");
        let dueDate = document.createElement("td");

        title.innerText = bug.title;
        bugProject.innerText = project.name;
        dateCreated.innerText = formatDate(new Date(bug.dateCreated));
        status.innerText = bug.status.toUpperCase();
        dueDate.innerText = formatDate(new Date(bug.dueDate));

        tr.append(title, bugProject, status, dateCreated, dueDate);
        if (new Date() >= new Date(bug.dueDate)) {
          tr.style.color = "red";
        } else if (
          new Date() <= new Date(bug.dueDate) &&
          new Date() >= new Date(bug.dueDate).addDays(-2)
        ) {
          tr.style.color = "orange";
        } else {
          tr.style.color = "lightgreen";
        }
        document.getElementById("bug-table").appendChild(tr);
      }
    }
  }
}
function showAllBugs() {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");

  var elmtTable = document.getElementById("bug-table");
  var tableRows = elmtTable.getElementsByTagName("tr");
  var rowCount = tableRows.length;

  for (var x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  for (let project of projects) {
    for (let bug of project.bugs) {
      let tr = document.createElement("tr");
      let title = document.createElement("td");
      let bugProject = document.createElement("td");
      let dateCreated = document.createElement("td");
      let status = document.createElement("td");
      let dueDate = document.createElement("td");

      title.innerText = bug.title;
      bugProject.innerText = project.name;
      dateCreated.innerText = formatDate(new Date(bug.dateCreated));
      status.innerText = bug.status.toUpperCase();
      dueDate.innerText = formatDate(new Date(bug.dueDate));

      tr.append(title, bugProject, status, dateCreated, dueDate);
      if (new Date() >= new Date(bug.dueDate)) {
        tr.style.color = "red";
      } else if (
        new Date() <= new Date(bug.dueDate) &&
        new Date() >= new Date(bug.dueDate).addDays(-2)
      ) {
        tr.style.color = "orange";
      } else {
        tr.style.color = "lightgreen";
      }
      document.getElementById("bug-table").appendChild(tr);
    }
  }
}
function bugSearch() {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  let searchField = document.getElementById("bug-search");

  let elmtTable = document.getElementById("bug-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  for (let project of projects) {
    for (let bug of project.bugs) {
      if (bug.title.toLowerCase().includes(searchField.value.toLowerCase())) {
        let tr = document.createElement("tr");
        let title = document.createElement("td");
        let bugProject = document.createElement("td");
        let dateCreated = document.createElement("td");
        let status = document.createElement("td");
        let dueDate = document.createElement("td");

        title.innerText = bug.title;
        bugProject.innerText = project.name;
        dateCreated.innerText = formatDate(new Date(bug.dateCreated));
        status.innerText = bug.status.toUpperCase();
        dueDate.innerText = formatDate(new Date(bug.dueDate));

        tr.append(title, bugProject, status, dateCreated, dueDate);
        if (new Date() >= new Date(bug.dueDate)) {
          tr.style.color = "red";
        } else if (
          new Date() <= new Date(bug.dueDate) &&
          new Date() >= new Date(bug.dueDate).addDays(-2)
        ) {
          tr.style.color = "orange";
        } else {
          tr.style.color = "lightgreen";
        }
        document.getElementById("bug-table").appendChild(tr);
      }
    }
  }
}
//SHOWING BUGS FUNCTIONS ENDS

//FUNCTIONS FOR DEVELOPERS SECTION
function searchDevs() {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  let searchField = document.getElementById("dev-search");

  let elmtTable = document.getElementById("dev-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let devs = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].auth == "developer") {
      devs.push(users[i]);
    }
  }

  for (const dev of devs) {
    if (
      dev.firstname.toLowerCase().includes(searchField.value.toLowerCase()) ||
      dev.lastname.toLowerCase().includes(searchField.value.toLowerCase()) ||
      dev.username.toLowerCase().includes(searchField.value.toLowerCase())
    ) {
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
        if (projects[j].devs.includes(dev.username)) {
          projCount++;
          projBugs += projects[j].bugs.length;
        }
      }

      totalProjects.innerText = projCount;
      bugs.innerText = projBugs;

      tr.append(fullname, username, totalProjects, bugs);
      document.getElementById("dev-table").appendChild(tr);
    }
  }
}
function sortByBugs() {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  let developers = [];
  let elmtTable = document.getElementById("dev-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let devs = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].auth == "developer") {
      devs.push(users[i]);
    }
  }

  for (const dev of devs) {
    {
      let projCount = 0;
      let projBugs = 0;
      let fullname = "";
      let username = "";
      let totalProjects = "";
      let bugs = "";

      fullname = dev.firstname + " " + dev.lastname;
      username = dev.username;
      for (let j = 0; j < projects.length; j++) {
        if (projects[j].devs.includes(dev.username)) {
          projCount++;
          projBugs += projects[j].bugs.length;
        }
      }

      totalProjects = projCount;
      bugs = projBugs;

      let developer = {
        fullname: fullname,
        username: username,
        amountOfProjects: projCount,
        amountOfBugs: projBugs,
      };
      if (!developers.includes(developer)) {
        console.log(developer);
        developers.push(developer);
      }
    }
  }
  //SORT BY AMOUNT OF BUGS DECS
  developers.sort((a, b) => {
    return b.amountOfBugs - a.amountOfBugs;
  });

  //DISPLAY NEW TABLE
  for (let developer of developers) {
    let tr = document.createElement("tr");
    let fullname = document.createElement("td");
    let username = document.createElement("td");
    let totalProjects = document.createElement("td");
    let bugs = document.createElement("td");

    fullname.innerText = developer.fullname;
    username.innerText = developer.username;
    totalProjects.innerText = developer.amountOfProjects;
    bugs.innerText = developer.amountOfBugs;

    tr.append(fullname, username, totalProjects, bugs);
    document.getElementById("dev-table").appendChild(tr);
  }
}
function sortByProjects() {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  let developers = [];
  let elmtTable = document.getElementById("dev-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let devs = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].auth == "developer") {
      devs.push(users[i]);
    }
  }

  for (const dev of devs) {
    {
      let projCount = 0;
      let projBugs = 0;
      let fullname = "";
      let username = "";
      let totalProjects = "";
      let bugs = "";

      fullname = dev.firstname + " " + dev.lastname;
      username = dev.username;
      for (let j = 0; j < projects.length; j++) {
        if (projects[j].devs.includes(dev.username)) {
          projCount++;
          projBugs += projects[j].bugs.length;
        }
      }

      totalProjects = projCount;
      bugs = projBugs;

      let developer = {
        fullname: fullname,
        username: username,
        amountOfProjects: projCount,
        amountOfBugs: projBugs,
      };
      if (!developers.includes(developer)) {
        console.log(developer);
        developers.push(developer);
      }
    }
  }
  //SORT BY AMOUNT OF PROJECTS DECS
  developers.sort((a, b) => {
    return b.amountOfProjects - a.amountOfProjects;
  });
  //DISPLAY NEW TABLE
  for (let developer of developers) {
    let tr = document.createElement("tr");
    let fullname = document.createElement("td");
    let username = document.createElement("td");
    let totalProjects = document.createElement("td");
    let bugs = document.createElement("td");

    fullname.innerText = developer.fullname;
    username.innerText = developer.username;
    totalProjects.innerText = developer.amountOfProjects;
    bugs.innerText = developer.amountOfBugs;

    tr.append(fullname, username, totalProjects, bugs);
    document.getElementById("dev-table").appendChild(tr);
  }
}
//DEVELOPERS FUNCTIONS ENDS

//SEARCH LISTENER SECTION
document.getElementById("bug-search").addEventListener("input", function () {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  let searchField = document.getElementById("bug-search");

  let elmtTable = document.getElementById("bug-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  for (let project of projects) {
    for (let bug of project.bugs) {
      if (bug.title.toLowerCase().includes(searchField.value.toLowerCase())) {
        let tr = document.createElement("tr");
        let title = document.createElement("td");
        let bugProject = document.createElement("td");
        let dateCreated = document.createElement("td");
        let status = document.createElement("td");
        let dueDate = document.createElement("td");

        title.innerText = bug.title;
        bugProject.innerText = project.name;
        dateCreated.innerText = formatDate(new Date(bug.dateCreated));
        status.innerText = bug.status.toUpperCase();
        dueDate.innerText = formatDate(new Date(bug.dueDate));

        tr.append(title, bugProject, status, dateCreated, dueDate);
        if (new Date() >= new Date(bug.dueDate)) {
          tr.style.color = "red";
        } else if (
          new Date() <= new Date(bug.dueDate) &&
          new Date() >= new Date(bug.dueDate).addDays(-2)
        ) {
          tr.style.color = "orange";
        } else {
          tr.style.color = "lightgreen";
        }
        document.getElementById("bug-table").appendChild(tr);
      }
    }
  }
});
document.getElementById("dev-search").addEventListener("input", function () {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  let searchField = document.getElementById("dev-search");

  let elmtTable = document.getElementById("dev-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let devs = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].auth == "developer") {
      devs.push(users[i]);
    }
  }

  for (const dev of devs) {
    if (
      dev.firstname.toLowerCase().includes(searchField.value.toLowerCase()) ||
      dev.lastname.toLowerCase().includes(searchField.value.toLowerCase()) ||
      dev.username.toLowerCase().includes(searchField.value.toLowerCase())
    ) {
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
        if (projects[j].devs.includes(dev.username)) {
          projCount++;
          projBugs += projects[j].bugs.length;
        }
      }

      totalProjects.innerText = projCount;
      bugs.innerText = projBugs;

      tr.append(fullname, username, totalProjects, bugs);
      document.getElementById("dev-table").appendChild(tr);
    }
  }
});

document
  .getElementById("project-search")
  .addEventListener("input", function () {
    let projects = JSON.parse(localStorage.getItem("projects") || "[]");
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let searchField = document.getElementById("project-search");

    let elmtTable = document.getElementById("project-table");
    let tableRows = elmtTable.getElementsByTagName("tr");
    let rowCount = tableRows.length;

    for (let x = rowCount - 1; x > 0; x--) {
      elmtTable.removeChild(tableRows[x]);
    }

    for (let project of projects) {
      if (
        project.name.toLowerCase().includes(searchField.value.toLowerCase())
      ) {
        let tr = document.createElement("tr");
        let name = document.createElement("td");
        let numberOfDevs = document.createElement("td");
        let numberOfBugs = document.createElement("td");
        let percentage = document.createElement("td");

        name.innerText = project.name;

        for (let dev of project.devs) {
          for (let user of users) {
            if (user.username == dev) {
              numberOfDevs.innerHTML +=
                user.firstname + " " + user.lastname + "<br>";
            }
          }
        }

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
    }
  });
//SEARCH LISTENER ENDS

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

//ADD A PROJECTS
function openProjectModal() {
  let modal = document.getElementById("project-modal");

  modal.style.display = "block";
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  for (let user of users) {
    if (user.auth == "developer") {
      let option = document.createElement("option");
      option.value = user.username;
      option.innerText = user.firstname + " " + user.lastname;

      document.getElementById("list-of-devs").appendChild(option);
    }
  }
}

document
  .getElementById("close-project-modal")
  .addEventListener("click", function () {
    let modal = document.getElementById("project-modal");

    document.getElementById("modal-devs").value = "";

    $("#list-of-devs").find("option").remove().end();
    modal.style.display = "none";
  });

document.getElementById("list-of-devs").addEventListener("change", function () {
  let select = document.getElementById("list-of-devs");

  if (!document.getElementById("modal-devs").value.includes(select.value)) {
    if (document.getElementById("modal-devs").value != "") {
      document.getElementById("modal-devs").value += "," + select.value;
    } else {
      document.getElementById("modal-devs").value += select.value;
    }
  } else {
    alert("Developer already added to the list");
  }
});

window.addEventListener("click", function (e) {
  let projModal = document.getElementById("project-modal");
  let devModal = document.getElementById("AddDev-modal");
  let resetModal = document.getElementById("ResetDEV-modal");
  let removeModal = document.getElementById("RemoveDEV-modal");
  if (
    e.target == projModal ||
    e.target == resetModal ||
    e.target == removeModal ||
    e.target == devModal
  ) {
    projModal.style.display = "none";
    devModal.style.display = "none";
    resetModal.style.display = "none";
    removeModal.style.display = "none";
  }
});

document
  .getElementById("modal-proj-name")
  .addEventListener("input", function () {
    let projects = JSON.parse(localStorage.getItem("projects") || "[]");
    for (let project of projects) {
      if (project.name == document.getElementById("modal-proj-name").value) {
        document.getElementById("modal-proj-name").style.border =
          "0.2rem solid red";
      } else {
        document.getElementById("modal-proj-name").style.border =
          "1px outset var(--light)";
      }
    }
  });
class Project {
  constructor(projName, projDevs, bugs) {
    this.name = projName;
    this.devs = projDevs;
    this.bugs = bugs;
  }
}
document
  .getElementById("add-proj-form")
  .addEventListener("submit", function () {
    let projects = JSON.parse(localStorage.getItem("projects") || "[]");
    let create = true;

    for (let project of projects) {
      if (project.name == document.getElementById("modal-proj-name").value) {
        alert("Project already exists projects require a unit name");
        create = false;
      }
    }

    try {
      if (create) {
        let project = new Project(
          document.getElementById("modal-proj-name").value,
          document.getElementById("modal-devs").value.split(","),
          []
        );

        projects.push(project);
        console.log(projects);
        localStorage.setItem("projects", JSON.stringify(projects));
      }
    } catch (error) {
      console.log(error);
    }
  });
//Add projects ends

//Project sort function
function sortProjectsByUnresolved() {
  let elmtTable = document.getElementById("project-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let sortedProjects = [];
  let devs = "";
  let percent = 0;
  let totalBugs = 0;
  for (let project of projects) {
    for (let dev of project.devs) {
      for (let user of users) {
        if (user.username == dev) {
          devs += user.firstname + " " + user.lastname + "<br>";
        }
      }
    }
    let count = 0;
    for (let bug of project.bugs) {
      if (bug.status == "completed") {
        count++;
      }
    }
    percent = ((count / project.bugs.length) * 100).toFixed(2) + "%";

    totalBugs = project.bugs.length - count;
    let tableInfo = {
      name: project.name,
      devs: devs,
      unresolvedBugs: totalBugs,
      percentComplete: percent,
    };
    sortedProjects.push(tableInfo);
    devs = "";
  }
  sortedProjects.sort((a, b) => b.unresolvedBugs - a.unresolvedBugs);
  console.log(sortedProjects);
  for (let proj of sortedProjects) {
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    let numberOfDevs = document.createElement("td");
    let numberOfBugs = document.createElement("td");
    let percentage = document.createElement("td");

    name.innerText = proj.name;
    numberOfDevs.innerHTML = proj.devs;
    numberOfBugs.innerText = proj.unresolvedBugs;
    percentage.innerText = proj.percentComplete;
    console.log(numberOfDevs.innerHTML);
    tr.append(name, numberOfDevs, numberOfBugs, percentage);
    document.getElementById("project-table").appendChild(tr);
  }
}

function sortProjectsByPercentage() {
  let elmtTable = document.getElementById("project-table");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;

  for (let x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let sortedProjects = [];
  let devs = "";
  let percent = 0;
  let totalBugs = 0;
  for (let project of projects) {
    for (let dev of project.devs) {
      for (let user of users) {
        if (user.username == dev) {
          devs += user.firstname + " " + user.lastname + "<br>";
        }
      }
    }
    let count = 0;
    for (let bug of project.bugs) {
      if (bug.status == "completed") {
        count++;
      }
    }
    percent = ((count / project.bugs.length) * 100).toFixed(2);

    totalBugs = project.bugs.length - count;
    let tableInfo = {
      name: project.name,
      devs: devs,
      unresolvedBugs: totalBugs,
      percentComplete: percent,
    };
    sortedProjects.push(tableInfo);
    devs = "";
  }
  sortedProjects.sort((a, b) => b.percentComplete - a.percentComplete);
  for (let proj of sortedProjects) {
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    let numberOfDevs = document.createElement("td");
    let numberOfBugs = document.createElement("td");
    let percentage = document.createElement("td");

    name.innerText = proj.name;
    numberOfDevs.innerHTML = proj.devs;
    numberOfBugs.innerText = proj.unresolvedBugs;
    percentage.innerText = proj.percentComplete + "%";
    console.log(numberOfDevs.innerHTML);
    tr.append(name, numberOfDevs, numberOfBugs, percentage);
    document.getElementById("project-table").appendChild(tr);
  }
}
//project sort functions ends
