console.log("hello WOrld! from char counter");


$(document).ready(function () {
  $("textarea").on("keyup", (event) => {
    let lengthOfText = event.target.textLength;
    const maxCounter = 140;
    let reduceCounter = maxCounter - lengthOfText;
    if (reduceCounter <= 0) {
      $(".counter")[0].style.color = "red";
      $(".counter")[0].style.fontWeight = "bold";
    } else {
      $(".counter")[0].style.color = "";
      $(".counter")[0].style.fontWeight = "";
    }
    $(".counter")[0].innerText = reduceCounter;
  });

});