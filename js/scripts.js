$('.carousel').carousel({
  interval: 2000
})


/* jquery.tweet */
jQuery(function($){
  $("#tweet").tweet({
    username: "nunoveloso",
    page: 1,
    avatar_size: 32,
    count: 1,
    loading_text: "loading ..."
  }).bind("loaded", function() {
    var ul = $(this).find(".tweet_list");
    var ticker = function() {
      setTimeout(function() {
        ul.find('li:first').animate( {marginTop: '-4em'}, 500, function() {
          $(this).detach().appendTo(ul).removeAttr('style');
        });
        ticker();
      }, 5000);
    };
    ticker();
  }).hide();
});


$('#twitter-url').popover({
  placement: 'right',
  content: function() {
    return $("#tweet").html();
  }
});

