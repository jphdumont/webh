// Copyright (c)2004 AuthorIT Software Corporation Ltd.  All rights reserved.


function navBarSwitch() {

//Created by Colin Dawson 2006.07.31 www.info-action.com.au
//Allow user to open parent manually - distribution is permitted with this comment!

   if (self == top){ 
      var myElt1=document.getElementsByTagName('a');
      if (myElt1) {
         for(var i=0;i< myElt1.length;i++){
            if (myElt1[i].className=='navbarOff') {
               myElt1[i].className='navbarOn';
               //myElt1[i].style.display='none';
            }
         }
      }
   }
}

function loadParent() {
  // Function to determine if parent page is loaded, and if not 
  // call index.htm, with parameters passed in query to ensure this
  // page is reloaded into body frame.


    var strTocURL='toc.htm';
    var strBodyURL=location.href;
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
       top.location='index.htm?'+getFilename(strTocURL)+'?'+getFilename(strBodyURL);
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

function loadSearch() {
  // Function to determine if parent page is loaded, and if not 
  // call index.htm, with parameters passed in query to ensure this
  // page is reloaded into body frame.


    var strTocURL='search_toc_template.htm';
    var strBodyURL=location.href;
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
       top.location='index.htm?'+getFilename(strTocURL)+'?'+getFilename(strBodyURL);
    }
}


// Email this page
function emailPage() {
    var siteNameEl = document.getElementById('siteName');
    var siteName = "";
    if(siteNameEl)
        siteName = escape(siteNameEl.value);
    
 //   var sm = Kbase._tocTree.getSelectionModel();
 //   var articleName = "";
 //   if(sm.getSelectedNode())
 //       articleName = escape("(" +sm.getSelectedNode().text + ")");
        
    var topicIdEl = document.getElementById('topicId');
    var topicId = "";
    if(topicIdEl)
        topicId = escape(" " + topicIdEl.value  );

    var pageUrl = escape(document.location.href);
	
	var strBodyURL=location.href;
    
    document.location.href="mailto:?Subject=" + "Link to Opera Help Topic"+ " " + siteName + " : " + getFilename(strBodyURL) + " " + "&Body=" + "You have been sent a link to a page in the Opera Online Help:" + "%0D" + pageUrl ;  
};


// Send Feedback
function feedBack(selectbox,text,value) {
    var feedbackEmailEl = document.getElementById('feedbackEmail');
    var feedbackEmail = "operahelp@micros.com";
    if(feedbackEmailEl)
        feedbackEmail = escape(feedbackEmailEl.value);//URL encode 
    
 //   var sm = Kbase._tocTree.getSelectionModel();
 //   var articleName = "";
 //   if(sm.getSelectedNode())
 //       articleName = escape("(" +sm.getSelectedNode().text + ")");
        
    var topicIdEl = document.getElementById('topicId');
    var topicId = "";
    if(topicIdEl)
        topicId = escape(" " + topicIdEl.value  );
		
	var siteNameEl = document.getElementById('siteName');
    var siteName = "";
    if(siteNameEl)
        siteName = escape(siteNameEl.value);
		
//	var feedBackTextE1 = document.getElementbyId('feedBackText');
//	var feedBackText = "";
//	if(feedBackTextE1)
//		feedBackText = escape(feedBackTextE1.value);

    var pageUrl = escape(document.location.href);
	
	var strBodyURL = location.href;

	document.location.href="mailto:" + feedbackEmail + "?Subject=" + "Send Feedback On"+ " " + siteName + " : " + getFilename(strBodyURL) + " " + "&Body=" +  "Your feedback will be reviewed and incorporated into the Opera Online Help as appropriate for the following topic:" + "%0D" + pageUrl + "%0D" + "%0D" + "Was this information helpful? (Yes/No)" + "%0D" + "%0D" + "Comments:" ;  
};


