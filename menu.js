var scroll_options = { tolerance: 0, lastScrollTop: 0 };
var test_div = document.getElementById("test");


/* It is not possible to get certain styles set in css such as display using 
the normal javascript.  So we have to use this function taken from:
http://www.quirksmode.org/dom/getstyles.html */
function getStyle(el,styleProp)
{
	// if el is a string of the id or the actual object of the element
	var x = (document.getElementById(el)) ? document.getElementById(el) : el;
	if (x.currentStyle) // IE
		var y = x.currentStyle[styleProp];
	else if (window.getComputedStyle)  // FF
		var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	return y;
}


function menu_click(button, menu, force_close)
{
	// if menu is a string of the id or the actual object of the element
	var menu = (document.getElementById(menu)) ? document.getElementById(menu) : menu;
	var button = (document.getElementById(button)) ? document.getElementById(button) : button;
	
	//test_div.innerHTML = button.getAttribute("data-bit");
	//var menu = document.getElementById("menu");
	if (button.getAttribute("data-bit") == 0 && !force_close) // menu is closed (down arrow)
//	if (getStyle(menu, 'display').match(/none/i))
	{
		button.innerHTML = "Menu&#9650;"; // change to up arrow
		button.setAttribute("data-bit", 1); 
		//menu.style.display = "block";
		if (!menu.className.match(/\bon\b/))
			menu.className += " on";
	}	
	else
	{
		button.innerHTML = "Menu&#9660;"; // change to down arrow
		button.setAttribute("data-bit", 0);
		//menu.style.display = "none";
		menu.className = menu.className.replace(/\bon\b/, "");
	}
	

}


/* If tablet is turned landscape then make sure and display menu
 	if we turned it off with javascript.  Which also means we
 	need to turn it on if we go back to portrait orientation. */
function window_resized()
{
	
	/*var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var menu = document.getElementById('menu');
	//test.innerHTML = width;
	if (width > 568 && menu.style.display == "none")
		menu.style.display = "block";
	else if (width < 480 && menu.style.display == "block")
		menu.style.display = "none";
	*/
	
	/* Instead of doing above I need to stop iphone bug of chaning orientation to
		landscape works fine, but when changing orientation back to portrait then
		the zooming has changed.  This fixes it:
	*/
	document.fm.textbox.blur();
	
	viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'width=520, user-scalable=no, maximum-scale=0.6');
}

//window.onorientationchange = window_resized;
//window.onresize = window_resized;

function popup_box(box)
{
	// if box is a string of the id or the actual object of the element
	var box = (document.getElementById(box)) ? document.getElementById(box) : box;
	
	// get current top and bottom position of browser screen
	var current_top = (document.documentElement.scrollTop || document.body.scrollTop);
	var current_bottom = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + current_top;
	
	// get current left and right position of browser
	var current_left = (document.documentElement.scrollLeft || document.body.scrollLeft);
	var current_right = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + current_left;

	// Need to display box before getting width and height
	box.style.display = 'block';
	
	// get width and height of box
	var box_width = box.offsetWidth;
	var box_height = box.offsetHeight;
	
	//  Calculate top and left
	var box_left = (current_right - box_width) / 2;
	var box_top = (current_bottom - box_height) / 2;
	
	
	box.style.left = box_left + "px";
	box.style.top = box_top + "px";
	
}

function close_all()
{
	// Close all popup boxes
	var elems = document.getElementsByTagName('div');
	for (var i=0; i < elems.length; i++)
		if (elems[i].className.match(/\bbox\b/i))
			elems[i].style.display = 'none';
}

