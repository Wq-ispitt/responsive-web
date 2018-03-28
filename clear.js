/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function addEvent(e,eType,lamdaFunction,useCapture){
    
    if(e.addEventListener){
        e.addEventListener(eType,lamdaFunction,useCapture);
        return true;
    }
    else if(e.attachEvent){
        var r =e.attachEvent('on'+eType,lamdaFunction);
        return r;
    }
    else{
        return false;
    }
    
}

addEvent(window,'load',init,false);
//call the addEvent function defined

function init(){
    
    var Inputs = document.getElementsByTagName('input');
    for(var j=0;j<Inputs.length;j++){
        var theIn = Inputs[j];
        if(theIn.type == 'text' && theIn.className.match(/\bcleardefault\b/)){
            addEvent(theIn,'focus',clearDefault,false);
            addEvent(theIn,'blur',replaceDefault,false);
            
            if(theIn.value!=''){
                theIn.deText=theIn.value;
            }
            //save the current value
        }
        
    }
}

//logic of clicking on and off, clearDefault/replaceDefault
function clearDefault(e){
    
    var target = window.event ? window.event.srcElement : e? e.target : null;
    if(!target)
        return;
    if(target.value == target.deText){
        target.value = '';
    }
    
}

function replaceDefault(e){
    
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if(!target)
        return;
    if(target.value == '' && target.deText){
        target.value = target.deText;
    }
    
}

