// JavaScript Document
// Copyright (c)2004 AuthorIT Software Corporation Ltd.  All rights reserved.

function loadParent() {
  // Function to determine if parent page is loaded, and if not 
  // call index.htm, with parameters passed in query to ensure this
  // page is reloaded into body frame.

  if (self==top){ 
    var strTocURL='toc.htm';
    var strBodyURL=location.href;

    //new code added by Colin Dawson 2006.03.04
    //test whether opened in a CHM
    var chmIndex=strBodyURL.lastIndexOf('@MSIT');


    if (chmIndex == -1) {
      // Get toc url
      for (var i = 0; i < document.links.length; i++) {
        if (document.links[i].href.indexOf("toc") != -1) {
          strTocURL=document.links[i].href;
          break;
        }
      }

      // Call parent page
      window.location='index.htm?'+getFilename(strTocURL)+'?'+getFilename(strBodyURL);
    }
  }
}
function getFilename(pstrPath) {
  // Return filename from path

  var lngIndex=pstrPath.lastIndexOf('/');
  if (lngIndex > -1) {
    return pstrPath.slice(lngIndex+1);
  } else {
    return pstrPath;
  }
}

