var $ = jQuery.noConflict();

/* Global variables */

"use strict";
var $document = $(document),
	$window = $(window),
	plugins = {
		bgimage: $('[data-image]'),
		googleMap: $('#map'),
		preloader: $('.loader'),
		panel: $('.panel'),
		menu: $('nav .menu'),
		footerBubble: $('.bubbleContainer'),
		counter: $('#counterBlock'),
		animation: $('.animation'),
		servicesCarousel: $('.services-box-mobile'),
		servicesBoxCarousel: $('.services-box-info-carousel'),
		permissionCarousel: $('.permission-box-mobile'),
		blogCarousel: $('.carousel-blog'),
		productCarousel: $('.product-box-mobile'),
		postCarousel: $('.post-carousel'),
		postGallery: $('.blog-isotope'),
		stickyHeader: true
	}

/* Initialize All Scripts */

$document.ready(function () {

	var windowWidth = window.innerWidth || $(window).width();

	// bg image from data attribute
	if (plugins.bgimage.length) {
		plugins.bgimage.each(function () {
			$this = $(this);
			var attr = $this.attr('data-image');
			$this.css({
				'background-image': 'url(' + attr + ')'
			});
		})
	}

	// faq 	accordion active class
	if (plugins.panel.length) {
		plugins.panel
			.on('show.bs.collapse', function (e) {
				$(e.target).prev('.panel-heading').addClass('active');
			})
			.on('hide.bs.collapse', function (e) {
				$(e.target).prev('.panel-heading').removeClass('active');
			});
	}

	// navigation
	if (plugins.menu.length > 0) {
		var $touch = $('#touch-menu');
		$('li', plugins.menu)
			.on('mouseenter', function () {
				$(this).addClass('hover');
			})
			.on('mouseleave', function () {
				$(this).removeClass('hover');
			});
		$touch.on('click', function (e) {
			e.preventDefault();
			plugins.menu.slideToggle();
		});
	}

	// footer bubble animation
	function footerBubbleAnim(count) {
		var count = (count < 20) ? count : 20;
		for (var i = 1; i < count + 1; i++) {
			var bubble = $("<div class='bubble-" + i + "'></div>");
			plugins.footerBubble.append(bubble);
		}
	}
	if (plugins.footerBubble.length > 0) {
		footerBubbleAnim(10); // 10 - number of bubbles (20 - max)
	}

	// counter
	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}
	if (plugins.counter.length) {
		plugins.counter.waypoint(function () {
			$('.title > span', plugins.counter).each(count);
			this.destroy();
		}, {
			triggerOnce: true,
			offset: '80%'
		});
	}
	
	// sticky header
	$.fn.stickyHeader = function () {

		var $header = this,
			$body = $('body'),
			headerOffset;

		function setHeigth() {
			$(".fix-space").remove();
			$header.removeClass('animated header--sticky fadeIn');
			headerOffset = $('.box-nav', $header).offset().top + 100;
		}

		setHeigth();

		var prevWindow = window.innerWidth || $window.width()

		$window.on('resize', function () {
			var currentWindow = window.innerWidth || $window.width();
			if (currentWindow != prevWindow) {
				setHeigth()
				prevWindow = currentWindow;
			}
		});

		$window.scroll(function () {
			var st = getCurrentScroll();
			if (st > headerOffset) {
				if (!$(".fix-space").length) {
					$header.after('<div class="fix-space"></div>');
					$(".fix-space").css({
						'height': $header.height() + 'px'
					});
				}
				$header.addClass('header--sticky animated fadeIn');
			} else {
				$(".fix-space").remove();
				$header.removeClass('animated header--sticky fadeIn');
			}
		});

		function getCurrentScroll() {
			return window.pageYOffset || document.documentElement.scrollTop;
		}
	}
	
	// sticky header
	if (plugins.stickyHeader) {
		$("header").stickyHeader();
	}
	
	// lazy loading effect
	var firstInit = true;

	function onScrollInit(items, wW) {
		if (wW > 991) {
			if (firstInit == true) {
				items.each(function () {
					var $element = $(this),
						animationClass = $element.attr('data-animation'),
						animationDelay = $element.attr('data-animation-delay');
					$element.removeClass('no-animate');
					$element.css({
						'-webkit-animation-delay': animationDelay,
						'-moz-animation-delay': animationDelay,
						'animation-delay': animationDelay
					});
					var trigger = $element;
					trigger.waypoint(function () {
						$element.addClass('animated').addClass(animationClass);
					}, {
						triggerOnce: true,
						offset: '90%'
					});
				});
				firstInit = false;
			}
		} else {
			items.each(function () {
				var $element = $(this);
				$element.addClass('no-animate')
			})
		}
	}
	if (plugins.animation.length) {
		onScrollInit(plugins.animation, windowWidth);
	}

	// blog carousel
	if (plugins.blogCarousel.length) {
		plugins.blogCarousel.slick({
			dots: true,
			infinite: true,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000
		});
	};

	// post carousel
	if (plugins.postCarousel.length) {
		plugins.postCarousel.slick({
			mobileFirst: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 2000,
			arrows: true,
			dots: false
		});
	}

	// post isotope
	if (plugins.postGallery.length) {
		var $postgallery = plugins.postGallery;
		$postgallery.imagesLoaded(function () {
			$postgallery.isotope({
				itemSelector: '.blog-post',
				masonry: {
					gutter: 30,
					columnWidth: '.blog-post'
				}
			});
		});
	}

	// product carousel
	if (plugins.productCarousel.length) {
		plugins.productCarousel.slick({
			slidesToShow: 3,
			dots: true,
			infinite: true,
			responsive: [{
				breakpoint: 991,
				settings: {
					arrows: false,
					slidesToShow: 2
				}
			},
			{
				breakpoint: 667,
				settings: {
					arrows: false,
					slidesToShow: 1
				}
			}]
		});
	};

	// services carousel
	if (plugins.servicesCarousel.length) {
		plugins.servicesCarousel.slick({
			slidesToShow: 3,
			dots: true,
			infinite: true,
			responsive: [{
				breakpoint: 991,
				settings: {
					arrows: false,
					slidesToShow: 2
				}
			},
			{
				breakpoint: 667,
				settings: {
					arrows: false,
					slidesToShow: 1
				}
			}]
		});
	};
	
	// servicesBox carousel
	if (plugins.servicesBoxCarousel.length) {
		plugins.servicesBoxCarousel.slick({
			slidesToShow: 3,
			slidesToScroll: 3,
			dots: true,
			infinite: true,
			responsive: [{
				breakpoint: 1350,
				settings: {
					arrows: false
				}
			},{
				breakpoint: 991,
				settings: {
					arrows: false,
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 667,
				settings: {
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
	};

	// mobile carousel
	function slickMobile(carousel) {
		carousel.slick({
			mobileFirst: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 2000,
			arrows: false,
			dots: true,
			responsive: [
				{
					breakpoint: 767,
					settings: "unslick",
				}]
		});
	}

	// permission carousel
	if (plugins.permissionCarousel.length) {
		if (windowWidth < 768) {
			slickMobile(plugins.permissionCarousel);
		}
	};
	
	// popup modal
	if ($('.popup-link').length) {
		$('.popup-link').magnificPopup({
			type: 'inline',
			midClick: true
		});
	}

	// post more ajax load
	var $postMoreLink = $('.view-more-post'),
		$postPreload = $('#postPreload');
	
	$postMoreLink.on('click', function () {
		var item;
		var target = $(this).attr('data-load');
		$(this).hide();
		$.ajax({
			url: target,
			success: function (data) {
				$postPreload.append(data);
				if (plugins.postGallery.length) {
					$(' > div', $postPreload).each(function () {
						item = $(this);
						$postgallery.append(item).isotope('appended', item);
					});
				}
			}
		});
	})
	var date = new Date();
	date.setDate(date.getDate());
	// Order Form
	if ($('.datetimepicker').length) {
		$('.datetimepicker').datetimepicker({
			format: 'DD/MM/YYYY',
			minDate: date,
			icons: {
				time: 'icon icon-clock',
				date: 'icon icon-calendar',
				up: 'icon icon-angle-up',
				down: 'icon icon-angle-down',
				previous: 'icon icon-left-arrow',
				next: 'icon icon-right-arrow',
				today: 'icon icon-today',
				clear: 'icon icon-trash',
				close: 'icon icon-cancel-music'
			}
		});
	}
	if ($('.timepicker').length) {
		$('.timepicker').datetimepicker({
			format: 'LT',
			minDate: date,
			icons: {
				time: 'icon icon-clock',
				up: 'icon icon-angle-up',
				down: 'icon icon-angle-down',
				previous: 'icon icon-left-arrow',
				next: 'icon icon-right-arrow'
			}
		});
	}
	var $orderForm = $('#orderForm')

	// appointment form
	if ($orderForm.length) {
		$orderForm.validate({
			rules: {
				firstname: {
					required: true,
					minlength: 2
				},
				lastname: {
					required: true,
					minlength: 2
				},
				phone: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				street1: {
					required: true
				}

			},
			messages: {
				firstname: {
					required: "Please enter your name",
					minlength: "Your name must consist of at least 2 characters"
				},
				lastname: {
					required: "Please enter your Last name",
					minlength: "Your Last name must consist of at least 2 characters"
				},
				phone: {
					required: "Please enter your phone"
				},
				email: {
					required: "Please enter your email",
					email: "Email is not correct"
				},
				street1: {
					required: "Please enter your address",

				}
			},
			submitHandler: function (form) {
				$(form).ajaxSubmit({
					type: "POST",
					data: $(form).serialize(),
					url: "order-form.php",
					success: function () {
						$('#success').fadeIn();
						$('#orderForm').each(function () {
							this.reset();
						});
					},
					error: function () {
						$('#orderForm').fadeTo("slow", 0, function () {
							$('#error').fadeIn();
						});
					}
				});
			}
		});
	}
	
	$window.on('load', function () {

		// remove preloader on page load
		if (plugins.preloader.length) {
			plugins.preloader.delay(500).fadeOut('slow');
		}

		function createMap(id, mapZoom) {
			// Create google map
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: mapZoom,
				scrollwheel: false,
				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(6.640820,3.510771), // Glasgow
				// How you would like to style the map. 
				// This is where you would paste any style found on Snazzy Maps.
				styles: [{
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#d1d1d1"
					}]
				}, {
					"featureType": "transit",
					"stylers": [{
						"color": "#808080"
					}, {
						"visibility": "off"
					}]
				}, {
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#d1d1d1"
					}]
				}, {
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#d1d1d1"
					}]
				}, {
					"featureType": "road.local",
					"elementType": "geometry.fill",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#ffffff"
					}, {
						"weight": 1.8
					}]
				}, {
					"featureType": "road.local",
					"elementType": "geometry.stroke",
					"stylers": [{
						"color": "#d7d7d7"
					}]
				}, {
					"featureType": "poi",
					"elementType": "geometry.fill",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#ebebeb"
					}]
				}, {
					"featureType": "administrative",
					"elementType": "geometry",
					"stylers": [{
						"color": "#d1d1d1"
					}]
				}, {
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#ffffff"
					}]
				}, {
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#ffffff"
					}]
				}, {
					"featureType": "landscape",
					"elementType": "geometry.fill",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#fafafa"
					}]
				}, {
					"featureType": "road",
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#d6d6d6"
					}]
				}, {
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#bfbfbf"
					}]
				}, {
					"featureType": "poi",
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				}, {
					"featureType": "poi",
					"elementType": "labels",
					"stylers": [{
						"visibility": "off"
					}]
				}, {
					"featureType": "road.arterial",
					"elementType": "geometry.stroke",
					"stylers": [{
						"color": "#d6d6d6"
					}]
				}, {
					"featureType": "road",
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				}, {}, {
					"featureType": "poi",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#f1f1f1"
					}]
				}]
			};
			// Get the HTML DOM element that will contain your map 
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById(id);
			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);
			var image = 'images/map-marker.png';
			// Let's also add a marker while we're at it
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(6.640820,3.510771),
				map: map,
				icon: image
			});

		}
		if (plugins.googleMap.length) {
			createMap('map', 11)
		}
	});

	// window resize events
	$window.on('resize', function () {
		setTimeout(function () {
			var windowWidth = window.innerWidth || $(window).width();
			if (windowWidth < 768) {
				slickMobile(plugins.permissionCarousel);
			}
			if (windowWidth > 991 && plugins.menu.is(':hidden')) {
				plugins.menu.removeAttr('style');
			}
			onScrollInit(plugins.animation, windowWidth);
		}, 500);
	});
	$(window).scroll(function() {
		var height = $(window).scrollTop();
		if (height > 100) {
			$('#back2Top').fadeIn();
		} else {
			$('#back2Top').fadeOut();
		}
	});
	$(document).ready(function() {
		$("#back2Top").click(function(event) {
			event.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	
	});

});