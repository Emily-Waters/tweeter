// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */
$(document).ready(function() {

  const form = $('.tweet-form');

  form.submit(function(event) {
    const text = ($(this).serialize());
    const target = event.currentTarget.action;
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: target,
      data: text
    });
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
      $('#tweet-container').append($tweet);
    }
  };

  const loadTweets = function() {
    const tweetData = $.ajax({
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




