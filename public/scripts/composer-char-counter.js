console.log("hello WOrld! from char counter");

// .new-tweet textarea {
//   width: 100%;
// }

$(document).ready(function () {
  $("textarea").on("keyup", (event) => {
    let lengthOfText = event.target.textLength;
    const maxCounter = 140;
    let reduceCounter = maxCounter - lengthOfText;
    if (reduceCounter <= 0) {
      $(".counter")[0].style.color = "red";
    } else {
      $(".counter")[0].style.color = "";
    }
    $(".counter")[0].innerText = reduceCounter;
  });

});