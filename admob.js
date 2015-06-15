/* Put in config.xml:
<gap:plugin name="com.google.cordova.admob" source="plugins.cordova.io" />
Does it also require cordova.js?? beceause it is not working for me!
Now it is working.  Maybe it required cordova.js to be specified in index.html
even though I don't need a copy of cordova.js because phonegap builds it itself.

New location after July 2015:
<gap:plugin name="cordova-plugin-admob" source="npm"/>
*/
if (document.getElementById('footer'))
	var footer = document.getElementById('footer');
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-6159883332285612/9159597365',
        interstitial: ''  
    };
    if (document.getElementById('footer'))
    	footer.innerHTML += "Android";
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6159883332285612/4589796965',
        interstitial: ''   
    };
    if (document.getElementById('footer'))
		footer.innerHTML += "iOS";
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6159883332285612/9019996560',
        interstitial: ''   
    };
    if (document.getElementById('footer'))
    	footer.innerHTML += "Other";
}

function initApp() {
	if(typeof AdMob !== "undefined")
	{
		if (document.getElementById('footer'))
			footer.innerHTML += " AdMob";
	}
	else 
	{
		if (document.getElementById('footer'))	
			footer.innerHTML += " None";	
	}
	 AdMob.createBanner( {
        adId: admobid.banner, 
        isTesting: false,
        overlap: false, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: 'black'
    } );	
}

document.addEventListener('deviceready', initApp, false);



