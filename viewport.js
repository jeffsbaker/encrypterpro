/*
	Around the web people say they got phonegap build to
	read the viewport by using this viewport:
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, target-densitydpi=medium-dpi, user-scalable=0" />
	
	In my testing though I have found that phonegap build does not read any part of that 
	viewport except for the target-densitydpi part. Therefore it is my conclusion that
	phonegap build ignores viewport except for target-densitydpi.  
	
	For my app I found that to make it look correct on a phone, 7" tablet and 10" tablet
	I needed different target-densitydpi for each device. A setting of "device-dpi" made
	it look good on the phone (which was that same as "high-spi") but this made every font
	too small on the tablet.  On the 7" tablet I needed "medium-dpi" and on a 10" tablet 
	I needed "low-dpi".  
	
	Here is my code:
*/
function updateOrientation()
{
	var viewport = document.querySelector("meta[name=viewport]");
	if (document.getElementById('footer'))
		document.getElementById('footer').innerHTML = "";
	show_viewport();
	/* Android: screen.width is always the real width in pixels. 
		For a Nexus 7 in landscape if (window.orientation == 90 || window.orientation == -90)
			screen.width == 1280
		In portrait mode screen.width == 800
		On Android to get the fake width in points: screen.width / window.devicePixelRatio (800 / 1.33 = 602)
		Problem with above is some Android versions or devices keep screen.width at 800 regardless of orientation
		
		iOS: screen.width is always the virtual width in points. (Points are 2 pixels)
		For iPhone 5 (Retina display) in landscape
			screen.width == 320
		In protrait mode screen.width == 320
		
	*/
	var point_width = 0;
	var ua = navigator.userAgent;
	var is_native_android = ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android ') > -1 && ua.indexOf('AppleWebKit') > -1) && (ua.indexOf('Version') > -1) && !(ua.indexOf('Chrome') > -1));
	if (window.cordova || is_native_android) // Only run this command if it is running in a phonegap build app or Native Android browser
	{
		if( /(android)/i.test(navigator.userAgent) )
		{
			if (window.orientation == 90 || window.orientation == -90) // landscape
				point_width = Math.max(screen.width, screen.height); // The greater will be the true width in landscape
			else // 0 or 180 (portrait)
				point_width = Math.min(screen.width, screen.height); // The lesser will be the true width in portrait
				
			point_width = point_width / window.devicePixelRatio;
			
			if (point_width <= 480) // most phones
				viewport.setAttribute("content", "width=480, user-scalable=no, target-densitydpi=high-dpi");
			else if (point_width < 800) // most 7" tablets
				viewport.setAttribute("content", "width=520, user-scalable=no, target-densitydpi=medium-dpi");	
			else if (point_width >= 800) // most 10" tablets
				viewport.setAttribute("content", "width=520, user-scalable=no, target-densitydpi=low-dpi, initial-scale=1");
				
		/*	if (window.innerWidth >= 1024) // if large display
				document.fm.textbox.style.zoom = 1.45; // zoom in on textarea
			else // otherwise
				document.fm.textbox.style.zoom = 1; // keep textarea normal
		*/		
		}
	}
	else if (ua.indexOf('Android ') > -1 && !(ua.indexOf('Firefox') > -1)) // If Android but not native browser or Firefox
	{
		viewport.setAttribute("content", "width=534, user-scalable=no"); // Remove initial-scale=.65 that we added for Android Firefox
	}
	else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent))
	{
		/* Fix iphone from zooming when textarea has focus and they change orientation.
		 This is no longer needed because of the check_tilt(e) function and using:
		 "viewport" content="width=534, user-scalable=no"
		 But if I was using: "viewport" content="user-scalable=no, initial-scale=.6, maximum-scale=.6, minimum-scale=.6"
		 then I would need to zoom in on the textarea.  However, iOS still zoomed in if
		 textarea had focus even when using blur() on orientationchange */
		document.fm.textbox.blur();
		viewport.setAttribute("content", "width=534, user-scalable=no"); // Remove initial-scale=.65 that we added for Android Firefox
		//window.scrollTo(0,0);
	//	setTimeout(function(){ 
	//		var viewport = document.querySelector("meta[name=viewport]"); 
	/*		if (window.orientation == 90 || window.orientation == -90) // landscape
			{
				if (screen.width <= 320)
				{
					//viewport.setAttribute("content", "width=520, user-scalable=no, initial-scale=.7");
					document.fm.textbox.style.zoom = 1.45;
				}
			}
			else // 0 or 180 (portrait)
			{
				if (screen.width <= 320)
				{
					//viewport.setAttribute("content", "user-scalable=no, initial-scale=.6, maximum-scale=.6, minimum-scale=.6");
					document.fm.textbox.style.zoom = 1;
				}
			} 
		*/
	//	}, 500);
	}
	show_viewport();
}

function check_tilt(e)
{
	
	var x = Math.round(event.accelerationIncludingGravity.x); // straight= 0, tilt right landscape= 10, tilt left landscape= -10
    var y = Math.round(event.accelerationIncludingGravity.y); // straight= -10, tilt right landscape= 0, tilt left landscape= 0, on back= 0, on face= 0
    var z = Math.round(event.accelerationIncludingGravity.z); // straight= 0, on back= -10,  on face= 10
	var elems = ["input", "textarea"];
	var blur_flag = 0;
	
	if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) // Only run if on iOS device
	if (window.orientation == 90 || window.orientation == -90) // landscape
	{
		if (y <= -7 || y >= 7) // Almost tilting to portrait
			blur_flag = 1;
	}
	else // 0 or 180 (portrait)
	{
		if (x >= 7 || x <= -7) // Almost tilting to landscape
			blur_flag = 1;
	}
	
	if (blur_flag)
	{
		for (var i=0; i < elems.length; i++)
		{
			var inputs = document.getElementsByTagName(elems[i]);
			for (var j = 0; j < inputs.length; j++) 
			{	
				inputs[j].blur();	
			}
		}
	}
	
	if (document.getElementById('footer'))
	{
	//	document.getElementById('footer').innerHTML = "x="+x+", y="+y+", z="+z;
	}	

}


function change_viewport()
{
	var viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute("content", document.fm.vp.value);
	

} // end function change_viewport()



//var viewportScale = 1 / window.devicePixelRatio;
function show_viewport()
{
	var viewport = document.querySelector("meta[name=viewport]");
	var viewportScale = screen.width / 520;
	var device_name = (typeof device !== 'undefined') ? device.model + " " + device.version : "None";
	if (document.getElementById('footer'))
	{

		document.getElementById('footer').innerHTML += screen.width + "x" +  screen.height + 
		" " + window.innerWidth + "x" + window.innerHeight +
		" " + window.devicePixelRatio + " " + window.orientation + " " + navigator.userAgent + " " +
		device_name;
		/*			screen.width	window.innerWidth	window.devicePixelRatio	
			Kindle		1200			600					2
			Nexus 4		480x800			320x240				1.5
			Nexus 7		800x1280		602x889				1.33
			Nexus 10	2560			1280				2
			HTC Evo		720x1280		360x640				2
			iPhone 5	320x568			534x768				2	
			iPad-Mini	768x1024		980x1183			1	
		*/
	}
	document.fm.vp.value = viewport.getAttribute("content");
}

function textbox_focus()
{
	document.fm.textbox.scrollTop = document.fm.textbox.scrollHeight;

}

// In Phonegap Build:  event listener deviceready seems to only work with the first function you set it to
//document.addEventListener('deviceready', show_viewport, false);
//show_viewport();

window.addEventListener("orientationchange", updateOrientation, false); // Call when orientation changes
window.addEventListener( "devicemotion", check_tilt, false ); // call when phone tilted
//window.addEventListener("resize", updateOrientation); // Call when orientation changes
document.addEventListener("deviceready", updateOrientation, false);
//updateOrientation(); // Call on first run of app

//document.fm.textbox.onclick=textbox_focus;
//window.scrollTo(0,document.body.scrollHeight);

/* Make textbox bigger on desktop browser */
if (!window.cordova) // Not a phonegap  build app 
if (!navigator.userAgent.match(/android|ipod|iphone|ipad/i)) // Not a recognized mobile device
if (window.innerWidth >= 1024) // Not recognizing the viewport width=534
{
	// So it must be a desktop.  Zoom in on textarea
	document.fm.textbox.style.zoom = 1.45;
}



