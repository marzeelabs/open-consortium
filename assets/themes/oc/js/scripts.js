$('.carousel').carousel({
  interval: 2000
})


/* jquery.tweet */
jQuery(function($){
  $("#tweet").tweet({
    username: "openconsortium",
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
  
  // $(".tweet-blog").tweet({
  //     username: "vmische",
  //     join_text: "auto",
  //     avatar_size: 32,
  //     count: 3,
  //     // auto_join_text_default: "we said,", 
  //     // auto_join_text_ed: "we",
  //     // auto_join_text_ing: "we were",
  //     // auto_join_text_reply: "we replied to",
  //     // auto_join_text_url: "we were checking out",
  //     auto_join_text_url: "",
  //     loading_text: "loading tweets..."
  // });  
  
  // Get a count for the retweets
  // Trick from http://ottopress.com/2010/twitters-new-tweet-button-and-the-count-api/
  url = 'http://drupal.org/node/1599108';  
  // url = 'http://ottopress.com/2010/twitters-new-tweet-button-and-the-count-api/';

  $.getJSON(
  	'http://urls.api.twitter.com/1/urls/count.json?url=' + url + '&callback=?', 
  	function (data) {
  		// do something to do what you want with data.count here
  		$(".tweet-count").text(data.count);
      // console.log("Retweets: " + data.count);
  	}
  );
  
  
  
  // This will unfortunately search only tweets from the past 7-9 days or so
  // (depending mainly on Twitter's load, which is completely unpredictable)
  // @todo find a more permanent solution, we should probably build our own
  // database of tweets linking to our posts, e.g. using node and mongodb :)
  // https://dev.twitter.com/docs/api/1/get/search
  $.ajax({
      url: 'http://search.twitter.com/search.json',
      data: { q: url, rpp:100 },
      dataType: 'jsonp',
      success: function(resp) {
          if (!resp.results.length) return;
          var template =
              "<a target='_blank' href='http://twitter.com/<%=from_user%>/status/<%=id_str%>' class='tweet'>"
              + "<span class='thumb' style='background-image:url(<%=profile_image_url%>)'></span>"
              + "<span class='popup'>"
              + "<span class='title'>@<%=from_user%></span>"
              + "<small><%=text%></small>"
              + "</span>"
              + "<span class='caret'></span>"
              + "</a>";
              
          var t = _(resp.results.slice(0,30))
              .map(function(i) { return _(template).template(i); })
              .join('');
          $(".tweets").html(t).addClass('loaded');
      }
  });
  
  
});


$('#twitter-url_').popover({
  placement: 'bottom',
  content: function() {
    return $("#tweet").html();
  }
});


