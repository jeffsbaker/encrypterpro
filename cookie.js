/* Note: Chrome will not save localhost cookies!! 
 unless you start it with the --enable-file-cookies flag */

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function save_key()
{
	if (document.fm.save_key_checkbox.checked) // save key if checked
	{
		console.log(document.fm.key.value);
		var key = document.fm.key.value;
		//setCookie("key", key, 3000); // expire in 3000 days
		window.localStorage.setItem("key", key); // Phonegap's way
	}
	else // Save key not checked. Delete key
	{
		//setCookie("key", "", 0); 
		window.localStorage.removeItem("key"); // Phonegap's way
	}
	
} // end function save_key()

// get current cookie if it exists
//var saved_key = getCookie("key");
var saved_key = window.localStorage.getItem("key"); // Phonegap's way
//if (saved_key != "")
if (saved_key != null) // Phonegap's way
{
	document.fm.key.value = saved_key; // put key in form
	document.fm.save_key_checkbox.checked = true; // check the checkbox
}
