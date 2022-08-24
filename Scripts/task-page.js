class BugTicket {
  constructor(title, description, status) {
    this.title = title;
    this.description = description;
    this.status = status;
  }
}

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
    if (title.innerText.includes(projects[i].projName)) {
      let id = Number(data.substring(data.indexOf("-") + 1));
      projects[i].bugs[id].status = ev.target.id;

      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }
}

function logOut() {
  if (confirm("Are you sure you want to log out?")) {
    window.location.href = "../Pages/login-page.html";
  }
}

document.getElementById("projects").addEventListener("change", function () {
  let selection = document.getElementById("projects").value;
  title.innerText = "Viewing " + selection;
});

document.getElementById("create-ticket").addEventListener("click", function () {
  let modal = document.getElementById("edit-modal");
  document.getElementById("modal-button").innerText = "Create Ticket";
  document.getElementById("modal-title").innerText =
    "Create a Bug- or Feature-Ticket";
  modal.style.display = "block";
});

document.getElementById("close-modal").addEventListener("click", function () {
  let modal = document.getElementById("edit-modal");
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  projects = JSON.parse(localStorage.getItem("projects"));
  let modal = document.getElementById("edit-modal");
  let bugId = 0;
  let id = 0;

  if (event.target == modal) {
    //if the other part of the window is clicked then the modal is closed
    modal.style.display = "none";
  } else if (event.target.id.includes("bug-edit")) {
    //If a edit button is clicked then the modal is opened with the bug ticket info
    for (let i = 0; i < projects.length; i++) {
      if (title.innerText.includes(projects[i].projName)) {
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

    //reveals the modal
    modal.style.display = "block";

    //saves the id of the bug that we are editing
    localStorage.setItem("edit-id", bugId);
  }
});

document.getElementById("edit-form").addEventListener("submit", function () {
  let button = document.getElementById("modal-button");

  if (button.innerText === "Edit") {
    let id = Number(localStorage.getItem("edit-id"));

    for (let i = 0; i < projects.length; i++) {
      if (title.innerText.includes(projects[i].projName)) {
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

        //Stores updated bugs
        localStorage.setItem("projects", JSON.stringify(projects));
      }
    }
  } else {
    for (let i = 0; i < projects.length; i++) {
      if (title.innerText.includes(projects[i].projName)) {
        //Creates new ticket with the Title,Description and Status found in the modal
        let ticket = new BugTicket(
          document.getElementById("modal-bug-title").value,
          document.getElementById("modal-bug-description").value,
          document.getElementById("bug-status").value
        );

        projects[i].bugs.push(ticket);
        localStorage.setItem("projects", JSON.stringify(projects));
      }
    }
  }
});
