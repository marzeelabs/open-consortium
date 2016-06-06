$(function() {
  var breakMobile = 730, // viewport px breakpoint

      collapseHeader = function() {
        var viewportWidth = $( window ).width(),
            collapseClass = 'navigation--collapsed',
            $navElement = $(".navigation--home");

        if ($("body").scrollTop() > '1' && viewportWidth >= breakMobile) {
          $navElement.addClass(collapseClass);
          console.log("hellos ");
        } else {
          $navElement.removeClass(collapseClass);
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
          $(".navigation--home.is-open").removeClass('is-open');
          console.log("hello 2");
        }
      });

  // Call on DOM ready
  $( window ).scroll(collapseHeader);
  replaceMailto();
});
