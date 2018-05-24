(function($) {

	// Using strict mode

	"use strict";

/* PRICING TABLERS 
 * Create wrapper around pricing tables located in one column
 */
function fix_pricing_tables() {
	var $cols = $('.post_content .grid').find('.col');
	$cols.each(function() {
		
		var $pricingTables = $(this).find('.pricing_item');
		if( $pricingTables.length > 0 ) {
			var wrapperStart = '<div class="pricing-1 grid_' + $pricingTables.length + ' clearfix">';
			var wrapperEnd = '</div>';
			
			$pricingTables.wrapAll( wrapperStart + wrapperEnd );
		}
		
	});
	
	var $faqHeaderItem = $('.faq_header_item');
	if( $faqHeaderItem.length > 0 ) {
		$faqHeaderItem.each(function(){
			var chapterSectionId = $(this).attr('href');
			
			var $chapterSection = $( chapterSectionId );
			
			
			var numberOfItems = 0;
			if( $chapterSection.length > 0 ) {
				
				numberOfItems = $chapterSection.parent().find('.faq_item').length;
			}
			
			$(this).find('.faq_header_item_count').html( numberOfItems ); 
		});
	}
}

function fix_faq_sections() {
}

function init_logo_slider() {
	jQuery(document).ready(function() {
	$('.client_logo_slider').each(function(){
	
		$(this).carouFredSel({
			width: '100%',
			align: 'left',
			items: {
				visible: {
					min: 1,
					max: 8
				},
				width: "variable",
				height: "variable"
			},
			scroll	: {
				items			: 1,
				duration		: 1000,
				timeoutDuration	: 2000
			},
			auto	: ( '1' == $(this).attr('data-autoscroll') ),
			next: $(this).parent().find(".btn_next"),
			prev: $(this).parent().find(".btn_prev")
		}).parent().css("margin", "auto");
	});
	});
	
	
	$('.photo_slider-1 ul li').css('display', 'block');

	$('.photo_slider-1').each(function(){
		var $slider = $(this);
		$(this).find('ul').bxSlider({
			pager: false
		});
	});
	
	$('.recent_posts_slider-2_wrapper').each(function() {
		var $next = $(this).find('.btn_next');
		var $prev = $(this).find('.btn_prev');
		
		$(this).find('.recent_posts_slider-2').carouFredSel({
			circular: false,
			responsive: true,
			width: '100%',
			height: "variable",
			items: {
				width: 280,
				visible: {
					min: 1,
					max: 3
				},
				height: "variable"
			},
			scroll: {
				duration: 1000,
				pauseOnHover: true
			},
			auto: 2000,
			swipe: true,
			next: $next,
			prev: $prev
		});
	});
	
	$('.recent_posts_slider').each(function() {
		
		var numberOfColumns = $(this).attr('data-num-columns');
		var imageWidth = $(this).attr('data-image-width');
		var autoslideInterval = 1*$(this).attr('data-autoslide-interval');
		var autoslideStopClick = $(this).attr('data-autoslide-stop-click');
		
		var $slider= $(this);
		var $prev = $(this).parent().find(".btn_prev");
		var $next = $(this).parent().find(".btn_next");
		
		if( autoslideStopClick == 'yes' ) {
			var stopFunction = (function(){
				$slider.trigger("configuration", {
					auto: false,
				});
			});
			
			$next.click( stopFunction );
			$prev.click( stopFunction );
		}
		$(this).carouFredSel({
			circular: false,
			responsive: true,
			width: '100%',
			height: "variable",
			items: {
				width: imageWidth,
				visible: {
					min: 1,
					max: numberOfColumns
				},
				height: "variable"
			},
			scroll: {
				duration: 1000,
				//pauseOnHover: true,
				pauseOnEvent: true,
				
			},
			auto: {
				play: (autoslideInterval != 0),
				timeoutDuration: autoslideInterval,
				pauseOnEvent: true,
				
				
			},
			swipe: true,
			next: $next,
			prev: $prev
		});
	});
}

/* STICKY FOOTER */

function sticky_footer(){

	var footer_container_height = $('.footer_container').outerHeight();
	$('#layout_width').css('height', '100%');
	$('.content_container').css('min-height', '100%').css('margin-bottom', '-'+footer_container_height+'px');
	$('.footer_push').css('height', footer_container_height+'px');

}

/* FIXED HEADER */


function fx_h_2() {

		// height of the info contact header
		var headerInfoHeight = $('.header-2_container').outerHeight();
		// height of the main navigation
		if( $('body').hasClass('admin-bar') ) {
			headerInfoHeight += $('#wpadminbar').outerHeight();
			//newHeight += $('#wpadminbar').outerHeight();
		}
		
		var $headerMainWrapper = $('.header_main_wrapper');
		var $topContent = $('.top_content');
		var $jqres = $('.jqres');
		
		var logoMarginTop = parseInt($headerMainWrapper.find('.logo').css('margin-top'));
		var logoMarginBottom = parseInt($headerMainWrapper.find('.logo').css('margin-bottom'));
		var searchMarginTop = parseInt($headerMainWrapper.find('.search_top_button').css('margin-top'));
		var topMenuItemALineHeight = parseInt($headerMainWrapper.find('.navigation-1_container').find('.top-menu-item-a').css('line-height'));
		
		if( $('.header-1_container').outerHeight() > topMenuItemALineHeight ){
			topMenuItemALineHeight = $('.header-1_container').outerHeight() - 1;
			searchMarginTop = parseInt( $('.header-1_container').outerHeight() / 2 ) - ( $headerMainWrapper.find('.search_top_button').outerHeight() / 2 );
		}
		
		var heightReduction = 16;
		var heightReductionHalf = heightReduction / 2;
		
		var $searchTopOverlay = $('.search_top_overlay');
		var scrollIt = function( ) {
			var headerContactHeight = $('.header_main_wrapper').outerHeight();

				// is desktop

				if ( ($jqres.width() > 840) && ( $('.header_main_wrapper').attr('data-position') == 'fixed')) {
					// current number of pixels window scrolled down
					var currentWindowScroll = ( $(window).scrollTop() );
					// is the header already non visible ?
					var headerPositionAgainstWindow = headerInfoHeight - currentWindowScroll;
					
					// is the header already non visible ?
					if( headerPositionAgainstWindow <= 0 ) {
						var headerZeroPosition = 0;
						if( $('body').hasClass('admin-bar') ) {
							headerZeroPosition = $('#wpadminbar').outerHeight();
							//newHeight += $('#wpadminbar').outerHeight();
						}
						
						
						$headerMainWrapper.css('position', 'fixed').css('top', headerZeroPosition);
						var newHeight = headerContactHeight;

					
						if( $searchTopOverlay.css('display') == 'block' ) {
							newHeight+= $searchTopOverlay.outerHeight();
						}
						
						$topContent.css('padding-top', newHeight );
					} else {
						$headerMainWrapper.css('position', 'static').css('top', headerInfoHeight);
						$topContent.css('padding-top', 0);
					}
					if( currentWindowScroll > 200 ) {
						$headerMainWrapper.addClass('header_compact');
						$headerMainWrapper.removeClass('header_noncompact');
						if( true ) {
							$headerMainWrapper.find('.logo').css('margin-top', ( logoMarginTop - heightReductionHalf) );
							$headerMainWrapper.find('.logo').css('margin-bottom', ( logoMarginBottom - heightReductionHalf) );
							
							$headerMainWrapper.find('.navigation-1_container').find('.top-menu-item-a').css('line-height', (topMenuItemALineHeight - heightReduction)+'px' );
							
							$headerMainWrapper.find('.search_top_button').css('margin-top', (searchMarginTop - heightReductionHalf ) );
						}
						
						 
						
					} else {
						$headerMainWrapper.removeClass('header_compact');
						$headerMainWrapper.addClass('header_noncompact');
						if( true ) {
							$headerMainWrapper.find('.logo').css('margin-top', logoMarginTop  );
							$headerMainWrapper.find('.logo').css('margin-bottom', logoMarginBottom );
							
							$headerMainWrapper.find('.navigation-1_container').find('.top-menu-item-a').css('line-height', (topMenuItemALineHeight)+'px' );
							
							$headerMainWrapper.find('.search_top_button').css('margin-top', (searchMarginTop) );
						}
					}
					
				// is mobile device
				} else {
					$headerMainWrapper.css('position', 'static');
					$topContent.css('padding-top', '0');
					
				}
		}
		$(window).bind('changeMenuStyle', function() { scrollIt(); setTimeout( scrollIt, 150 ); });
		$(window).scroll(function(){ scrollIt(); });
		$(document).ready(function() {
			setTimeout( scrollIt, 300);
		});
}
fx_h_2();
function fixed_header(){
}

/* CENTER NAVIGATION-1 */

function center_navigation_1() {

	var headerHeight = $('.header-1_container').outerHeight();
	var searchbuttonHeight = $('.search_top_button').height();
	var borderHeight = headerHeight - $('.header-1_container').height();

	// search button centering

	$('.navigation-1 .search_top_button').css('margin-top', (headerHeight - borderHeight - searchbuttonHeight) / 2);

	// (line)height of the navigation links - should be the same as the header height minus borders

	$('.navigation-1 .top-menu-item-a').css('line-height', headerHeight - borderHeight + 1 + 'px' );
	fixed_header();
}

/* NAVIGATION-1 - SUB-MENU - OPENING/CLOSING ANIMATION */

function navigation_1_sub_menu() 	{
	var animation_time = 250;
	$('.navigation-1').removeClass("fallback");
	$('.navigation-1 li').hover(
			
		function(){
			var subMenu = $(this).children('.sub-menu');
			
			if( subMenu.css('display') == 'none' ) {
				subMenu.css('opacity','0');
				subMenu.css('display','block');
			}
	    	subMenu.stop(true, false).animate({opacity:1},animation_time);
		}, function() {
			
			var subMenu = $(this).children('.sub-menu');
			subMenu.stop(true,false).animate( {opacity:0},animation_time, function(){ $(this).css('display','none'); }  );
		}
	);
}

/* SEARCH TOP - OPEN/CLOSE OVERLAY */

function search_top_overlay_toggle() {

	$('.search_top_button').click(function () {
	   $('.search_top_overlay').stop().slideToggle(200);
	   $('.search_top_overlay input:text').focus();
	});

	$('.search_top_close').click(function () {
	   $('.search_top_overlay').stop().slideToggle(200);
	   $('.search_top_overlay input:text').focus();
	});

	$('.search_top_overlay .searchfield').keyup(function(e){
		if(e.keyCode === 27){
			$('.search_top_overlay').stop().slideUp(200);
		}
	});

}

/* CENTER NAVIGATION-2 */

function center_navigation_2() {

	var nav2 = $('.navigation-2');
	var header = $('.header-1_container');
	
	
	var headerHeight = header.outerHeight();
	var nav2Height = nav2.outerHeight();
	
	var difference = Math.ceil(( headerHeight - nav2Height ) / 2 - 3);
	nav2.css('top', difference);

}

/* NAVIGATION-2 - NAVIGATION-MOBILE - TOGGLE OPENING AND CLOSING */

function toggle_mobile_menu() {
	$('.mobile_nav_button').click(function(){
		$('.navigation-2').toggleClass("navigation-2_active");
	    $('.navigation-mobile').slideToggle();
	});
}

/* NAVIGATION-2 - NAVIGATION-MOBILE - POSITION */

function navigation_mobile_position() 	{

	var header = $('.header-1_container');
	var mobilebtn = $('.mobile_nav_button');
	var headerHeight = header.outerHeight();
	var mobilebtnHeight = mobilebtn.outerHeight();
	var pos = Math.ceil(headerHeight - mobilebtnHeight / 2) - 3;

	$('.navigation-mobile').css('top', pos);

}

/* NAVIGATION-2 - SUB-MENU OPEN/CLOSE TOGGLE */

function navigation_2_sub_menu_toggle() 	{

	$('.navigation-2 li').hover(
		function(){
	    	$(this).parents(".sub-menu").css("height", "auto");
	    	$(this).children(".sub-menu").stop(false,true).slideDown();
		},
		function(){
	    	$(this).children(".sub-menu").stop(false,false).slideUp();
		}
	);

}

/* FOOTER-SOCIAL - SOCIAL TICKER TOTEM PLUGIN */

var social_ticker_el = null;

function social_ticker() 	{

	if ( social_ticker_el ) {
		if( social_ticker_el.destroySlider ) {
			social_ticker_el.destroySlider();
		}
	}

	social_ticker_el = $('.footer-social .timeline').bxSlider({
		controls: false,
		pager: false,
		mode: 'vertical',
		auto: true,
		pause: 5000,
		responsive: false,
		//minSlides: 1,
		//maxSlides: 1,
		touchEnabled: false,
		autoHover: true,
  		slideMargin: 10,
		//mode: 'vertical',
		//auto: true,
		//speed: 300,
		//adaptiveHeight: true,
	});

	$('.footer-social .timeline').css('visibility','visible');
}

$(document).ready(function($){

	/* PORTFOLIO SORTABLE */
	
	var $container = $('.portfolio-cat-1 .portfolio_grid');
	var $gridcols = $('.portfolio-cat-1 .portfolio_grid').attr('data-portfolio-cols');
	var $checkboxes = $('.portfolio_sortable a');

	$('.portfolio-cat-1 .portfolio_grid').css('opacity','0');

	// initialize Isotope
	$container.imagesLoaded( function(){
		$('.portfolio-cat-1 .portfolio_grid_wrapper').css('background','none');
		$('.portfolio-cat-1 .portfolio_grid').stop().animate({opacity:1},500);

		$container.isotope({
		  // options...
		  resizable: false, // disable normal resizing
		  layoutMode : 'fitRows',
	      itemSelector: '.portfolio-post-1_container',
		  // set columnWidth to a percentage of container width
		  masonry: { columnWidth: $container.width() / $gridcols }
		});
	});

	// update columnWidth on window resize
	$(window).smartresize(function(){
	  $container.isotope({
	    // update columnWidth to a percentage of container width
	    masonry: { columnWidth: $container.width() / $gridcols }
	  });
	});

	// sortable filters
	$('.portfolio_sortable a').click(function(){
	  var selector = $(this).attr('data-filter');
	  $container.isotope({ filter: selector });
	  return false;
	});

	// number of visible objects
    var $items = $('.portfolio-post-1_container'); // to reference methods on all .item divs later

    $checkboxes.click(function() {
        var filters = [];
        // get checked checkboxes values
        
        filters.push($(this).attr('data-filter'));
        
        // ['.red', '.blue'] -> '.red, .blue'
        filters = filters.join(', ');
        $container.isotope({
            filter: filters
        }, function($changedItems, instance) {
            instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
            instance.$filteredAtoms.addClass('is-filtered');
            $('.portfolio_sortable_count_number').html(instance.$filteredAtoms.size());
        });
        
    });

    $('.portfolio_sortable a.all').click();

	/* STICKY FOOTER */

	sticky_footer()

	$(window).resize(function() {
		sticky_footer()
	});

	/* CENTER NAVIGATION-1 */

	$('.logo').find('img').load(function(){
		center_navigation_1();
	});

	center_navigation_1();

	$(window).resize(function() {
		center_navigation_1();
	});

	/* NAVIGATION-1 - SUB-MENU - OPENING/CLOSING ANIMATION */

	navigation_1_sub_menu();

	/* SEARCH TOP - OPEN/CLOSE OVERLAY */

	search_top_overlay_toggle();

	/* CENTER NAVIGATION-2 */

	$('.logo').find('img').load(function(){
		center_navigation_2();
	});

	center_navigation_2();

	$(window).resize(function() {
		center_navigation_2();
	});

	/* NAVIGATION-2 - NAVIGATION-MOBILE - TOGGLE OPENING AND CLOSING */

	toggle_mobile_menu();

	/* NAVIGATION-2 - NAVIGATION-MOBILE - POSITION */

	navigation_mobile_position();

	$(window).resize(function() {
		navigation_mobile_position();
	});

	/* NAVIGATION-2 - SUB-MENU OPEN/CLOSE TOGGLE */

	navigation_2_sub_menu_toggle();

	/* FIXED HEADER */

	fixed_header();

	$(window).resize(function() {
		fixed_header();
	});

	/* BACK TO TOP */

	$('.back_to_top').click(function() {
		$('body,html').animate({scrollTop:0}, 300);
		return false;
	});

	/* FEATURED IMAGE HOVER - DEFAULT */

	
	$('a.featured_image_wrapper').hover(function() {
		$(this).find('.featured_image').stop().animate({opacity:0.25},200);
	}, function() {
		$(this).find('.featured_image').stop().animate({opacity:1},200);
	});

	

	/* MAGNIFIC POPUP INIT - FEATURED IMAGE */

	$('.featured_image_wrapper, .rps_image_zoom, .portfolio_image_zoom').each(function(){
		if ($(this).parents('.product_slider').size() == 0){
			$(this).magnificPopup({
			  type: 'image',
			  image:{
					cursor: null
			  },
			  removalDelay: 200, //delay removal by X to allow out-animation
			  callbacks: {
			    beforeOpen: function() {
			      // just a hack that adds mfp-anim class to markup 
			       this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
			       this.st.mainClass = this.st.el.attr('data-effect');
			    },
			    open: function() 	{
			    },
			    close: function() 	{
			    }
			  },
			  closeOnContentClick: true,
			  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
			});
		}
	});

	/* SHORTCODE - ACCORDEON */

	$('.tb_accordeon_item_post_title_wrapper').click(function() {
		if( $(this).parents('.tb_accordeon_wrapper').find(':animated').size() != 0 )
			return false;
		var one_item = $(this).parent();
		var text_wrapper = one_item.find('.tb_accordeon_item_content_wrapper');
		var text_content = text_wrapper.find('.tb_accordeon_item_content');
		var title_bg = one_item.find('.tb_accordeon_item_title_bg');

		if( text_wrapper.height() == 0 ) {
			one_item.addClass('tb_accordeon_item_active');
			text_wrapper.css('display','block').animate({height: text_content[0].scrollHeight - 16 }, 500);
			title_bg.fadeOut(500);
		} else {
			text_wrapper.animate({height:0}, 500, function() { $(this).css('display','none'); } );
			one_item.removeClass('tb_accordeon_item_active');
			title_bg.fadeIn(500);
		}

		var accordeon_holder = $(this).parent().parent();
		accordeon_holder.find('.tb_accordeon_item').each(function() {
			if( $(this).find(':animated').size() == 0 ) {
				$(this).find('.tb_accordeon_item_content_wrapper').animate({height:0}, 500);
				$(this).removeClass('tb_accordeon_item_active');
				$(this).find('.tb_accordeon_item_title_bg').fadeIn(500);
			}
		});
	});
	
	$(window).resize(function() {
		$('.tb_accordeon_item_active').each(function(){
			var text_wrapper = $(this).find('.tb_accordeon_item_content_wrapper');
			var text_content = $(this).find('.tb_accordeon_item_content');

			if( text_wrapper.height() != 0 ) {
				text_wrapper.css('height', text_content[0].scrollHeight - 16 );
			}
		});
	});

	/* SHORTCODE - TABS */

	$('.tb_tabs_title').click(function() {
		if( $(this).hasClass('tb_tabs_title_active') )
			return false;

		var tabs = $(this).parent().parent();

		tabs.find('.tb_tabs_title').removeClass('tb_tabs_title_active');
		$(this).addClass('tb_tabs_title_active');
		var item_position = $(this).index();
		tabs.find('.tb_tabs_item_content').css('display','none');

		tabs.find('.tb_tabs_item_content').eq( item_position ).css({'display':'block', 'opacity':0.2}).animate({opacity:1}, 200);

	});

	/* SCROLL TO WITH INTERNAL ANCHOR LINKS */

	function getElemementToScroll(){
		if( -1 == document.URL.indexOf('#') ){
			return null;
		}

		var _id;
		_id = document.URL.split('#');
		_id = "" + _id[1];
		if( _id.length < 1 ) {
			return null;
		}

		if( $( '#' + _id ).size() < 1 ){
			return null;
		}

		if( ! $( '#' + _id ).hasClass('scrollto') ){
			return null;
		}

		return _id;
	}

	function scrollToElement(){
		var _id = getElemementToScroll();
		if( _id ) { } else{
			return;
		}

		// Scroll - ID
		var _scroll_pos = 0;
		_scroll_pos += $( '#' + _id ).offset().top;

		// Scroll - header repair
		var fixed_header_height = 0;
		if ( $(".jqres").width() > 840) { // responsive
			fixed_header_height = $('.header_main_wrapper').outerHeight();
		}
		_scroll_pos -= fixed_header_height;

		// admin bar
		if( $('body').hasClass('admin-bar') ) {
			_scroll_pos -= $('#wpadminbar').outerHeight();
		}

		// Bulgarian const = Correction 
		_scroll_pos -= 30;

		$('html, body').stop().animate({
			'scrollTop': _scroll_pos
		}, 100, 'swing', function () {
			//window.location.hash = target;
		});


	}

	/*
	$(document).ready(function(){
		$('a[href^="#"]').on('click',function (e) {
		    e.preventDefault();

		    var target = this.hash,
		    $target = $(target);

		    if ( $(".jqres").width() > 840) { // responsive
				var fixed_header_height = $('.header-1_container').outerHeight();
			}

		    $('html, body').stop().animate({
		        'scrollTop': $target.offset().top - fixed_header_height - 60
		    }, 900, 'swing', function () {
		        //window.location.hash = target;
		    });
		    return false;
		});
	});

	*/

	/* FOOTER-SOCIAL - SOCIAL TICKER */

	setTimeout(function(){
		social_ticker()
		$('.footer-social_container').css('max-height', 'none');
	},10)

	var firsttweetheight = $('.footer-social .timeline li:first').height();
	$('.footer-social_container').css('max-height', firsttweetheight);

});


$(window).load(function () {

	/* FIXED HEADER */

	fixed_header();

	/* CENTER NAVIGATION-1 */

	center_navigation_1();

	/* SEARCH TOP - POSITION */

	/*search_top_overlay_position()*/

	/* CENTER NAVIGATION-2 */

	center_navigation_2();

	/* NAVIGATION-2 - NAVIGATION-MOBILE - POSITION */

	navigation_mobile_position();

	init_logo_slider();

	/* SHORTCODE - ACCORDEON - OPEN ON PAGELOAD */

	$('.tb_accordeon_item_open .tb_accordeon_item_post_title_wrapper').click();

	/* FOOTER-SOCIAL - SOCIAL TICKER */

	$(window).resize(function() {
		social_ticker()
	});

	/* INITIALIZE BXSLIDER */

	setTimeout(function(){
		$('.bxslider').bxSlider({
			pager: false,
		})
	}, 10 );

	/* STICKY FOOTER */

	setTimeout(function(){
		sticky_footer()
	},11)

	

});



})(jQuery);

