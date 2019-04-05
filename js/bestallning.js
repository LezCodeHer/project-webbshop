// betallningar.html

const ul = document.getElementById("list");
let itemsArray = [];

for (let i = 0; i < localStorage.length; i++) {
  let index = localStorage.key(i);
  itemsArray.push(index);
  let obj = JSON.parse(localStorage.getItem(itemsArray[i]));

  let bild = obj.bild;
  let title = obj.title;
  let beskrivning = obj.beskrivning;
  let pris = obj.pris;

  let output2 =
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

    liMaker(output2);

}

function liMaker(obj){
  const li = document.createElement("li");

  li.innerHTML = obj;
  ul.appendChild(li);
}

// let obj = localStorage.getItem("obj");
// let index = localStorage.getItem("index");
// let bild = JSON.parse(obj).items[index].bild;
// let title = JSON.parse(obj).items[index].title;
// let beskrivning = JSON.parse(obj).items[index].beskrivning;
// let pris = JSON.parse(obj).items[index].pris;

// let output =
//   "<tr><td><img src=" +
//   bild +
//   "></td>" +
//   "<td><h3>" +
//   title +
//   "</h3></td>" +
//   "<td><p>" +
//   beskrivning +
//   "</p></td><td><h6>" +
//   pris +
//   "</h6></td></tr>";

// $(document).ready(function() {
//   $("#container2").append(output);
// });