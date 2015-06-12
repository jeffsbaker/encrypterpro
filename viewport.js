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

var viewport = document.querySelector("meta[name=viewport]");
if (screen.width <= 640) // most phones
	viewport.setAttribute("content", "width=520, target-densitydpi=high-dpi");
else if (screen.width <= 1024) // most 7" tablets
	viewport.setAttribute("content", "width=520, target-densitydpi=medium-dpi");	
else if (screen.width > 1024) // most 10" tablets
	viewport.setAttribute("content", "width=520, target-densitydpi=low-dpi");

function change_viewport()
{
	var viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute("content", document.fm.vp.value);
	

} // end function change_viewport()



//var viewportScale = 1 / window.devicePixelRatio;
var viewportScale = screen.width / 520;
if (document.getElementById('footer'))
	footer.innerHTML += viewportScale + " " + screen.width;
document.fm.vp.value = viewport.getAttribute("content");

