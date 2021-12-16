// Returns the length of text entered into the tweet form input
const tweetLength = (tweet) => {
  return tweet.val().length;
};
// Validates the length of a tweet (not empty, below char limit)
const tweetValidate = (tweetLength) => {
  if (!tweetLength || tweetLength > charLimit) {
    return false;
  }
  return true;
};
// Toggles the display of the error message with a fade in animation, starts with a fadeout promise so that the error message disappears before changing the text and re-rendering the updated error message
const tweetError = (tweetLength) => {
  const $errMsg = $('#error-message');
  $errMsg.animate({ opacity: 0 }, 200, () => {
    if (!tweetLength) {
      $errMsg.children('line').text("Tweets can't be empty");
      $errMsg.animate({ opacity: 1 }, 500);
    } else if (tweetLength > charLimit) {
      $errMsg.children('line').text(`Tweets need to be less than ${charLimit} characters`);
      $errMsg.animate({ opacity: 1 }, 500);
    }
  });
};
// Prevents default POST behaviour, validates the tweet contents and makes an ajax request, then fades out the tweets, empties and updates them, clears the input field, resets the counter, then fades back in. Tweets are checked for errors everytime because no error present will reset the error message.
$tweetForm.submit(function(event) {
  event.preventDefault();
  const length = tweetLength($tweetInput);
  const tweetData = $tweetInput.serialize();
  const targetURL = event.currentTarget.action;
  if (tweetValidate(length)) {
    $.post(targetURL, tweetData, () => {
    })
      .done(() => {
        $tweetDisp.fadeOut(200, () => {
          $tweetForm.trigger("reset");
          $counter.text(charLimit);
          $tweetInput.focus();
          $tweetDisp.empty();
          loadTweets();
        }).fadeIn(500);
      })
      .fail(() => {
        alert('Uh Oh! Something went wrong!');
      });
  }
  tweetError(length);
});
// Detects the 'enter' key being pressed in the tweet input form and submits the form instead of starting a new line
$tweetForm.keypress(function(e) {
  if (e.which === 13) {
    $tweetButton .submit();
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
  const convertDate = timeago.format(data.created_at);
  return `
  <article class="tweet">
    <header class="header">
      <div><img src=${data.user.avatars}>${data.user.name}</div>
      <div class="handle">${data.user.handle}</div>
    </header>
    <div class="tweet-text">${safeHTML}</div>
    <footer class="tweet-footer small">
      <line>${convertDate}</line>
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
    let $singleTweet = createTweetElement(tweet);
    $tweetDisp.append($singleTweet);
  }
};
// Retrieves tweet data using an ajax GET request, and upon success, sorts the tweets by the date they were created and feeds them into renderTweets
const loadTweets = function() {
  $.get("/tweets", (data) => {
    data.sort((a,b) => {
      return b.created_at - a.created_at;
    });
    renderTweets(data);
  });
};
