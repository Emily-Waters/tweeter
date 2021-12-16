// Update counter val with length of string in the input box, change text color to red if over 140 chars, change back to inherited color if under 140 chars.
$tweetInput.on('input', () => {
  // const textChars = $(this).val();
  const charCount = tweetLength($tweetInput);
  $counter.text(140 - charCount);
  if (charCount > 140) {
    $counter.css('color','red');
  } else {
    $counter.css('color','inherit');
  }
});
