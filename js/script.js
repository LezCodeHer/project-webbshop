function load(url, cb) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      cb(this);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

load("./products.json", demoCallback);

function demoCallback(x) {
  const products = JSON.parse(x.responseText);

  let items = products.items;
  let output = "";
  let i;
  for (i = 0; i < items.length; i++) {
    output +=
      "<div id='card' class='card' style='width: 16rem;'>" +
      "<img src=" +
      items[i].bild +
      ">" +
      "<div class='card-body'>" +
      "<h5 id='title' class='card-title'>" +
      items[i].title +
      "</h5>" +
      "<p class='card-text'>" +
      items[i].beskrivning +
      "</p>" +
      "<p id='pris' class='card-text'>" +
      items[i].pris +
      "</p>" +
      `<a href='./bestallning.html' id='btn' class='btn btn-primary'>Köp</a></div></div>`;
  }
  document.getElementById("container").innerHTML = output;
  localStorage.setItem("obj", JSON.stringify(products));

  let a = document.getElementsByClassName("btn");

  for (let i = 0; i < items.length; i++) {
    a[i].addEventListener("click", function() {
      localStorage.setItem("index", i);
    });
  }
}

//---------------------------------------------------------------

let obj = localStorage.getItem("obj");
let index = localStorage.getItem(`index`);
let bild = JSON.parse(obj).items[index].bild;
let title = JSON.parse(obj).items[index].title;
let beskrivning = JSON.parse(obj).items[index].beskrivning;
let pris = JSON.parse(obj).items[index].pris;

let output =
  "<tr><td><img src=" +
  bild +
  "></td>" +
  "<td><h3>" +
  title +
  "</h3></td>" +
  "<td><p>" +
  beskrivning +
  "</p></td><td><h6>" +
  pris +
  "</h6></td></tr>";

$(document).ready(function() {
  $("#container2").append(output);
});
