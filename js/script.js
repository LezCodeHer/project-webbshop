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

  // visa produkter i hemsidan
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
      "<h6 class='card-text card-content'>" +
      item[i].beskrivning +
      "</h6>" +
      "<h6 id='pris' class='card-text'>$ " +
      item[i].pris +
      "</h6>" +
      "<a href='' class='index btn btn-primary'><div><i class='fa fa-shopping-basket'></i></div>&nbsp;Buy</a></div></div>";
  }
  document.getElementById("container1").innerHTML = output1;

  // array med alla länkar
  let a = document.getElementsByClassName("index");

  /* for loop som går igenom alla länkar (knappar) i varje produkt (objekt) 
  i json filen för att sedan spara de i local storage */
  for (let i = 0; i < item.length; i++) {
    a[i].addEventListener("click", function() {
      localStorage.setItem("orderItem" + i, JSON.stringify(item[i]));
      antalProdukter();
    });
  }
}

// overlay on off

function overlayOnOff() {
  if (document.getElementById("overlay").style.display === "block") {
    document.getElementById("overlay").style.display = "none";
  } else {
    document.getElementById("overlay").style.display = "block";
  }
}

function off() {
  if (document.getElementById("overlay").style.display === "block") {
    document.getElementById("overlay").style.display = "none";
  }
}

//-------------------------------------------

$(document).ready(function() {
  if (localStorage.length === 0) {
    $(".clear-ls")
      .css("display", "none")
      .after("<span style='font-size:20px;'>Din varukorg är tom</span>");
    $(".check-out").css("display", "none");
    $(".cart-title").css("display", "none");
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
        "<td style='transform: unset;'><img src=" +
        bild +
        "></td>" +
        "<td><h6 class='title-varukorg' style='margin:0;'>" +
        title +
        "</h6></td>" +
        `<td><a href='#' class="total style-buttons" id="minus` +
        `${key}` +
        `">&minus;</a><span class="antal style-buttons" id="antal` +
        `${key}` +
        `">` +
        antal +
        `</span><a href='#' class="total style-buttons" id="plus` +
        `${key}` +
        `">+</a></td><td><span id="tprice` +
        `${key}` +
        `">$ ` +
        totalPris +
        `</span></td><td style='transform: unset;'><a class='delete' id='delete-product` +
        `${key}` +
        `'><i style='margin-top: 10px;' id="trash-icon" class="fa fa-trash-o"></i></a></td>`;

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
        antalProdukter();
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
        antalProdukter();
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
            .after("<span style='font-size:20px;'>Din varukorg är tom</span>");

          $("#total-pris").css("display", "none");
          $(".check-out").css("display", "none");
          $(".cart-title").css("display", "none");
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
    // delete alla produkter
    $(".clear-ls").on("click", function() {
      $(".table").remove();
      localStorage.clear();

      $(this)
        .css("display", "none")
        .after("<span style='font-size:20px;'>Din varukorg är tom</span>");
      $("#total-pris").css("display", "none");
      $(".check-out").css("display", "none");
      $(".cart-title").css("display", "none");

      antalProdukter();
    });

    $("#submit-btn").on("click", function() {
      $("#form").remove();
      localStorage.clear();
      $(".clear-ls").css("display", "none");
      $("footer").css("margin-top", "180px");
      $("td").css("border", "none");
      $(".total").css("display", "none");
      $(".delete").css("display", "none");
      $(".order-style-rubrik").css("display", "none");
      $("#total-pris").css("margin", "0 44%");
      $("#order-style-rubrik1")
        .css("display", "none")
        .after(
          "<span style='font-size: 22px; margin: 3px;'>Thank you for your purchase. <br />Your order will be delivered shortly.</span>"
        );

      $(this).css("display", "none");
    });
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
    document.getElementById("total-pris").innerHTML =
      "Total Price: &nbsp;&nbsp;$ " + nyTotalPris;
  }

  total();

  // beräkna total pris när man raderar en objekt på pris att betala
  $(".delete").on("click", function() {
    total();
    antalProdukter();
  });

  // beräkna antal produkter i varukorgen
  function antalProdukter() {
    let antal = 0;
    let x;
    Object.keys(localStorage).forEach(function(key) {
      let obj3 = JSON.parse(localStorage.getItem(`${key}`));
      x = parseInt(obj3.antal);
      antal += x;
    });
    document.getElementById("antal-produkter").innerHTML = antal;
  }

  antalProdukter();
});
