// JavaScript Document



$(window).load(function () {

    "use strict";


    /*----------------------------------------------------*/
    /*	Preloader
    /*----------------------------------------------------*/

    $(".loader").delay(100).fadeOut();
    $(".animationload").delay(100).fadeOut("fast");


});



//Bootstraping variable
headerWrapper = parseInt($('#navigation-menu').height());
offsetTolerance = 300;


/*----------------------------------------------------*/
/*	Current Menu Item
/*----------------------------------------------------*/

$(window).scroll(function () {

    //Check scroll position
    scrollPosition = parseInt($(this).scrollTop());

    //Move trough each menu and check its position with scroll position then add selected-nav class
    $('.navbar-nav > li > a').each(function () {

        thisHref = $(this).attr('href');
        thisTruePosition = parseInt($(thisHref).offset().top);
        thisPosition = thisTruePosition - headerWrapper - offsetTolerance;

        if (scrollPosition >= thisPosition) {

            $('.selected-nav').removeClass('selected-nav');
            $('.navbar-nav > li > a[href=' + thisHref + ']').addClass('selected-nav');

        }
    });


    //If we're at the bottom of the page, move pointer to the last section
    bottomPage = parseInt($(document).height()) - parseInt($(window).height());

    if (scrollPosition == bottomPage || scrollPosition >= bottomPage) {

        $('.selected-nav').removeClass('selected-nav');
        $('navbar-nav > li > a:last').addClass('selected-nav');
    }

});



$(document).ready(function () {

    "use strict";


    /*----------------------------------------------------*/
    /*	Mobile Menu Toggle
    /*----------------------------------------------------*/

    $('.navbar-nav li a').on('click', function () {
        $('#navigation-menu').css("height", "1px").removeClass("in").addClass("collapse");
        $('#navigation-menu').removeClass("open");
    });


    /*----------------------------------------------------*/
    /*	Animated Scroll To Anchor
    /*----------------------------------------------------*/

    $('#header a[href^="#"]').on('click', function (e) {

        e.preventDefault();

        var target = this.hash,
            $target = jQuery(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 50 // - 200px (nav-height)
        }, 'slow', 'easeInSine', function () {
            window.location.hash = '1' + target;
        });

    });


    /*----------------------------------------------------*/
    /*	ScrollUp
    /*----------------------------------------------------*/

    $.scrollUp = function (options) {

        // Defaults
        var defaults = {
            scrollName: 'scrollUp', // Element ID
            topDistance: 600, // Distance from top before showing element (px)
            topSpeed: 800, // Speed back to top (ms)
            animation: 'fade', // Fade, slide, none
            animationInSpeed: 200, // Animation in speed (ms)
            animationOutSpeed: 200, // Animation out speed (ms)
            scrollText: '', // Text for element
            scrollImg: false, // Set true to use image
            activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        };

        var o = $.extend({}, defaults, options),
            scrollId = '#' + o.scrollName;

        // Create element
        $('<a/>', {
            id: o.scrollName,
            href: '#top',
            title: o.scrollText
        }).appendTo('body');

        // If not using an image display text
        if (!o.scrollImg) {
            $(scrollId).text(o.scrollText);
        }

        // Minium CSS to make the magic happen
        $(scrollId).css({ 'display': 'none', 'position': 'fixed', 'z-index': '2147483647' });

        // Active point overlay
        if (o.activeOverlay) {
            $("body").append("<div id='" + o.scrollName + "-active'></div>");
            $(scrollId + "-active").css({ 'position': 'absolute', 'top': o.topDistance + 'px', 'width': '100%', 'border-top': '1px dotted ' + o.activeOverlay, 'z-index': '2147483647' });
        }

        // Scroll function
        $(window).scroll(function () {
            switch (o.animation) {
                case "fade":
                    $(($(window).scrollTop() > o.topDistance) ? $(scrollId).fadeIn(o.animationInSpeed) : $(scrollId).fadeOut(o.animationOutSpeed));
                    break;
                case "slide":
                    $(($(window).scrollTop() > o.topDistance) ? $(scrollId).slideDown(o.animationInSpeed) : $(scrollId).slideUp(o.animationOutSpeed));
                    break;
                default:
                    $(($(window).scrollTop() > o.topDistance) ? $(scrollId).show(0) : $(scrollId).hide(0));
            }
        });

        // To the top
        $(scrollId).click(function (event) {
            $('html, body').animate({ scrollTop: 0 }, o.topSpeed);
            event.preventDefault();
        });

    };

    $.scrollUp();


    /*----------------------------------------------------*/
    /*	Filterable Portfolio
    /*----------------------------------------------------*/

    $("#portfolio .row").mixitup({
        targetSelector: '.portfolio-item',
    });


    /*----------------------------------------------------*/
    /*	Portfolio Lightbox
    /*----------------------------------------------------*/

    $("a[class^='prettyPhoto']").prettyPhoto();


    /*----------------------------------------------------*/
    /*	Our Clients Carousel
    /*----------------------------------------------------*/

    $("#our-customers").owlCarousel({

        slideSpeed: 600,
        items: 6,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [960, 4],
        itemsTablet: [768, 3],
        itemsMobile: [480, 3],
        navigation: true,
        pagination: false,
        navigationText: false

    });


    /*----------------------------------------------------*/
    /*	Statistic Counter
    /*----------------------------------------------------*/

    $('.statistic-block').each(function () {
        $(this).appear(function () {
            var $endNum = parseInt($(this).find('.statistic-number').text());
            $(this).find('.statistic-number').countTo({
                from: 0,
                to: $endNum,
                speed: 3000,
                refreshInterval: 30,
            });
        }, { accX: 0, accY: 0 });
    });


    /*----------------------------------------------------*/
    /*	Promo Line Images Rotator
    /*----------------------------------------------------*/

    $('.flexslider').flexslider({
        animation: "fade",
        controlNav: true,
        directionNav: false,
        slideshowSpeed: 6000,
        animationSpeed: 2000,
        start: function (slider) {
            $('body').removeClass('loading');
        }
    });


    /*----------------------------------------------------*/
    /*	Register Form Validation
    /*----------------------------------------------------*/

    $(".form_register form").validate({
        rules: {
            first_name: {
                required: true,
                minlength: 2,
                maxlength: 16,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
                digits: true,
            }
        },
        messages: {
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            },
            phone: {
                required: "Please enter only digits",
                digits: "Please enter a valid number"
            },
        }
    });


    /*----------------------------------------------------*/
    /*	Newsletter Subscribe Form
    /*----------------------------------------------------*/

    $('#newsletter_form').submit(function () {
        if (!valid_email_address($("#s_email").val())) {
            $(".message").html("<span style='color:red;'>The email address you entered was invalid. Please make sure you enter a valid email address to subscribe.</span>");
        }
        else {
            $(".message").html("<span style='color:#eee;'>Adding your email address...</span>");
            $.ajax({
                url: 'subscribe.php',
                data: $('#newsletter_form').serialize(),
                type: 'POST',
                success: function (msg) {
                    if (msg == "success") {
                        $("#s_email").val("");
                        $(".message").html('<span style="color:#eee;">You have successfully subscribed to our mailing list.</span>');
                    }
                    else {
                        $(".message").html("<span style='color:red;'>The email address you entered was invalid. Please make sure you enter a valid email address to subscribe.</span>");
                    }
                }
            });
        }

        return false;
    });


});


function valid_email_address(email) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return pattern.test(email);
}



