$(function() {
  var breakMobile = 730, // viewport px breakpoint

      fixedHeader = function() {
        var viewportWidth = $( window ).width(),
            fixedClass = 'navigation--fixed-top',
            $navElement = $(".navigation");

        if ($(window).scrollTop() > '1' && viewportWidth >= breakMobile) {
          $navElement.addClass(fixedClass);
        } else {
          $navElement.removeClass(fixedClass);
        }
      },

      showLogo = function() {
        var viewportWidth = $( window ).width(),
            logovisibleClass = 'visible-logo',
            $logoElement = $(".navigation__item--logo");

        if ($(window).scrollTop() > '150' && viewportWidth >= breakMobile) {
          $logoElement.addClass(logovisibleClass);
        } else {
         $logoElement.removeClass(logovisibleClass);
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

      $(".button--scroller").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
          // Store hash
          var hash = this.hash;
          // Using jQuery's animate() method to add smooth page scroll
          $('html, body').animate({
          scrollTop: $(hash).offset().top -50
          }, 800, function(){
          // Add hash (#) to URL when done scrolling (default click behavior)
           window.location.hash = hash;
          });
        } // End if
      });

      var featuresCarousel = $('.home-features-carousel').flickity({
        autoPlay: true,
        setGallerySize: false,
        wrapAround: true,
        imagesLoaded: true,
        prevNextButtons: false,
        pageDots: false
      });

      // Make features clickable
      $('.home-features__container .oc-feature').each(function(index) {
        $(this).click(function() {
          console.log("Clicked " + index);

          // Removes is selected class
          $('.home-features__container .oc-feature').removeClass('is-selected');

          // Adds is selected class
          $(this).addClass('is-selected');

          featuresCarousel.flickity('select', index);
          // Let's also stop the player so we stay on the selected screen
          featuresCarousel.flickity('pausePlayer');
        });
      })

      // testimonials
      $('.carousel-testimonials__wrapper').flickity({
        wrapAround: true,
        prevNextButtons: true,
        pageDots: true
      });

      // Portfolio in Features page
      $('.portfolio-carousel').flickity({
        autoPlay: 3500,
        setGallerySize: false,
        wrapAround: true,
        imagesLoaded: true,
        prevNextButtons: true,
        pageDots: false
      });

  $(window).on('resize scroll', fixedHeader);
  $(window).on('resize scroll', showLogo);
  replaceMailto();
});
