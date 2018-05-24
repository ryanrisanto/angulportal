jQuery(document).ready(function($){

	/* GOOGLE MAPS */

	// Initialize map
	function initgmap($map) {

	    // Get map position
	    var latitude = parseFloat(String($map.data('gmap-latitude')).replace(',', '.'));
	    var longtitude = parseFloat(String($map.data('gmap-longtitude')).replace(',', '.'));
	    var tooltip = String($map.data('gmap-tooltip'));
	    var position = new google.maps.LatLng(latitude, longtitude);

	    // Render map
	    var map = new google.maps.Map($map[0], {
	        zoom: $map.data('gmap-zoom') || 16,
	        scrollwheel: false,
	        center: position,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        mapTypeControl: false,
	        panControlOptions: {
	            position: google.maps.ControlPosition.LEFT_CENTER
	        },
	        zoomControlOptions: {
	            position: google.maps.ControlPosition.LEFT_CENTER
	        },
	        scaleControlOptions: {
	            position: google.maps.ControlPosition.LEFT_CENTER
	        },
	        mapTypeControlOptions: {
	             mapTypeIds: [
	                //google.maps.MapTypeId.ROADMAP, 'tehgrayz'
	            ]
	        }
	    });

	    // Center map on window resize
	    google.maps.event.addDomListener(window, 'resize', function() {
	        setTimeout(function() {
	            map.setCenter(position);
	        }, 50);
	    });

	    // Center map when switching between boxed/full layout
	    var $switcher = $('#switcher');
	    if ($switcher.length)
	        $('.switch.layout', $switcher).on('switch', function() {
	            var interval = setInterval(function() {
	                google.maps.event.trigger(window, 'resize', map);
	            }, 50);
	            setTimeout(function() {
	                clearInterval(interval);
	            }, 350);
	        });

	    // Grayscale
	    map.mapTypes.set('grayscale', new google.maps.StyledMapType(
	        [
	            {
	                featureType: "all",
	                elementType: "all",
	                stylers: [
	                    {
	                        //saturation: -100
	                    }
	                ]
	            }
	        ],
	        {
	            name: "Grayscale"
	        }
	    ));
	    map.setMapTypeId('grayscale');

	    // Map is ready
	    google.maps.event.addListenerOnce(map, 'idle', function() {

	        // Set custom marker
	        $.getScript('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/richmarker/src/richmarker-compiled.js', function() {
	            new RichMarker({
	                draggable: false,
	                map: map,
	                position: position,
	                shadow: false,
	                content: '<div class="marker"><div class="gmap_tooltip_wrapper"><div class="gmap_tooltip">' + tooltip + '</div></div></div>'
	            });
	        });
	    });
	}

	var $maps = $('.gmap');
	if (0 != $maps.size()){

		// Load API
		$.getScript('https://www.google.com/jsapi', function() {
		    google.load('maps', '3', {other_params: 'sensor=false', callback: function() {
		        $maps.each(function() {
		            initgmap($(this));
		        });
		    }});
		});

	}
});