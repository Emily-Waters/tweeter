$(document).ready(function() {
  // Hardcoded char limit, can be adjusted
  const charLimit = 140;
  const form = $('.tweet-form');


  // Returns the length of text entered into the tweet form input
  const tweetLength = (tweet) => {
    return tweet.val().length;
  };

  // Returns the text entered into the tweet form input
  const tweetText = (tweet) => {
    return tweet.val();
  };

  // Validates the length of a tweet (not empty, below char limit)
  const tweetValidate = (tweetLength, limit) => {
    if (!tweetLength || tweetLength > limit) {
      return false;
    }
    return true;
  };

  const tweetError = (tweetLength, limit) => {
    if (!tweetLength) {
      return 'Tweets can\'t be empty';
    } else {
      return `Your tweet is ${tweetLength - limit} character(s) over the limit.`;
    }
  };

  form.submit(function(event) {
    event.preventDefault();
    const tweet = $('#tweet-input');
    const length = tweetLength(tweet);
    const tweetData = ($(this).serialize());
    const targetURL = event.currentTarget.action;
    if (tweetValidate(length, charLimit)) {
      $.ajax({
        type: "POST",
        url: targetURL,
        data: tweetData,
        success: () => {
          location.reload();
        }
      });
    } else {
      alert(tweetError(length, charLimit));
    }
  });

  const createTweetElement = function(data) {
    return `<article class="tweet">
  <header class="header">
    <div><img src=${data.user.avatars}>${data.user.name}</div>
    <div class="handle">${data.user.handle}</div>
  </header>
  <div class="tweet-text">${data.content.text}</div>
  <footer class="tweet-footer small">
    <line>${timeago.format(data.created_at)}</line>
    <div>
      <button class="tweet-butt"><i class="fas fa-flag"></i></button>
      <button class="tweet-butt"><i class="fas fa-retweet"></i></button>
      <button class="tweet-butt"><i class="fas fa-heart"></i></button>
    </div>
  </footer>
</article>`;
  };
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
      success: function(data) {
        renderTweets(data);
      }
    });
  };

  loadTweets();
  
});




