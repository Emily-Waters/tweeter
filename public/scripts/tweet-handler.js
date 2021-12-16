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
        location.reload();
      }
    });
  } else {
    tweetError(length, charLimit);
  }
});

$('.tweet-form').keypress(function(e) {
  if (e.which === 13) {
    $('#tweet-button').submit();
    return false;
  }
});


const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  }
};

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


