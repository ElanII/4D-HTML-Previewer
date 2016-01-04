# 4D-HTML-Previewer
A 4D database that makes it easy to view and edit html files using the built in Web Area. 

## Overview
I wanted an easy way to look at html files as I was developing them. Specifically I was working with d3 which requires the pages to be served to enable full functionality. Plus i wante dto be able to work through various examples and tutorials and do it all within the context of a 4D database so I could see how everything worked when I actually need it. 

HTML Previewer lets you do all that. 

### Getting started
This is a v13.6 [4D database](http://www.4d.com) but it should run in higher vervions. (I created it in v15.) The only significant thing missing in the v13 flavor is access to the web inspector in the web area. Simply download this repo and start it with your favorite 4D.

### The Web Server
At start up the database begins and instance of python SimpleHTTPServer on port 8888. It serves web pages located in the html root directory
>HTML_previewer/Resources/html/
On Macintosh python is already installed. On Windows it might be. If not you'll want to find a version of python and install it. 

When you quit the database this webserver is killed. 

*If you regularly use python you may want to change the way Previewer starts and stops the web server.*

### The HTML root directory
You can change the html root directory to any other folder. The root is displayed on the bottom of the form. Just click the button to select a new one. 

Any .html files in the directory will be listed for you to load into the web area. 

### Displaying web pages
The whole point here is to see how web pages behave in the 4D web area. When you click the 'Draw' button Previewer calls this code  (WA_LOAD_FILE): 
```
PROCESS 4D TAGS(pageIn;pageOut)
File_save_asTextDoc (pageOut;Get 4D folder(Current Resources folder)+"html"+Folder separator+"temp.html")

  // see  HTTP_START_localServer
$url:="http://127.0.0.1:8888/temp.html"

  // the inspector pref isn't available until v14
If (Application version#"13@")  // at least v14
  EXECUTE FORMULA("WA SET PREFERENCE(*;\"webArea\";WA enable Web inspector;True)")
End if 

WA SET PREFERENCE(*;"webArea";wa enable JavaScript;True)
WA OPEN URL(*;"webArea";$url)
```
The file is read into pageIn text var when you choose the file. Any [4D tags](http://livedoc.4d.com/4D-Language-Reference-15.1/String/4D-Transformation-Tags.300-2685382.en.html) are processed and it's written to a temp file. The temp file then gets opened in the web area. 

4D tags are pretty cool. They are also specific to the database that's currently running. So if you try to process tags for variables or tables that aren't in HTML Previewer it's obviously not going to work. This is where the Process Tags array comes in. You can create array elements and paste any text values into them. Then you can reference those elements in your html page. This is a handy way to develop and prototype your html. And there's nothing to stop you from adopting the aVar_data array as a standard for working with process tags. 

### Editing your HTML pages
Notice the tabs on the right. You can view the two text variables used when the html page is loaded. 
- pageIn is the page as read from the disk
- pageOut is the page after tags are processed

You can do some basic editing on pageIn. Since you are editing the variable you aren't changing your file. You can simply edit the text and you can insert 4D tags by right clicking. If you have selected a variable from the array you can insert that variable into your code. 
If you want to save the changes click the Save button. 
