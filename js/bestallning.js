// betallningar.html

$(document).ready(function() {
  if (localStorage.length === 0) {
    $(".clear-ls")
      .css("display", "none")
      .after("<span>Din varukorg är tom</span>");

    $("#total-pris").css("display", "none");
  } else {
    const table = document.getElementsByClassName("table");
    // let nyTotalPris = 0;

    Object.keys(localStorage).forEach(function(key) {
      // läggs till produkter till varukorgen

      let obj = JSON.parse(localStorage.getItem(`${key}`));

      let bild = obj.bild;
      let title = obj.title;
      let pris = obj.pris;
      let antal = obj.antal;
      let totalPris = obj.totalPris;

      let output2 =
        "<td><img src=" +
        bild +
        "></td>" +
        "<td><h3>" +
        title +
        "</h3></td>" +
        `<td><a href='#' type="button" class="total"` +
        `${key}` +
        `" value="-">-</a><span class="antal" id="antal` +
        `${key}` +
        `">` +
        antal +
        `</span><a href='#' type="button" class="total" id="plus` +
        `${key}` +
        `">+</a></td><span id="tprice` +
        `${key}` +
        `">` +
        totalPris +
        `</span><td><a class='delete' id='delete-product` +
        `${key}` +
        `'><i id="trash-icon" class="fa fa-trash-o"></i></button></td>`;

      tableMaker(output2);

      // köpa flera produkter av samma sort och beräkna pris

      $(`#plus${key}`).on("click", function() {
        x = document.getElementById(`antal${key}`).innerHTML;
        x = ++x;
        document.getElementById(`antal${key}`).innerHTML = x;
        document.getElementById(`tprice${key}`).innerHTML =
          "$ " + totalAktuellProdukt(x);
        obj.antal = x;
        localStorage.setItem(`${key}`, JSON.stringify(obj));
      });
      $(`#minus${key}`).on("click", function() {
        x = document.getElementById(`antal${key}`).innerHTML;
        x = --x;
        if (x >= 1) {
          document.getElementById(`antal${key}`).innerHTML = x;
          document.getElementById(`tprice${key}`).innerHTML =
            "$ " + totalAktuellProdukt(x);
          obj.antal = x;
          localStorage.setItem(`${key}`, JSON.stringify(obj));
        }
      });

      function totalAktuellProdukt(antal) {
        let tprice = antal * pris;
        obj.totalPris = tprice;
        return tprice;
      }

      // beräkna total pris

      // $(`#plus${key}, #minus${key}, #delete-product${key}`).on(
      //   "click",
      //   function() {
      //     // Object.keys(localStorage).forEach(function(key) {
      //     //   let obj2 = JSON.parse(localStorage.getItem(`${key}`));
      //     //   obj2.totalPris += obj2.totalPris;
      //     //   console.log(obj2.totalPris);
      //     // });

      //     totalPris = parseInt(obj.totalPris);
      //     nyTotalPris += totalPris;
      //     document.getElementById("total-pris").innerHTML = nyTotalPris;
      //   }
      // );

      // totalPris = parseInt(obj.totalPris);
      // nyTotalPris += totalPris;
      // document.getElementById("total-pris").innerHTML = nyTotalPris;

      // function total() {
      //   totalPris = parseInt(obj.totalPris);
      //   totalPris += totalPris;
      //   document.getElementById("total-pris").innerHTML = totalPris;
      // }
      // total();

      // delete produkter (en i taget)

      $(`#delete-product${key}`).on("click", function() {
        localStorage.removeItem(`orderItem${key}`);
        $(this)
          .parents("tr")
          .remove();
        localStorage.removeItem(key);
        if (localStorage.length === 0) {
          $(".clear-ls")
            .css("display", "none")
            .after("<span>Din varukorg är tom</span>");

          $("#total-pris").css("display", "none");
        }
      });
    });

    // funktionen tableMaker lägger till rader med olika produkter till varukorgen och beställning sida

    function tableMaker(obj) {
      const tr = document.createElement("tr");

      for (let i = 0; i < table.length; i++) {
        tr.innerHTML = obj;
        table[i].appendChild(tr);
      }
    }
  }

  // delete alla produkter

  $(".clear-ls").on("click", function() {
    $(".table").remove();
    localStorage.clear();

    $(this)
      .css("display", "none")
      .after("<span>Din varukorg är tom</span>");

    $("#total-pris").css("display", "none");
  });
});
