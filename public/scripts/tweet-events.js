// Prevents default POST behaviour, validates the tweet contents and makes an ajax request, then fades out the tweets, prepends the newest tweet, clears the input field, resets the counter, then fades back in. Tweets are checked for errors everytime because no error present will reset the error message.
$tweetForm.submit((event) => {
  event.preventDefault();
  const length = tweetLength($tweetInput);
  const tweetData = $tweetInput.serialize();
  const targetURL = event.currentTarget.action;
  if (tweetValidate(length)) {
    $.post(targetURL, tweetData)
      .done(() => {
        $.get("/tweets")
          .done((data) => {
            const $newTweet = createTweetElement(data[data.length - 1]);
            $tweetDisp
              .fadeOut(50)
              .prepend($newTweet)
              .fadeIn(100);
            $tweetForm.trigger("reset");
            $counter.text(charLimit);
            $tweetInput.focus();
          });
      });
  }
  buttonBounce();
  tweetError(length);
});
// Detects the 'enter' key being pressed in the tweet input form and submits the form instead of starting a new line
$tweetForm.keypress((event) => {
  if (event.which === 13) {
    console.log("Enter!");
    $tweetButton.click();
    return false;
  }
});