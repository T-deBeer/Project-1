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
  progressbar: document.querySelector('#progressbar'),
  u: document.getElementById('progressUnresolved'),
  p: document.getElementById('progressProccessing'),
  r: document.getElementById('progressResolved'),
  menue: document.getElementById('menue'),
  info: document.getElementById('info'),
  projects: [],
  states: [],
  devs: [],
  bugs: [],
  bugsPast: 0,
  curProject: '',
  num1: 0,
  num2: 0,
  num3: 0,

  getInfo: function(){
      this.devs.splice(0);
      this.bugs.splice(0);
      this.states.splice(0);
      this.bugsPast = 0;
      let nbugs = 0;
      this.curProject = document.getElementById('projects').value;
      this.projects = JSON.parse(localStorage.getItem("projects") || "[]");
      if(this.projects!==null){
      for(let i = 0; i < this.projects.length; i++) {
        if(this.projects[i].name === this.curProject){
            for(let j = 0; j < this.projects[i].devs.length; j++)
            {
                this.devs.push(this.projects[i].devs[j]);
            }
            for(let j = 0; j < this.projects[i].bugs.length; j++)
            {
                if(!this.bugs.map((bug)=> {return bug.includes(this.projects[i].bugs[j].type)}).includes(true)){
                  nbugs = 0;
                  this.bugs.push(`${this.projects[i].bugs[j].type}:  ${nbugs+1}`)
                }
                else
                {  
                  nbugs+=1;
                  this.bugs[this.bugs.indexOf(`${this.projects[i].bugs[j].type}:  ${nbugs}`)] = `${this.projects[i].bugs[j].type}:  ${nbugs+1}`;
                }
                this.states.push(this.projects[i].bugs[j].status);
                if(this.projects[i].bugs[j].dueDate >= Date.now() && this.projects[i].bugs[j].status !== 'Resolved')
                {
                  this.bugsPast += 1;
                }
            }
            break;       
        }
      }
    }
    console.log(this.states,
      this.devs,
      this.bugs,
      this.bugsPast,
      this.curProject,
      )
  },

  loadprogressBar: function(){
  this.getInfo();
  console.log(this.progressbar.style.width);
  this.num1 = 0;
  this.num2 = 0; 
  this.num3 = 0;
  let percentage1 = 0, percentage2 = 0, percentage3 = 0
  this.states.forEach(element => {
    switch(element)
    {
      case 'Unresolved':
        this.num1+= 1;
        percentage1 = ((this.num1/this.states.length) * 100)/1;
        break;
      case 'Processing':
        this.num2+= 1;
        percentage2 = ((this.num2/this.states.length) * 100)/1;
        break;
      case 'Resolved':
        this.num3+= 1;
        percentage3 = ((this.num3/this.states.length) * 100)/1;
        break;
      default:
        break;
    }
  });
  this.u.style.width = `${percentage1}%`;
  this.p.style.width = `${percentage2}%`;
  this.r.style.width = `${percentage3}%`;

  console.log(this.num1,
    this.num2,
    this.num3)
  },

  showDetails: function()
  {
    this.loadprogressBar();
    this.u.style.opacity = '0.2';
    this.p.style.opacity = '0.2';
    this.r.style.opacity = '0.2';
    this.progressbar.style.height = "550px";
    this.menue.style.display = "block";
  },

  hideDetails: function()
  {
    this.progressbar.style.height = "20px";
    this.menue.style.display = "none";
    this.u.style.opacity = '1';
    this.p.style.opacity = '1';
    this.r.style.opacity = '1';
  
    this.hideInfo();
  },

  showInfo: function(Option){
    this.info.style.display = 'block';
    let fallAway = document.getElementById('fallAway');
    fallAway.style.display ='none';
    let back = document.createElement('h4');
    if(document.getElementById('back')===null){
      back.innerHTML = ('<h4 onclick="Progressbar.hideInfo();">Back</h4>');
      back.id = 'back';
      this.info.appendChild(back);
    }
    let ul = document.createElement('ul');
    ul.style.height = 'auto';
    ul.id = 'infoList';
    ul.style.listStyle = 'none';
    let li;
  
  switch(Option){
      case 'Summary':
        ul.innerHTML = 'Summary:'
        li = document.createElement('li');
        li.innerHTML = `Unresolved: ${this.num1}`;
        ul.appendChild(li);
        li = document.createElement('li');
        li.innerHTML = `Processing: ${this.num2}`;
        ul.appendChild(li);
        li = document.createElement('li');
        li.innerHTML = `Resolved: ${this.num3}`;
        ul.appendChild(li);
        li = document.createElement('li');
        li.innerHTML = `Bugs overdue: ${this.bugsPast}`;
        ul.appendChild(li);
        this.info.prepend(ul);
        break;
      case 'ShowDevs':
        if(this.devs.length > 0){
          ul.innerHTML = 'Devs:'       
          this.devs.forEach(dev => {
            li = document.createElement('li');
            li.innerHTML = `${dev}`;
            ul.appendChild(li);
          });
        }
        if(this.devs.length===0)
        {
          li = document.createElement('li');
          li.innerHTML = 'There are no devs in this project';
          ul.appendChild(li);
        }
          this.info.prepend(ul);        
        break;
      case 'ShowBugs':
        if(this.bugs.length> 0)
        {
          ul.innerHTML = 'Bugs:'
          this.bugs.forEach(bug => {
          li = document.createElement('li');
          li.innerHTML = `${bug}`;
          ul.appendChild(li);
          });
        }
        if(this.bugs.length===0)
        {
          li = document.createElement('li');
          li.innerHTML = 'There are no Bugs in this project';
          ul.appendChild(li);
        }
        this.info.prepend(ul);
        break;
      case 'Option 4':
        break;
      case 'Option 5':
        break;
      case 'ShowContributers':
        ul.innerHTML = 'Contributers:'
        li = document.createElement('li');
        li.innerHTML = 'Jacobus gerhardus Lotter 578559';
        ul.appendChild(li);
        li = document.createElement('li');
        li.innerHTML = 'Stephanus Jacobus Mathee 578381';
        ul.appendChild(li);
        li = document.createElement('li');
        li.innerHTML = 'Tiaan De Beer 577088';
        ul.appendChild(li);
        li = document.createElement('li');
        li.innerHTML = 'Tiaan Tobias van Schalkwyk 578552';
        ul.appendChild(li);
        this.info.prepend(ul);
        break;
      default:
        break;
    }
  },

  hideInfo: function(){
    this.info.style.display = 'none'
    let fallAway = document.getElementById('fallAway');
    fallAway.style.display ='block';
    try{
      let infoList = document.getElementById('infoList');
      this.info.removeChild(infoList);
    }
    catch{
    }
  },
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
    }
  }
  console.log("projects", JSON.stringify(projects) || "[]");
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
      }
    }
  } else {
    for (let i = 0; i < projects.length; i++) {
      if (title.innerText.includes(projects[i].projName)) {
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
