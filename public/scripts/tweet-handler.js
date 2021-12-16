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