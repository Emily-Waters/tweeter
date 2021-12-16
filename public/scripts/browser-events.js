// Animates the compose button on hover, making it 'bounce'
$compose.hover(function() {
  $(this)
    .animate({top:"5px"},500)
    .animate({top:"0px"},500);
});
// On clicking the compose button, toggles the slide for the tweet input container and puts the cursor in the input area
$compose.click(function() {
  $tweetBox .slideToggle('fast');
  $tweetInput.focus();
});
// Scroll behaviour. Takes the top position of the window and compares it to the top position of the main container and computes the difference. If the top of the main container exceeds the top of the window then a 'back to top' button is made visible in the lower right corner
$(window).scroll(function() {
  const topOfWindow = $(this).scrollTop();
  const topOfMain = $('main').offset().top;
  const difference = topOfWindow - topOfMain;
  if (difference > 0) {
    $toTop.css('visibility', 'visible');
  } else {
    $toTop.css('visibility', 'hidden');
  }
});
// Back to top button on click scrolls back to the top of the page, slides down the tweet input form, and focuses the cursor on the input field
$toTop.click(() => {
  $('html').animate({scrollTop:0},'slow');
  $tweetBox .slideDown();
  $tweetInput.focus();
});
