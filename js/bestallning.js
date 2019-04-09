// betallningar.html

$(document).ready(function() {
  if (localStorage.length === 0) {
    $(".clear-ls")
      .css("display", "none")
      .after("<span>Din varukorg är tom</span>");

    $("#total-pris").css("display", "none");
  } else {
    const table = document.getElementsByClassName("table");

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
        `<td><a href='#' type="button" class="total" id="minus` +
        `${key}` +
        `">-</a><span class="antal" id="antal` +
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

      // anropar funktionen tableMaker som skapar rader och för varje vald produkt
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

        //anropar funktionen total() som beräknar total pris när man ändrar antal produkter
        total();
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

        //anropar funktionen total() som beräknar total pris när man ändrar antal produkter
        total();
      });

      // beräkna total pris för bara en produkt
      function totalAktuellProdukt(antal) {
        let tprice = antal * pris;
        obj.totalPris = tprice;
        return tprice;
      }

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

  // beräkna total pris att betala
  function total() {
    let nyTotalPris = 0;
    let x;
    Object.keys(localStorage).forEach(function(key) {
      let obj2 = JSON.parse(localStorage.getItem(`${key}`));
      x = parseInt(obj2.totalPris);
      nyTotalPris += x;
    });
    document.getElementById("total-pris").innerHTML = nyTotalPris;
  }

  total();

  // beräkna total pris när man raderar en objekt på pris att betala
  $(".delete").on("click", function() {
    total();
  });

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
