function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function loadProgressBar(states = ['Unresolved', 'Proccessing', 'Resolved', 'Proccessing', 'Resolved']){
  let u = document.getElementById('progressUnresolved');
  let p = document.getElementById('progressProccessing');
  let r = document.getElementById('progressResolved');

  let num1 = 0, num2 = 0, num3 = 0;

  states.forEach(element => {
    if(element === 'Unresolved')
    {
        num1+= ((1/tickets.length) * 240)/1
    }
    if(element === 'Proccessing')
    {
        num2+= ((1/tickets.length) * 240)/1
    }
    if(element === 'Resolved')
    {
        num3+= ((1/tickets.length) * 240)/1
    }
  });

  u.style.width = `${num1}px`;
  p.style.width = `${num2}px`;
  r.style.width = `${num3}px`;

}