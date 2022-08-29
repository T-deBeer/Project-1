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
document.getElementById("Add-DEV-button").addEventListener("click", function () {
  let modal = document.getElementById("AddDev-modal");

  modal.style.display = "block";
});

//Opens up the dev Reset warning modal
document.getElementById("Reset-DEV-button").addEventListener("click", function () {
  let modal = document.getElementById("ResetDEV-modal");

  modal.style.display = "block";
});

//Opens up the remove dev modal
document.getElementById("Remove-DEV-button").addEventListener("click", function () {

  let modal = document.getElementById("RemoveDEV-modal");
  modal.style.display = "block";  

});




//When remove button is clicked in the remove modal(Remove from localstorage)
document.getElementById("Remove-DEVform").addEventListener("submit", function () {
  let RemoveDevUsername = document.getElementById("Remove-DEV").value;

  let users = [];
  let newUsers = [];''
  users = JSON.parse(localStorage.getItem("users") || "[]");
  len = users.length;

  for(let i=0; i < len; i++)
  {
    if((users[i].username != RemoveDevUsername) && (len != 0))
    {
      let DevName = users[i].firstname;
      let DevSurname = users[i].lastname;
      let DevUsername = users[i].username;
      let DevPassword = users[i].password;
      let DevAuth = users[i].auth;
      let user = new DevUser(DevName, DevSurname, DevUsername, DevPassword, DevAuth);
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

  let user = new DevUser(DevName, DevSurname, DevUsername, DevPassword, "developer");
  users.push(user); 

  localStorage.setItem("users", JSON.stringify(users));

});

//When reset button is clicked in reset modal
document.getElementById("Reset-DEVform").addEventListener("submit", function () {

  localStorage.clear("users");

  users = JSON.parse(localStorage.getItem("users") || "[]");
  let user = new DevUser("Administrator", "Profile", "Admin", "1234", "admin");
  users.push(user);
  user = new DevUser("Tiaan", "De Beer", "T-deBeer", "577088", "developer");
  users.push(user);
  user = new DevUser("Hardus", "Lotter", "HardusLotter", "578559", "developer");
  users.push(user);
  user = new DevUser("Jaco", "Mathee", "timejunky1", "578381", "developer");
  users.push(user);
  user = new DevUser("Tobias", "van Schalkwyk", "Rat3l", "578552", "developer");
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

});

//Close the add dev modal
document.getElementById("closeDEV-modal").addEventListener("click", function () {
  let modal = document.getElementById("AddDev-modal");
  modal.style.display = "none";
});

//Close the remove dev modal
document.getElementById("closeRemoveDEV-modal").addEventListener("click", function () {
  let modal = document.getElementById("RemoveDEV-modal");
  modal.style.display = "none";
});

//Close the reset dev modal
document.getElementById("closeResetDEV-modal").addEventListener("click", function () {
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
