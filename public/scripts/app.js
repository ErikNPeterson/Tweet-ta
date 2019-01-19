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

function likeTweet(element, tweet_id) {
  console.log(element, tweet_id) // where else can I send this tweet Id
  event.preventDefault(); // this stops the default request from happening
  $.ajax('/tweets/like', {
    method: 'POST',
    data: {
      id: tweet_id
    },
    success: (tweet) => {
      addNewTweetToPage(tweet);
    }
  });
}
















$(document).ready(function () {
  function createTweetElement(tweet) {
    const avatarImage = tweet.user.avatars.regular;
    const author = tweet.user.name;
    const handle = tweet.user.handle;
    const content = tweet.content.text;
    const timeStamp = tweet.created_at;
    const id = tweet._id;
    const likes = () => {
      if (tweet.likes === undefined) {
        return 0; // how can I get this to show up as nothing? 
      } else {
        return tweet.likes; // how can I get this to show up as a # rather than a string
      }
    }

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
       
          <i class="far fa-heart" onclick=likeTweet(this,'${id}')>'${likes()}'</i>
          
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

  //sending new tweet 
  $("#newTweetForm").submit(function (event) {
    $('.Error').slideUp(300, function () {
      $(this).remove()
    })

    event.preventDefault(); // this stops the default
    const count = parseInt($('.counter')[0].innerText);
    if (count === 140) {
      errorMessage("Please enter some content.");
    } else if (count < 0) {
      errorMessage("Your tweet is too long. Please shorten.");
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

{ /* <i class="likeCounter">'${likes()}'</i>  */ }