// Update counter val with length of string in the input box, change text color to red if over 140 chars, change back to inherited color if under 140 chars.
$('#tweet-input').on('input', function() {
  const textChars = $(this).val();
  const charCount = textChars.length;
  const counter = $(this).next().children('.counter');
  $(counter).text(140 - charCount);
  if (charCount > 140) {
    $(counter).css('color','red');
  } else {
    $(counter).css('color','inherit');
  }
});
