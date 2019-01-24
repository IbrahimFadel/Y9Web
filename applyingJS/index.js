var people = [
  {
    name: "Joe",
    age: 25
  },
  {
    name: "Bill",
    age: 30
  }
];
var iterations = 2;

let renderDiv = document.getElementById("renderObjects");

for (let i = 0; i < people.length; i++) {
  let newDiv = document.createElement("div");
  let h1 = document.createElement("h1");
  let button = document.createElement("button");
  h1.innerHTML = people[i].name;
  let p = document.createElement("p");
  p.innerHTML = people[i].age;
  button.innerHTML = "Delete";

  h1.classList.add("name");
  p.classList.add("age");
  button.classList.add("button");

  button.onclick = function() {
    let div = this.parentElement;
    div.remove();
  };

  newDiv.appendChild(h1);
  newDiv.appendChild(p);
  newDiv.appendChild(button);

  newDiv.classList.add("container");

  renderDiv.appendChild(newDiv);
}

function displayForm() {
  document.getElementById("form").style.display = "block";
}

function addPerson() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;

  people.push({
    name: name,
    age: age
  });

  renderNewPerson();

  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
}

function renderNewPerson() {
  for (let i = iterations; i < people.length; i++) {
    let newDiv = document.createElement("div");
    let h1 = document.createElement("h1");
    let button = document.createElement("button");
    h1.innerHTML = people[i].name;
    let p = document.createElement("p");
    p.innerHTML = people[i].age;
    button.innerHTML = "Delete";
    let hi = "hi";
    button.onclick = function() {
      let div = this.parentElement;
      div.remove();
    };

    h1.classList.add("name");
    p.classList.add("age");
    button.classList.add("button");

    newDiv.appendChild(h1);
    newDiv.appendChild(p);
    newDiv.appendChild(button);

    newDiv.classList.add("container");

    renderDiv.appendChild(newDiv);
  }
  iterations++;
}
