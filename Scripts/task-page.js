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
    console.log(JSON.parse(localStorage.getItem("projects")));
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
