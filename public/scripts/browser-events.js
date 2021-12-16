// Animates the compose button on hover, making it 'bounce'
$('#compose-button').hover(function() {
  $(this)
    .animate({top:"5px"},500)
    .animate({top:"0px"},500);
});
  
// On clicking the compose button, toggles the slide for the tweet input container and puts the cursor in the input area
$('#compose-button').click(function() {
  $('#tweet-box').slideToggle('fast');
  $('#tweet-input').focus();
});
  
// Scroll behaviour. Takes the top position of the window and compares it to the top position of the main container and computes the difference. If the top of the main container exceeds the top of the window then a 'back to top' button is made visible in the lower right corner
$(window).scroll(function() {
  const topOfWindow = $(window).scrollTop();
  const topOfMain = $('main').offset().top;
  const difference = topOfWindow - topOfMain;
  if (difference > 0) {
    $('#back-to-top').css('visibility', 'visible');
  } else {
    $('#back-to-top').css('visibility', 'hidden');
  }
});

// Back to top button on click scrolls back to the top of the page, slides down the tweet input form, and focuses the cursor on the input field
$("#back-to-top").click(() => {
  $('html').animate({scrollTop:0},'slow');
  $('#tweet-box').slideDown();
  $('#tweet-input').focus();
});
