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
  let output1 = "";
  for (let i = 0; i < item.length; i++) {
    output1 +=
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
  document.getElementById("container1").innerHTML = output1;

  let a = document.getElementsByClassName("index");
  // let orderItem = [];

  for (let i = 0; i < item.length; i++) {
    a[i].addEventListener("click", function() {
      // orderItem.push(item[i]);
      localStorage.setItem("orderItem"+i, JSON.stringify(item[i]));
    });
  }
}


