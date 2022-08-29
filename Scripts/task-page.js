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
//initialises Progressbar and functions for progressbar
let Progressbar = {
  progressbar: document.querySelector("#progressbar"),
  u: document.getElementById("progressUnresolved"),
  p: document.getElementById("progressProccessing"),
  r: document.getElementById("progressResolved"),
  menue: document.getElementById("menue"),
  info: document.getElementById("info"),
  projects: [],
  states: [],
  devs: [],
  bugs: [],
  moreInfo: [],
  notes: [],
  bugsPast: 0,
  curProject: "",
  num1: 0,
  num2: 0,
  num3: 0,
  //getting the info from the local storage
  getInfo: function () {
    this.devs.splice(0);
    this.bugs.splice(0);
    this.states.splice(0);
    this.bugsPast = 0;
    let nbugs = 0;
    this.curProject = document.getElementById("projects").value;
    this.projects = JSON.parse(localStorage.getItem("projects") || "[]");
    if (this.projects !== null) {
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].name === this.curProject) {
          for (let j = 0; j < this.projects[i].devs.length; j++) {
            this.devs.push(this.projects[i].devs[j]);
          }
          for (let j = 0; j < this.projects[i].bugs.length; j++) {
            if (
              !this.bugs
                .map((bug) => {
                  return bug.includes(this.projects[i].bugs[j].type);
                })
                .includes(true)
            ) {
              nbugs = 0;
              this.bugs.push(`${this.projects[i].bugs[j].type}:  ${nbugs + 1}`);
            } else {
              nbugs += 1;
              this.bugs[
                this.bugs.indexOf(`${this.projects[i].bugs[j].type}:  ${nbugs}`)
              ] = `${this.projects[i].bugs[j].type}:  ${nbugs + 1}`;
            }
            this.states.push(this.projects[i].bugs[j].status);
            if (
              this.projects[i].bugs[j].dueDate >= Date.now() &&
              this.projects[i].bugs[j].status !== "Resolved"
            ) {
              this.bugsPast += 1;
            }
          }
          break;
        }
      }
    }
    console.log(
      this.states,
      this.devs,
      this.bugs,
      this.bugsPast,
      this.curProject
    );
  },

  //load the visuals for the progressbar
  loadprogressBar: function () {
    this.getInfo();
    console.log(this.progressbar.style.width);
    this.num1 = 0;
    this.num2 = 0;
    this.num3 = 0;
    let percentage1 = 0,
      percentage2 = 0,
      percentage3 = 0;
    this.states.forEach((element) => {
      switch (element) {
        case "unresolved":
          this.num1 += 1;
          percentage1 = ((this.num1 / this.states.length) * 100) / 1;
          break;
        case "proccessing":
          this.num2 += 1;
          percentage2 = ((this.num2 / this.states.length) * 100) / 1;
          break;
        case "completed":
          this.num3 += 1;
          percentage3 = ((this.num3 / this.states.length) * 100) / 1;
          break;
        default:
          break;
      }
    });
    this.u.style.width = `${percentage1}%`;
    this.p.style.width = `${percentage2}%`;
    this.r.style.width = `${percentage3}%`;

    console.log(this.num1, this.num2, this.num3);
  },
  //displays the initial container for the menue
  showDetails: function () {
    this.u.style.opacity = "0.2";
    this.p.style.opacity = "0.2";
    this.r.style.opacity = "0.2";
    this.progressbar.style.height = "550px";
    this.menue.style.display = "block";
  },
  //hides the container for the menue and initiates the hideifno method
  hideDetails: function () {
    this.progressbar.style.height = "20px";
    this.menue.style.display = "none";
    this.u.style.opacity = "1";
    this.p.style.opacity = "1";
    this.r.style.opacity = "1";

    this.hideInfo();
  },
  //show the info for the spacific on click avent of a menue item as well as hiding the menue
  showInfo: function (Option) {
    this.info.style.display = "block";
    let fallAway = document.getElementById("fallAway");
    fallAway.style.display = "none";
    let back = document.createElement("h4");
    if (document.getElementById("back") === null) {
      back.innerHTML = '<h4 onclick="Progressbar.hideInfo();">Back</h4>';
      back.id = "back";
      this.info.appendChild(back);
    }
    let ul = document.createElement("ul");
    ul.style.height = "auto";
    ul.id = "infoList";
    ul.style.listStyle = "none";
    let li;
    let textarea;
    switch (Option) {
      case "Summary":
        ul.innerHTML = "Summary:";
        li = document.createElement("li");
        li.innerHTML = `Unresolved: ${this.num1}`;
        ul.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = `Processing: ${this.num2}`;
        ul.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = `Resolved: ${this.num3}`;
        ul.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = `Bugs overdue: ${this.bugsPast}`;
        ul.appendChild(li);
        this.info.prepend(ul);
        break;
      case "ShowDevs":
        if (this.devs.length > 0) {
          ul.innerHTML = "Devs:";
          this.devs.forEach((dev) => {
            li = document.createElement("li");
            li.innerHTML = `${dev}`;
            ul.appendChild(li);
          });
        }
        if (this.devs.length === 0) {
          li = document.createElement("li");
          li.innerHTML = "There are no devs in this project";
          ul.appendChild(li);
        }
        this.info.prepend(ul);
        break;
      case "ShowBugs":
        if (this.bugs.length > 0) {
          ul.innerHTML = "Bugs:";
          this.bugs.forEach((bug) => {
            li = document.createElement("li");
            li.innerHTML = `${bug}`;
            ul.appendChild(li);
          });
        }
        if (this.bugs.length === 0) {
          li = document.createElement("li");
          li.innerHTML = "There are no Bugs in this project";
          ul.appendChild(li);
        }
        this.info.prepend(ul);
        break;
      case "Notes":
        li = document.createElement("li");
        ul.innerHTML = "Notes:";
        textarea = document.createElement("textarea");
        textarea.style.color = "white";
        textarea.style.backgroundColor = "#252A34";
        textarea.style.display = "flex";
        textarea.style.outline = "none";
        textarea.style.border = "none";
        textarea.style.width = "100%";
        textarea.style.height = "380px";
        textarea.style.resize = "none";
        textarea.maxLength = "200";
        textarea.id = "notes";
        if (
          this.notes
            .map((item) => {
              return item.includes(this.curProject);
            })
            .includes(true) &&
          this.notes.length > 0
        ) {
          textarea.value = this.notes.map((item) => {
            return item.slice(item.indexOf(":") + 1);
          })[
            this.notes
              .map((item) => {
                return item.includes(this.curProject);
              })
              .indexOf(true)
          ];
        }
        li.appendChild(textarea);
        ul.appendChild(li);
        this.info.prepend(ul);
        break;
      case "MoreInfo":
        li = document.createElement("li");
        ul.innerHTML = "More Information:";
        textarea = document.createElement("textarea");
        textarea = document.createElement("textarea");
        textarea.style.color = "white";
        textarea.style.backgroundColor = "#252A34";
        textarea.style.display = "flex";
        textarea.style.flexDirection = "column";
        textarea.style.outline = "none";
        textarea.style.border = "none";
        textarea.style.width = "100%";
        textarea.style.height = "350px";
        textarea.style.resize = "none";
        textarea.maxLength = "200";
        textarea.id = "more-info";
        if (
          this.moreInfo
            .map((item) => {
              return item.includes(this.curProject);
            })
            .includes(true) &&
          this.moreInfo.length > 0
        ) {
          textarea.value = this.moreInfo.map((item) => {
            return item.slice(item.indexOf(":") + 1);
          })[
            this.moreInfo
              .map((item) => {
                return item.includes(this.curProject);
              })
              .indexOf(true)
          ];
        }
        li.appendChild(textarea);
        ul.appendChild(li);
        this.info.prepend(ul);
        break;
      case "ShowContributers":
        ul.innerHTML = "Contributers:";
        li = document.createElement("li");
        li.innerHTML = "Jacobus gerhardus Lotter 578559";
        ul.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Stephanus Jacobus Mathee 578381";
        ul.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Tiaan De Beer 577088";
        ul.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Tiaan Tobias van Schalkwyk 578552";
        ul.appendChild(li);
        this.info.prepend(ul);
        break;
      default:
        break;
    }
  },
  //hides the info and displays the menue
  hideInfo: function () {
    try {
      if (this.curProject !== "") {
        let projNotes = `${this.curProject}:${
          document.getElementById("notes").value
        }`;
        if (
          !this.notes
            .map((item) => {
              return item.includes(this.curProject);
            })
            .includes(true)
        ) {
          this.notes.push(projNotes);
        } else {
          this.notes[
            this.notes
              .map((item) => {
                return item.includes(this.curProject);
              })
              .indexOf(true)
          ] = projNotes;
        }
      }
    } catch {}

    try {
      if (this.curProject !== "") {
        let projMoreInfo = `${this.curProject}:${
          document.getElementById("more-info").value
        }`;
        if (
          !this.moreInfo
            .map((item) => {
              return item.includes(this.curProject);
            })
            .includes(true)
        ) {
          this.moreInfo.push(projMoreInfo);
        } else {
          this.moreInfo[
            this.moreInfo
              .map((item) => {
                return item.includes(this.curProject);
              })
              .indexOf(true)
          ] = projMoreInfo;
        }
      }
    } catch {}
    this.info.style.display = "none";
    let fallAway = document.getElementById("fallAway");
    fallAway.style.display = "block";
    try {
      let infoList = document.getElementById("infoList");
      this.info.removeChild(infoList);
    } catch {}
  },
};

//Global variable declarations
let projects = JSON.parse(localStorage.getItem("projects"));
let title = document.getElementById("view-proj");
//ends

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  console.log(data);
  ev.target.appendChild(document.getElementById(data));

  for (let i = 0; i < projects.length; i++) {
    if (title.innerText.includes(projects[i].name)) {
      let id = Number(data.substring(data.indexOf("-") + 1));
      if (ev.target.id == "completed") {
        if (
          confirm(
            "Are you sure you want to resolve this ticket.\n" +
              projects[i].bugs[id].title,
            "CONFIRM"
          )
        ) {
          projects[i].bugs[id].status = ev.target.id;
          projects[i].bugs[id].dateResolved = formatDate(new Date());
        } else {
          location.reload();
        }
      } else if (ev.target.id == "proccessing") {
        projects[i].bugs[id].status = ev.target.id;
        projects[i].bugs[id].dateResolved = "";
      } else if (ev.target.id == "unresolved") {
        projects[i].bugs[id].status = ev.target.id;
        projects[i].bugs[id].dateResolved = "";
      }

      localStorage.setItem("projects", JSON.stringify(projects));
      Progressbar.loadprogressBar();
    }
  }
  console.log(JSON.parse(localStorage.getItem("projects") || "[]"));
}

function logOut() {
  if (confirm("Are you sure you want to log out?")) {
    window.location.href = "../Pages/login-page.html";
  }
}

document.getElementById("projects").addEventListener("change", function () {
  Progressbar.loadprogressBar();
  let selection = document.getElementById("projects").value;
  localStorage.setItem("currProject", selection);
  let title = document.getElementById("view-proj");
  title.innerText = "Viewing " + selection;

  let unresolved = document.getElementById("unresolved");
  let resolved = document.getElementById("completed");
  let proccessing = document.getElementById("proccessing");

  unresolved.innerHTML = "<h2>UNRESOLVED</h2>";
  resolved.innerHTML = "<h2>RESOLVED</h2>";
  proccessing.innerHTML = "<h2>PROCCESSING</h2>";

  let projs = JSON.parse(localStorage.getItem("projects") || "[]");

  for (let i = 0; i < projs.length; i++) {
    if (projs[i].name == selection) {
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
    }
  }
});

document.getElementById("create-ticket").addEventListener("click", function () {
  let modal = document.getElementById("edit-modal");
  document.getElementById("bug-status").disabled = true;
  document.getElementById("modal-button").innerText = "Create Ticket";
  document.getElementById("modal-title").innerText =
    "Create a Bug- or Feature-Ticket";

  //Set Title text field of modal
  document.getElementById("modal-bug-title").value = "";

  //Set the dexcription field of modal
  document.getElementById("modal-bug-description").value = "";

  //Set the due date
  document.getElementById("modal-bug-due").disabled = true;
  document.getElementById("modal-bug-due").value = formatDate(
    new Date().addDays(3)
  );

  //reset the radio buttons
  const radioButtons = document.querySelectorAll('input[name="type"]');
  for (const radioButton of radioButtons) {
    radioButton.checked = false;
  }

  modal.style.display = "block";
});

document.getElementById("close-modal").addEventListener("click", function () {
  let modal = document.getElementById("edit-modal");
  modal.style.display = "none";
});

//Formats
window.addEventListener("click", function (event) {
  projects = JSON.parse(localStorage.getItem("projects"));
  let modal = document.getElementById("edit-modal");
  let bugId = 0;
  let id = 0;

  if (event.target == modal) {
    //if the other part of the window is clicked then the modal is closed
    modal.style.display = "none";
  } else if (event.target.id.includes("bug-edit")) {
    document.getElementById("bug-status").disabled = false;
    document.getElementById("modal-bug-due").disabled = false;
    document.getElementById("modal-button").innerText = "Edit";
    document.getElementById("modal-title").innerText =
      "Bug or Feature Information";
    //If a edit button is clicked then the modal is opened with the bug ticket info
    for (let i = 0; i < projects.length; i++) {
      if (title.innerText.includes(projects[i].name)) {
        //if the
        //Uses string manipulation to find the id of the bug
        let string = event.target.id.substring(
          event.target.id.indexOf("-") + 1
        );
        string = string.substring(string.indexOf("-") + 1);
        bugId = Number(string);
        //Uses string manipulation to find the id of the bug
        id = i;
      }
    }
    const radioButtons = document.querySelectorAll('input[name="type"]');
    for (const radioButton of radioButtons) {
      if (radioButton.value == projects[id].bugs[bugId].type) {
        radioButton.checked = true;
      }
    }
    //Change button text to Edit instead of create
    document.getElementById("modal-button").value = "Edit";

    //Set Title text field of modal
    document.getElementById("modal-bug-title").value =
      projects[id].bugs[bugId].title;

    //Set the dexcription field of modal
    document.getElementById("modal-bug-description").value =
      projects[id].bugs[bugId].description;

    //sets the value of the comboBox
    document.getElementById("bug-status").value =
      projects[id].bugs[bugId].status;

    //Set the due date field of the ticket
    document.getElementById("modal-bug-due").value = formatDate(
      new Date(projects[id].bugs[bugId].dueDate)
    );

    //reveals the modal
    modal.style.display = "block";

    //saves the id of the bug that we are editing
    localStorage.setItem("edit-id", bugId);
  }
});

//When the modal form is submitted
document.getElementById("edit-form").addEventListener("submit", function (ev) {
  let button = document.getElementById("modal-button");

  if (button.innerText === "Edit") {
    let id = Number(localStorage.getItem("edit-id"));

    for (let i = 0; i < projects.length; i++) {
      if (title.innerText.includes(projects[i].name)) {
        //Set title
        projects[i].bugs[id].title =
          document.getElementById("modal-bug-title").value;
        //Set Description
        projects[i].bugs[id].description = document.getElementById(
          "modal-bug-description"
        ).value;
        //Set status
        projects[i].bugs[id].status =
          document.getElementById("bug-status").value;
        if (projects[i].bugs[id].status == "completed") {
          projects[i].bugs[id].dateResolved = new Date();
        }

        //Set due date
        const radioButtons = document.querySelectorAll('input[name="type"]');

        let selectedType;
        for (const radioButton of radioButtons) {
          if (radioButton.checked) {
            selectedType = radioButton.value;
          }
        }

        projects[i].bugs[id].dueDate =
          document.getElementById("modal-bug-due").value;

        //Stores updated bugs
        localStorage.setItem("projects", JSON.stringify(projects));
        Progressbar.loadprogressBar();
      }
    }
  } else {
    for (let i = 0; i < projects.length; i++) {
      if (title.innerText.includes(projects[i].name)) {
        const radioButtons = document.querySelectorAll('input[name="type"]');

        let selectedType;
        let dueDate;
        for (const radioButton of radioButtons) {
          if (radioButton.checked) {
            selectedType = radioButton.value;
          }
        }

        if (selectedType.value == "bug") {
          dueDate = document.getElementById("modal-bug-due").value;
        } else {
          dueDate = new Date().addDays(14);
          document.getElementById("modal-bug-due").value = dueDate;
        }

        //Creates new ticket with the Title,Description and Status found in the modal
        let ticket = new BugTicket(
          document.getElementById("modal-bug-title").value,
          document.getElementById("modal-bug-description").value,
          "unresolved",
          formatDate(new Date()),
          "",
          dueDate,
          selectedType
        );

        projects[i].bugs.push(ticket);
        localStorage.setItem("projects", JSON.stringify(projects));
        Progressbar.loadprogressBar();

        document.getElementById("projects").value = projects[i].name;
      }
    }
  }
});

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

//New method for Date types
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function featureReq() {
  if (document.getElementById("modal-button").innerText == "Create Ticket") {
    dueDate = document.getElementById("modal-bug-due").value = formatDate(
      new Date().addDays(14)
    );
  }
}
