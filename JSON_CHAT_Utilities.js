var browserType;
var jobj;
var timeoutID;
 //functions of startChatRemoteCall(), bruteforceRemoteCall(), checkChatRemoteCall() are intended to work with dbms
 //not yet applied

function bruteforceRemoteCall(target, formid){
    
    jobj={"call":target};
    var sxhr = createXHR();
    var myform;
    sxhr.onreadystatechange = bruteForceResponseHandler;
 //  debugger;
    myform=document.getElementById(formid);
    
    for (i=0;i<myform.length;i++){
      if (myform[i].type == "text")
        jobj[myform[i].name]=myform[i].value;
    }
    document.getElementById("message").innerHTML+=JSON.stringify(jobj);
    sxhr.open("POST", target, true);
    sxhr.send(JSON.stringify(jobj));
    
     // This brute force response handler has no error checking or sophistication
    function bruteForceResponseHandler() {
      // readyState of 4 signifies request is complete
      if (sxhr.readyState == 4) {
	// status of 200 signifies sucessful HTTP call
        if (sxhr.status == 200) {
        // these next lines would deal with what was sent as a JSON object
        var JSONresp = JSON.parse(sxhr.responseText)
               for(each_name in JSONresp) {
                document.getElementById("message").innerHTML += "<br />"+each_name+" = "+JSONresp[each_name];
          }
        }
      }
    }
}  

function startChatRemoteCall() {
    
    jobj={"call":"startChat"};
    var myform;
    var xhr = createXHR();
    xhr.onreadystatechange = processResponse;
    if ((myform=document.getElementById("chatForm"))!= null){
        buildComplexJSON(myform);
    }
    else{
        if(value!=null){
            jobj[value]=value;
        }
    }
    xhr.open("POST", "startChat", true);
    xhr.send(JSON.stringify(jobj));
    
    // This generic internal function should probably have more error checking
    function processResponse() {
        // readyState of 4 signifies request is complete
        if (xhr.readyState == 4) {
            // status of 200 signifies sucessful HTTP call
            if (xhr.status == 200) {
                startChatResponseHandler(xhr.responseText);
            }
        }
    }
}

function startChatResponseHandler(response) {
    //this is a cheap way of processing the response -- preumably as text
    // these next lines would deal with what was sent as a JSON object
    var JSONresp = JSON.parse(response)
    debugger;
    document.getElementById("chatid").value = JSONresp["chatid"];
    document.getElementById("dialog").innerHTML = JSONresp["dialog"];
    timeoutID=setTimeout ( checkChatRemoteCall, 10000 );
}

function checkChatRemoteCall() {
    jobj={
        "call": "checkChat",
        "chatid": document.getElementById("chatid").value
    };
    var xhr = createXHR();
    xhr.onreadystatechange = processResponse;
    xhr.open("POST", "checkChat", true);
    xhr.send(JSON.stringify(jobj));
    // This generic internal function should probably have more error checking
    function processResponse() {
        // readyState of 4 signifies request is complete
        if (xhr.readyState == 4) {
            // status of 200 signifies sucessful HTTP call
            if (xhr.status == 200) {
                checkChatResponseHandler(xhr.responseText);
            }
        }
    }
}

function checkChatResponseHandler(response) {
    //this is a cheap way of processing the response -- preumably as text
    // these next lines would deal with what was sent as a JSON object
    var JSONresp = JSON.parse(response)
    if (JSONresp["status"]==("DONE")){
        clearTimeout(timeoutID);
        }
    else{
         timeoutID = setTimeout ( checkChatRemoteCall, 10000 );
         }
    document.getElementById("dialog").innerHTML += JSONresp["dialog"];
}


function createXHR() {
    // This function creates the correct form of the XMLHttpRequestObject based on the browser
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        XHR = new XMLHttpRequest();
        if (XHR.overrideMimeType) {
            XHR.overrideMimeType('text/html');
        }
        browserType="Mozilla"
        return XHR;
    } //end mozilla attempt
    if (window.ActiveXObject) { // IE
        try {
            XHR = new ActiveXObject("Msxml2.XMLHTTP");
            browserType="IE";
            return XHR;
        }
        catch (e) {
            try {
                XHR = new ActiveXObject("Microsoft.XMLHTTP");
                browserType="IE";
                return XHR;
            }
            catch (e) {
                alert("Your browser does not support AJAX!");
                browserType="Unknown"
                return null;
            }
        }
    }//end IE attempt
    alert("Your browser does not support AJAX!");
    return null;
}


function genericResponseHandler(response) {
    //this is a cheap way of processing the response -- preumably as text
    document.getElementById("out").innerHTML+=response;
    // these next lines would deal with what was sent as a JSON object
    var JSONresp = JSON.parse(response)
               for(each_name in JSONresp) {
                document.getElementById("message").innerHTML += "<br />"+each_name+" = "+JSONresp[each_name];
              }
}

function genericRemoteCall(method,value) {
    jobj={"call":method};
    var myform;
    var xhr = createXHR();
    xhr.onreadystatechange = processResponse;
  // debugger;
   if ((myform=document.getElementById(value))!= null){
      buildComplexJSON(myform);
        }	
     else{
         if(value!=null){
            jobj[value]=value;
            }
         }
    document.getElementById("message").innerHTML+=JSON.stringify(jobj);
    xhr.open("POST", method, true);
    xhr.send(JSON.stringify(jobj));
    
    // This generic internal function should probably have more error checking
    function processResponse() {
      // readyState of 4 signifies request is complete
      if (xhr.readyState == 4) {
	// status of 200 signifies sucessful HTTP call
        if (xhr.status == 200) {
          genericResponseHandler(xhr.responseText);
        }
      }
    }
}


function buildComplexJSON(element){
    for(i=0; i < element.length; i++) {
        var name = element[i].name;
        if (element[i].type == "select-multiple"){
            var llen = element[i].length
            j = 0
            chosen = "["
            for(j= 0; j < llen; j++) {
                if (element[i].options[j].selected) {
                    chosen += element[i].options[j].value+", ";
                }
            }
            chosen = chosen.substring(0,chosen.length-2)+"]"
            jobj[name] = chosen;
        }
        else if(element[i].type == "radio"){
            if (element[i].checked==true) jobj[name] = element[i].value;
        }
        else if(element[i].type == "checkbox"){
            if (element[i].checked==true) jobj[name] = element[i].value;
        }
        else{
            jobj[name] = element[i].value;
        }
    }
    return jobj;
}
