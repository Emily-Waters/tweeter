$(document).ready(function() {

  // Update counter val with length of string in the input box, change text color to red if over 140 chars
  $('#tweet-input').on('input', function() {
    const textChars = $(this).val();
    const charCount = textChars.length;
    $(this).next().children('.counter').text(140 - charCount);
    if (charCount > 140) {
      $(this).css('color','red');
    } else {
      $(this).css('color','inherit');
    }
  });

  // const tweets = $.ajax({
  //   url: '/tweets'
  // });
  // console.log(tweets);


});