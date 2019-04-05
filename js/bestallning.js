// betallningar.html

const table = document.getElementById("table");
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
    "<td><img src=" +
    bild +
    "></td>" +
    "<td><h3>" +
    title +
    "</h3></td>" +
    "<td><p>" +
    beskrivning +
    "</p></td><td><h6>" +
    pris +
    "</h6></td><td><button class='delete'>Ta bort</button></td>";

  tableMaker(output2);

  $(document).ready(function() {    
    $(".delete").on("click", function() {
      $(this)
        .parents("tr")
        .remove();
      localStorage.removeItem(`orderItem${i}`);
    });
  });
}

function tableMaker(obj) {
  const tr = document.createElement("tr");

  tr.innerHTML = obj;
  table.appendChild(tr);
}

$(document).ready(function() {
  $("#clear-ls").on("click", function() {
    $(this).remove();
    $("#table").remove();
    localStorage.clear();
  });
});
