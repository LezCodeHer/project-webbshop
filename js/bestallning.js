// betallningar.html

$(document).ready(function() {
  if (localStorage.length === 0) {
    $(".clear-ls").css("display", "none");
  } else {
    const table = document.getElementById("table");

    Object.keys(localStorage).forEach(function(key) {
      let obj = JSON.parse(localStorage.getItem(`${key}`));

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

      $(".delete").on("click", function() {
        localStorage.removeItem(`orderItem${key}`);
        $(this)
          .parents("tr")
          .remove();
        localStorage.removeItem(key);
        if (localStorage.length === 0) {
          $(".clear-ls").css("display", "none");
        }
      });
      $(".clear-ls").on("click", function() {
        $(this).remove();
        $("#table").remove();
        localStorage.clear();
        if (localStorage.length === 0) {
          $(".clear-ls").css("display", "none");
        }
      });
    });
    function tableMaker(obj) {
      const tr = document.createElement("tr");

      tr.innerHTML = obj;
      table.appendChild(tr);
    }
  }
});

// for (let i = 0; i < localStorage.length; i++) {
//   // let index = localStorage.key(i);
//   // itemsArray.push(index);
//   let obj = JSON.parse(localStorage.getItem(localStorage.key(i)));

//   let bild = obj.bild;
//   let title = obj.title;
//   let beskrivning = obj.beskrivning;
//   let pris = obj.pris;

//   let output2 =
//     "<td><img src=" +
//     bild +
//     "></td>" +
//     "<td><h3>" +
//     title +
//     "</h3></td>" +
//     "<td><p>" +
//     beskrivning +
//     "</p></td><td><h6>" +
//     pris +
//     "</h6></td><td><button class='delete' id='delete-item-key" +
//     `${i}` +
//     "'>Ta bort</button></td>";

//   tableMaker(output2);
//   $(document).ready(function() {
//     $(`#delete-item-key${i}`).on("click", function() {
//       // let k = localStorage.getItem(localStorage.key(i));
//       console.log(localStorage.key(i));
//       localStorage.removeItem(`orderItem${i}`);
//       // console.log(k);
//       $(this)
//         .parents("tr")
//         .remove();
//       // console.log(localStorage.key(this));
//     });
//   });
// }
