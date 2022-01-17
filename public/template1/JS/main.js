$(document).ready(function () {
  // $("#start-modal").modal("toggle");
  // detect scroll top or down
  if ($(".smart-scroll").length > 0) {
    // check if element exists
    var last_scroll_top = 0;
    $(window).on("scroll", function () {
      scroll_top = $(this).scrollTop();
      if (scroll_top < last_scroll_top) {
        $(".smart-scroll").removeClass("scrolled-down").addClass("scrolled-up");
      } else {
        $(".smart-scroll").removeClass("scrolled-up").addClass("scrolled-down");
      }
      last_scroll_top = scroll_top;
    });
  }
});

var container = document.querySelector("#capture"); // full page
html2canvas(container).then(function (canvas) {
  var link = document.querySelector("#download-card");
  link.download = "undangan.png";
  link.href = canvas.toDataURL("image/png");
});

$(".btn-plus, .btn-minus").on("click", function (e) {
  const isNegative = $(e.target).closest(".btn-minus").is(".btn-minus");
  const input = $(e.target).closest(".input-group").find("input");
  if (input.is("input")) {
    input[0][isNegative ? "stepDown" : "stepUp"]();
  }
});

$(window).scroll(function () {
  if ($(document).scrollTop() > 50) {
    $("nav").addClass("bg-white");
    $(".nav-link").addClass("txt-brown");
  } else {
    $("nav").removeClass("bg-white");
    $(".nav-link").removeClass("txt-brown");
  }
});
