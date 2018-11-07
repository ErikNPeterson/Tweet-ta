/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
          ${content}
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

  // Math.abs(new Date(Date.now()).getDate() - new Date(stamp).getDate())

  const data = [{
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function renderTweets(arrayOfTweets) {
    arrayOfTweets.forEach(tweet => {
      $('.container').append(createTweetElement(tweet));
    });
  }

  renderTweets(data);
})