$(function() {
  var breakMobile = 730, // viewport px breakpoint

      fixedHeader = function() {
        var viewportWidth = $( window ).width(),
            fixedClass = 'navigation--fixed-top',
            $navElement = $(".navigation");

        if ($("body").scrollTop() > '1' && viewportWidth >= breakMobile) {
          $navElement.addClass(fixedClass);
        } else {
          $navElement.removeClass(fixedClass);
        }
      },

      showLogo = function() {
        var viewLogotop = 300,
            logovisibleClass = 'visible-logo',
            $logoElement = $(".navigation__item--logo");

        if ($("body").scrollTop() > '150' ) {
          $logoElement.addClass(logovisibleClass);
          $logoElement.fadeIn( "slow" );
        } else {
          $logoElement.fadeOut( "slow", function() {
            $logoElement.removeClass(logovisibleClass);
          });
        }
      },

      replaceMailto = function() {
        var $emailElement = $(".contact-button__email");

        $emailElement.click(function() {
          window.location.href = 'mailto:' + $(this).text().split('').reverse().join('');
        });
      };

      // Toggle mobile navigation
      $(".navigation__mobile-menu__toggle").click(function() {
        $(this).parent().toggleClass('is-open');
      });

      // Force close mobile navigation when clicking anywhere (except the toggle button itself)
      $( document ).on('mousedown touchstart', function(event) {
        if (!$(event.target).closest(".navigation__mobile-menu__toggle").length) {
          $(".navigation.is-open").removeClass('is-open');
        }
      });

  // Call on DOM ready

  /*$('.homefeatures__carousel').flickity({
    // options
    cellAlign: 'left',
    imagesLoaded: true,
    freeScroll: true,
    wrapAround: true
  });*/

  $( window ).scroll(fixedHeader);
  $( window ).scroll(showLogo);
  replaceMailto();
});
