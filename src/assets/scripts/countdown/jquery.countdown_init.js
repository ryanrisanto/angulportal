// Originally written by http://tutorialzine.com/2011/12/countdown-jquery/

$(function() {
	
});


$(function(){

	if ( 0 == $('#countdown').size() ){
		return
	}

	var usertime = $('#countdown').attr('data-time');
	usertime = usertime.split(' ');
	
	_date = usertime[0].split('-');
	_date[0] = 1*_date[0];
	_date[1] = 1*_date[1] - 1;
	_date[2] = 1*_date[2];

	_time = usertime[1].split(':');
	_time[0] = 1*_time[0];
	_time[1] = 1*_time[1];
	_time[2] = 1*_time[2];

	ts = new Date(_date[0], _date[1], _date[2], _time[0], _time[1], _time[2]);

	var servertime = new Date();
	servertime = servertime.getTime();
	var note = $('#note'),
	st = new Date(servertime);
	newYear = true;
	console.log( ts );
	console.log( st );
	
	if(st > ts){
		
		// The new year is here! Count towards something else.
		// Notice the *1000 at the end - time must be in milliseconds
		
	} else {
		
		$('#countdown').countdown({
			timestamp	: ts,
			servertime	: st,
			el          : $('#countdown'),
			callback	: function(days, hours, minutes, seconds){
				
				var message = "";
				
				message += days + " day" + ( days==1 ? '':'s' ) + ", ";
				message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
				message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
				message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
				
				if(newYear){
					message += "left until the new year!";
				}
				else {
					message += "left to 10 days from now!";
				}
				
				note.html(message);
				console.log( message );
			}
		});
	}
});
