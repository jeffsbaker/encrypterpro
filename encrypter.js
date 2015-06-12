//Important note: Use -20 to work in Firefox and IE
textbox = new String;
fmtextbox = new String;
var timer = 50;
var wordWrapChar = 182; // paragraph mark ¶
//var wordWrapChar = 27; // esc char
var default_cols = document.fm.textbox.cols;

function wordWrap(textbox)
{
	if (document.fm.insert)
	if (document.fm.insert.value == 'On')  // if insert message is on
	{
		comp = textbox.search(document.fm.test.value);
		if (comp != -1) // if they didn't delete the help message
			textbox = textbox.replace(document.fm.test.value, "");
	}
	
	var space = 0;  // takes on the position of spaces
	var begin = 0;  // takes on position of beginning of lines
	var linelength = 0;  // takes on the length of each line
	var textwidth = document.fm.textbox.cols + 1;  // width of textbox in COLS (33)
	//var textwidth = Math.floor(document.fm.textbox.clientWidth / 16);
	//console.log(textwidth);
	//document.fm.textbox.style.width = parseInt(document.fm.textbox.style.width) + 50 + "px";
	document.fm.textbox.cols = default_cols + 2;

	var textlength = textbox.length;
	var letter;
	var newtextbox = "";

	
	for (i = 0; i < textlength; i++)
	{
		letter = textbox.charCodeAt(i);
		
		if (letter == 32 || letter == 45)  // if space or dash
			space = i;  // position of space
		if (letter == 10)  // if CR
		{
			newtextbox += textbox.substring(begin, i + 1);
			begin = i + 1;  // position of CR
		}
		
			
		linelength = i - begin;
			
		if (linelength >= textwidth)  // then we need to add a CR
		{
			if (space > begin) // if there is a space in current line
				i = space;  // back up to space and add wordwrap
			newtextbox += textbox.substring(begin, i + 1);
			newtextbox += String.fromCharCode(wordWrapChar) +
						String.fromCharCode(10);
			begin = i + 1;
		}
	} // end for
	newtextbox += textbox.substring(begin, i);	
	//document.fm.textbox.value = newtextbox;
	//alert();
	if (document.fm.insert)
	if (document.fm.insert.value == 'On')  // if insert help is on
		if (comp != -1) // if they didn't delete the help message
			newtextbox = document.fm.test.value + newtextbox;
	
	return(newtextbox);

}  // end function wordWrap(textbox)


function removeWrap(textbox)
{
	var delwrap = textbox;
	//document.fm.textbox.style.width = parseInt(document.fm.textbox.style.width) - 50 + "px";
	document.fm.textbox.cols = default_cols;
	// for IE
	var regExp = new RegExp(String.fromCharCode(wordWrapChar) + 
		String.fromCharCode(13) + String.fromCharCode(10),"gi");
		
	textbox = delwrap.replace(regExp, "");
	
	// for netscape and firefox
	delwrap = textbox;
	var regExp = new RegExp(String.fromCharCode(wordWrapChar) +
		String.fromCharCode(10),"gi");
		
	textbox = delwrap.replace(regExp, "");
	return(textbox);
}  // end function removeWrap(textbox)


function ClipBoard() 
{
	Copied = document.fm.textbox.createTextRange();
	Copied.execCommand("Copy");
	document.fm.textbox.select();
}	// end functuon ClipBoard()

function selectall()
{
	document.fm.textbox.select();
}  // end function selectall()

function closeit()
{
	document.getElementById('message').style.visibility = "hidden";
}  // end function closeit()

function hidekey()
{
	if (document.fm.hide.value == 'Off')  // turn on hide key
	{
		key = document.fm.key.value;
		document.getElementById('pw').innerHTML = 
		'Key: <INPUT SIZE=20 TYPE="password" NAME="key" MAXLENGTH="20" ONKEYPRESS="key_pushed(event);">';
		document.fm.key.value = key;
		document.fm.hide.value = 'On';
	}
	else // turn off hide key
	{
		key = document.fm.key.value;
		document.getElementById('pw').innerHTML = 
		'Key: <INPUT SIZE=20 TYPE="text" NAME="key" MAXLENGTH="20" ONKEYPRESS="key_pushed(event);">';
		document.fm.key.value = key;
		document.fm.hide.value = 'Off';
	}
}  // end function hidekey()

function insertmsg()
{
	if (document.fm.insert.value == 'Off')  // turn on insert
	{
		//textbox = document.fm.textbox.value;
		document.fm.textbox.value = document.fm.test.value + document.fm.textbox.value;
		document.fm.insert.value = 'On';	
		document.fm.insert2.value = 'On';
	}
	else // turn off insert
	{
		document.fm.textbox.value = document.fm.textbox.value.replace(document.fm.test.value, "");
		//document.fm.textbox.value = textbox;
		document.fm.insert.value = 'Off';
		document.fm.insert2.value = 'Off';
	}
} // end function insertmsg(n)	

function formula(letter, n, bit)
{
	// if I put all these characters together it is a total of 89
	var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +  // 24
		"abcdefghijklmnopqrstuvwxyz" +  // 24 + 24 = 48
		"1234567890" +  //  10 + 48 = 58
		"`-=\[];',./" +  // 11 + 58 = 69
		"~!@#$%^&*()";   // 11 + 69 = 80
	var letters2 = "abcdefghijklmnopqrstuvwxyz";
	var numbers = "1234567890";
	var symbols = "`-=\[];',./";
	var symbols2 = "~!@#$%^&*()_+|{}:<>?";
	var inc = 10;
	var pos;
	
	
		// ** SP ** Should be > 32
		if (letter >= 32 && letter < 127)
			inc = 10;
		else return 0;
		
	if ((pos = letters.indexOf(String.fromCharCode(n))) == -1)
	if ((pos = letters2.indexOf(String.fromCharCode(n))) == -1)
	if ((pos = numbers.indexOf(String.fromCharCode(n))) == -1)
	if ((pos = symbols.indexOf(String.fromCharCode(n))) == -1)
	if ((pos = symbols2.indexOf(String.fromCharCode(n))) == -1)
		pos = 4;  // if not found in any of the above characters
	
	//if (pos >= 20)
	//	pos = pos - 20;
	//else if (pos > 10)
	//	pos = pos - 10;
	
	
		 
	if (bit == 1)  // if encrypting
		if (letter + pos + inc >= 127)
			return pos + inc - 95; // ** SP ** should be 94
		else 
			return pos + inc;		
	
	if (bit == 2)  // if decrypting
		if (letter - pos - inc <= 31) // ** SP ** should be 32
			return pos + inc + (-95); // ** SP ** should be 94
		else 
			return pos + inc;
	
	
} // end formula(n)

function resetboxes()
{
	textbox = "";
	fmtextbox = "";
	document.fm.insert.value = 'Off';
	document.fm.insert2.value = 'Off'; 
		
} // end function resetboxes()


function change(bit)
{
	newtextbox = new String;
	//fmtextbox = document.fm.textbox.value;
	var letter;
	var key = document.fm.key.value;
	var textlength = fmtextbox.length;
	var keylength = key.length;
	var n = 0; // position in key
	var j = 0;
	var c = 0;
	
	if (fmtextbox == textbox)
	{
		popup_box('done_box'); //alert("Done");	
		if (bit == 2) // if decrypt
			document.fm.textbox.value = removeWrap(document.fm.textbox.value);
		return;
	}
	newtextbox = ""; // blank newtextbox string
	for(i = 0; i < textlength; i++)
	{
		//letter = String.fromCharCode(fmtextbox.charCodeAt(i));
			
		if (fmtextbox.charCodeAt(i) < textbox.charCodeAt(i))
		{	
			// encrypting
			c = fmtextbox.charCodeAt(i) + 1;
			newtextbox += String.fromCharCode(c);		
			j = 1;
			
		}
		else if (fmtextbox.charCodeAt(i) > textbox.charCodeAt(i))
		{
			// decrypting
			c = fmtextbox.charCodeAt(i) - 1;	
			newtextbox += String.fromCharCode(c);
			j = 1;	
					
		} // end else
		else if (fmtextbox.charCodeAt(i) == textbox.charCodeAt(i))
		{
			c = fmtextbox.charCodeAt(i);
			newtextbox += String.fromCharCode(c);
			//document.fm.test.value += c.toString();
			p = 1;
			
		} // end else
		
	} // end for
	
	if (j == 0 && p == 1)
	{
		popup_box('done_box'); //alert("Done");	
		if (bit == 2) // if decrypt
			document.fm.textbox.value = removeWrap(document.fm.textbox.value);
	}
	
	if (j == 1) // if we aren't done changing the box
	{	
		document.fm.textbox.value = newtextbox;
		fmtextbox = newtextbox;	
		if (document.fm.textbox.value != textbox)
			setTimeout("change("+bit+");", timer);
		else
		{	
			popup_box('done_box'); //alert("Done");	
			if (bit == 2) // if decrypt
				document.fm.textbox.value = removeWrap(document.fm.textbox.value);
		}
	}
} // end function change(textbox)


function encrypter()
{
	document.fm.textbox.value = wordWrap(document.fm.textbox.value);
	//return;
	newtextbox = new String;
	textbox = document.fm.textbox.value;
	var key = document.fm.key.value;
	var textlength = textbox.length;
	var keylength = key.length;
	var n = 0; // position in key
	var letter;
	
	if (document.fm.insert)
	if (document.fm.insert.value == 'On')  // if insert message is on
	{
		comp = textbox.search(document.fm.test.value);
		if (comp != -1) // if they didn't delete the help message
			textbox = textbox.replace(document.fm.test.value, "");
	}
	
	
	newtextbox = ""; // blank newtextbox string
	for (i = 0; i < textlength; i++)
	{
		letter = textbox.charCodeAt(i);
		
		c = textbox.charCodeAt(i) + formula(letter, key.charCodeAt(n), 1);
	
		newtextbox += String.fromCharCode(c);
		
		// the following if statement is because of a difference
		// in firefox.  It does CRLF, 13 and 10,
		// whereas IE only does CR (13).
		// Otherwise I would just need n++;
		//if (letter != 10 && letter != 13 && letter != 32)
		// ** SP ** should be > 32
		if (letter >= 32 && letter < 127)
			n++;
		if (n >= keylength)
			n = 0;	
		//document.fm.test.value += c + ', ';
	} // end for
				
	//document.fm.textbox.value = newtextbox;
	
	textbox = newtextbox;
	fmtextbox = document.fm.textbox.value;
	if (document.fm.insert)
	if (document.fm.insert.value == 'On')  // if insert help is on
		if (comp != -1) // if they didn't delete the help message
			textbox = document.fm.test.value + newtextbox;
	//document.fm.test.value = textbox;
	
	change();
} // end function encrypter()

function decrypter()
{
	
	newtextbox = new String;
	textbox = document.fm.textbox.value;
	var key = document.fm.key.value;
	var textlength = textbox.length;
	var keylength = key.length;
	var n = 0; // position in key
	var letter;
	
	// the following is for gmail:
	// gmail puts a Â (char 194) in front of each
	// extended ASCII character (161-180). So I need
	// to strip the textbox of char 194
	// It appears that sending from yahoo to aol also
	// put in char 194
	textbox = textbox.replace(/Â/g, "");
	textlength = textbox.length;
	document.fm.textbox.value = textbox;
	
	if (document.fm.insert)
	if (document.fm.insert.value == 'On')  // if insert message is on
	{
		comp = textbox.search(document.fm.test.value);
		if (comp != -1) // if they didn't delete the help message
			textbox = textbox.replace(document.fm.test.value, "");
	}	
	
	newtextbox = ""; // blank newtextbox string
	for (i = 0; i < textlength; i++)
	{
		letter = textbox.charCodeAt(i);
		
		c = textbox.charCodeAt(i) - formula(letter, key.charCodeAt(n), 2);
	
		newtextbox += String.fromCharCode(c);			

		// the following if statement is because of a difference
		// in firefox.  It does CRLF, 13 and 10,
		// whereas IE only does CR (13).
		// Otherwise I would just need n++;
		//if (letter != 10 && letter != 13 && letter != 32)
		// ** SP ** should be > 32
		if (letter >= 32 && letter < 127)
			n++;
		if (n >= keylength)
			n = 0;	
		//document.fm.test.value += c + ', ';
		if (n >= keylength)
			n = 0;
	} // end for
	//document.fm.textbox.value = newtextbox;
	
	textbox = newtextbox;
	fmtextbox = document.fm.textbox.value;
	if (document.fm.insert)
	if (document.fm.insert.value == 'On')  // if insert help is on
		if (comp != -1) // if they didn't delete the help message
			textbox = document.fm.test.value + newtextbox;
	//document.fm.test.value = textbox;
	change(2);
	
} // end function decrypter()

function key_pushed(event)
{
	var keyCode = event.keyCode ? event.keyCode : 
                event.which ? event.which : event.charCode;
	
	if(keyCode==13)
	{
		//event.cancelBubble = true;
		//event.returnValue = false;
		//entertext();
		return false;
	}
}  // end key_pushed


function widen_textbox()
{
	// Need settimeout because onpaste fires before text is pasted
	setTimeout(function()
	{ 
		var regExp = new RegExp(String.fromCharCode(wordWrapChar));
		var textbox = document.fm.textbox.value;
		
		if (textbox.match(regExp)) // if encrypted text pasted with paragraph sign
		{
			//document.fm.textbox.style.width = 522 + "px";
			document.fm.textbox.cols = default_cols + 2;
		}
		else // if unencrypted text is pasted
		{
			//document.fm.textbox.style.width = 502 + "px";	
			document.fm.textbox.cols = default_cols;	
		}
	}, 25); 
}

