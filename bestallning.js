$(document).ready(function() {
  getRandomUser();

  $(".btn").on("click", "a", function(e) {
    e.preventDefault();
    getProductBestallning();
  });
}); // ready

// En funktion som hämtar en random user från https://randomuser.me/api
function getProductBestallning() {
  jQuery.ajax({
    url: "products.html",
    dataType: "json",
    success: function(data) {
      showProduct(data.results[0]);
    }
  });
}

// En funktion som visar en user i en Bootstrap-Card
function showProduct(product) {
  $("#contact").attr("href", "mailto:" + product.email);
}
