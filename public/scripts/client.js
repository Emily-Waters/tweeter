// Character limit for 'tweets' and targets
const charLimit       = 140;
const $tweetDisp      = $("#tweet-container");
const $tweetInput     = $('#tweet-input');
const $tweetForm      = $('.tweet-form');
const $tweetButton    = $('#tweet-button');
const $counter        = $('#counter');
const $tweetBox       = $('#tweet-box');
const $compose        = $('#compose-button');
const $toTop          = $('#back-to-top');
const $errMsg         = $('#error-message');
const $window         = $(window);
const $mainContainer  = $('main');
const $page           = $('html');

$(document).ready(function() {
  loadTweets();
});