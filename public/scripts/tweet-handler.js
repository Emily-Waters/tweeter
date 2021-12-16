// Character limit for 'tweets'
const charLimit = 140;
// Returns the length of text entered into the tweet form input
const tweetLength = (tweet) => {
  return tweet.val().length;
};
// Validates the length of a tweet (not empty, below char limit)
const tweetValidate = (tweetLength, limit) => {
  if (!tweetLength || tweetLength > limit) {
    return false;
  }
  return true;
};
// Toggles the display of the error message with a fade in animation, starts with a fadeout promise so that the error message disappears before changing the text and re-rendering the updated error message
const tweetError = (tweetLength, limit) => {
  const error = $('#error-message');
  error.animate({ opacity: 0 }, 200, () => {
    if (!tweetLength) {
      error.children('line').text("Tweets can't be empty");
      error.animate({ opacity: 1 }, 500);
    } else {
      error.children('line').text(`Tweets need to be less than ${limit} characters`);
      error.animate({ opacity: 1 }, 500);
    }
  });
};
// Prevents default POST behaviour, validates the tweet contents and makes an ajax request, or displays the appropriate error message.
$('.tweet-form').submit(function(event) {
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
        $("#tweet-container").empty();
        loadTweets();
      }
    });
  } else {
    tweetError(length, charLimit);
  }
});
// Detects the 'enter' key being pressed in the tweet input form and submits the form instead of starting a new line
$('.tweet-form').keypress(function(e) {
  if (e.which === 13) {
    $('#tweet-button').submit();
    return false;
  }
});
// XXS protection (code borrowed from LHL). Takes user input, creates a div tag, wraps the user input in that div and returns the inner text as an html encoded string
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// 'escapes' html characters to prevent XXS attacks, and populates an html article (tweet)
const createTweetElement = function(data) {
  const safeHTML = `<p>${escape(data.content.text)}</p>`;
  return `
  <article class="tweet">
    <header class="header">
      <div><img src=${data.user.avatars}>${data.user.name}</div>
      <div class="handle">${data.user.handle}</div>
    </header>
    <div class="tweet-text">${safeHTML}</div>
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
// Appends tweet html to the main tweet container
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  }
};
// Retrieves tweet data using an ajax GET request, and upon success, sorts the tweets by the date they were created and feeds them into renderTweets
const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: "json",
    success: function(data) {
      data.sort((a,b) => {
        return b.created_at - a.created_at;
      });
      renderTweets(data);
    }
  });
};


