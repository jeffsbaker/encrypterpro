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
		For a Nexus 7 in landscape if (window.orientation = 90 || window.orientation = -90)
			screen.width == 1280
		In portrait mode screen.width == 800
		On Android to get the fake width in points: screen.width / window.devicePixelRatio (800 / 1.33 = 602)
		
		iOS: screen.width is always the virtual width in points. (Points are 2 pixels)
		For iPhone 5 (Retina display) in landscape
			screen.width == 320
		In protrait mode screen.width == 320
		
	*/
	if( /(android)/i.test(navigator.userAgent) )
	{
		if (screen.width / window.devicePixelRatio <= 414) // most phones
			viewport.setAttribute("content", "width=520, user-scalable=no, target-densitydpi=high-dpi, initial-scale=.6");
		else if (screen.width / window.devicePixelRatio < 800) // most 7" tablets
			viewport.setAttribute("content", "width=520, user-scalable=no, target-densitydpi=medium-dpi, initial-scale=.7");	
		else if (screen.width / window.devicePixelRatio >= 800) // most 10" tablets
			viewport.setAttribute("content", "width=520, user-scalable=no, target-densitydpi=low-dpi, initial-scale=1");
	}
	show_viewport();
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
	if (document.getElementById('footer'))
	{

		document.getElementById('footer').innerHTML += screen.width + "x" +  screen.height + 
		" " + window.innerWidth + "x" + window.innerHeight +
		" " + window.devicePixelRatio + " " + window.orientation + " ";
		/*			screen.width	window.innerWidth	window.devicePixelRatio	
			Kindle		1200			600					2
			Nexus 4		480x800			320x240				1.5
			Nexus 7		800x1280		602x889				1.33
			Nexus 10	2560			1280				2
			HTC Evo		720x1280		360x640				2
			iPhone 5	320x568								2	
		*/
	}
	document.fm.vp.value = viewport.getAttribute("content");
}

// In Phonegap Build:  event listener deviceready seems to only work with the first function you set it to
//document.addEventListener('deviceready', show_viewport, false);
//show_viewport();

//window.addEventListener("orientationchange", updateOrientation); // Call when orientation changes
//window.addEventListener("resize", updateOrientation); // Call when orientation changes
updateOrientation(); // Call on first run of app


