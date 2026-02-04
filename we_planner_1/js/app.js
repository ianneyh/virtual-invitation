/* Theme Name: Brizzle - Responsive Landing Page Template
   Author: Themesdesign
   Version: 1.0.0
   File Description: Main Js file of the template
*/

(function($) {

    'use strict';

    function initNavbar() {

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 50) {
                $(".sticky").addClass("nav-sticky");
            } else {
                $(".sticky").removeClass("nav-sticky");
            }
        });
    }

    function initNavitemActive() {
        $('.navbar-nav a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    }

    function initScrollSpy() {
        $("#navbarCollapse").scrollspy({
            offset: 70
        });
    }

    function initMfpVideo() {
        $('.video-play-icon').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    function initBacktoTop() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });
        $('.back-to-top').click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    }

    function initContact() {
        $('#contact-form').submit(function() {

            var action = $(this).attr('action');

            $("#message").slideUp(750, function() {
                $('#message').hide();

                $('#submit')
                    .before('<img src="images/ajax-loader.gif" class="contact-loader" />')
                    .attr('disabled', 'disabled');

                $.post(action, {
                        name: $('#name').val(),
                        email: $('#email').val(),
                        comments: $('#comments').val(),
                    },
                    function(data) {
                        document.getElementById('message').innerHTML = data;
                        $('#message').slideDown('slow');
                        $('#cform img.contact-loader').fadeOut('slow', function() {
                            $(this).remove()
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') != null) $('#cform').slideUp('slow');
                    }
                );

            });

            return false;

        });
    }

    function init() {
        initNavbar();
        initNavitemActive();
        initScrollSpy();
        initMfpVideo();
        initBacktoTop();
        initContact();
    }

    init();

})(jQuery)