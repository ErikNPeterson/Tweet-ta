/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


$(document).ready(function () {
  function createTweetElement(tweet) {
    const avatarImage = tweet.user.avatars.regular;
    const author = tweet.user.name;
    const handle = tweet.user.handle;
    const content = tweet.content.text;
    const timeStamp = tweet.created_at;

    const newTweet =
      `<article class="tweet">
    <header>
        <img class="avatar" src="${avatarImage}"> 
      <h2 class="author">${author}</h2>
          <span class="handle">${handle}</span>
    </header>
    <div>
          ${escape(content)}
    </div>
    <footer>
          <span>${daysSince(timeStamp)}</span>
          <i class="far fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
    </footer>
  </article>`;

    return newTweet

  }

  function daysSince(stamp) {
    // const age = Date.now() - new Date(timeStamp).getDay();
    const timeSincePost = Date.now() - stamp;
    const days = Math.floor((timeSincePost / 1000) / 86400);
    return `${days} days since post`
  }

  function renderTweets(arrayOfTweets) {
    arrayOfTweets = arrayOfTweets.reverse();
    arrayOfTweets.forEach(tweet => {
      $('.tweetContainer').append(createTweetElement(tweet));
    });
  }

  function addNewTweetToPage(tweet) {
    $('.tweetContainer').prepend(createTweetElement(tweet));
  }

  // renderTweets(data);

  //sending new tweet 
  // this will need to be fixed to not except a string of spaces.
  $("#newTweetForm").submit(function (event) {

    $('.Error').slideUp(300, function () {
      $(this).remove()
    })

    event.preventDefault();
    const count = parseInt($('.counter')[0].innerText);
    if (count === 140) {
      // add in a 
      errorMessage("Please enter some content."); // here
    } else if (count < 0) {
      // add in a 
      errorMessage("Your tweet is too long. Please shorten."); //here
    } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: escape($(this).serialize()),
        success: (tweet) => {
          addNewTweetToPage(tweet);
        }
      });
    }

  });

  function loadTweets() {
    $.ajax('/tweets', {
        method: 'GET'
      })
      .then(renderTweets);
    // .then is a function .then passes whatever .ajax returns to the function that you 
  }

  loadTweets();

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $("#composeButton").click(function () {
    $(".new-tweet").slideToggle("200", function () {

    });
    $('#newTweetForm textarea').focus();
  });




  function errorMessage(errorString) {
    const Error = errorString;

    const errorHTML =
      `<article class="Error">
    <header>
    <i class="fas fa-exclamation-triangle"></i>
      <h2 class="author">ERROR</h2>
    </header>
    <div>
          ${Error}
    </div>
    <footer>
    <button id="close"><i class="far fa-window-close"></i>  Close</button>
    </footer>
  </article>`;


    $('.Error').remove();
    $('.container .new-tweet').append(errorHTML);
    $('.Error').slideDown(300, function () {
      $(this).css('display', 'flow-root')
    });


  }

  $(".new-tweet").on('click', '#close', function () {
    $('.Error').slideUp(300, function () {
      $(this).remove()
    })
  });


});













// const data = [{
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "name": "Johann von Goethe",
//     "user": {
//       "avatars": {
//         "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];