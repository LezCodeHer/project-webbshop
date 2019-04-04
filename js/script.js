// index.html

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

function demoCallback(xhr) {
  const products = JSON.parse(xhr.responseText);

  let item = products.items;
  let output = "";
  for (let i = 0; i < item.length; i++) {
    output +=
      "<div id='card' class='card' style='width: 12rem;'>" +
      "<img src=" +
      item[i].bild +
      ">" +
      "<div class='card-body' style='padding: 5px !important;'>" +
      "<h5 id='title' class='card-title'>" +
      item[i].title +
      "</h5>" +
      "<p class='card-text'>" +
      item[i].beskrivning +
      "</p>" +
      "<p id='pris' class='card-text'>" +
      item[i].pris +
      "</p>" +
      "<a href='./bestallning.html' class='index btn btn-primary'><div><i class='fa fa-shopping-basket'></i></div>&nbsp;Buy</a></div></div>";
  }
  document.getElementById("container1").innerHTML = output;
  localStorage.setItem("obj", JSON.stringify(products));

  let a = document.getElementsByClassName("index");

  for (let i = 0; i < item.length; i++) {
    a[i].addEventListener("click", function(e) {
      localStorage.setItem("index", i);
    });
  }
}

// betallningar.html

let obj = localStorage.getItem("obj");
let index = localStorage.getItem("index");
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
