<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%--
The taglib directive below imports the JSTL library. If you uncomment it,
you must also add the JSTL library to the project. The Add Library... action
on Libraries node in Projects view can be used to add the JSTL 1.1 library.
--%>
<%--
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
--%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Chat Page</title>
        <script type="text/javascript" src="includes/json2.js"></script>
        <script type="text/javascript" src="includes/JSON_CHAT_Utilities.js"></script>

        <link rel="stylesheet" href="ncss.css" type="text/css" />
        <style>
            
body {
    background: #CCCCFF;
    color: #333300;
    font-family: Georgia, "Times New Roman", Times, serif;
    padding-left: 20px;
    
}

input { 
    
    border:2px solid #390; 
    width:200px; 
    height:24px; 
    font-size:16px; 
    font-weight:bold; 
    line-height:1.6;
}

table {
    height: 75%;
    width: 45%;         
    margin: 10px auto; 
    border: 2px solid #333300;
}

tr,td{
    border: 1px solid #333300;
}

        </style>
       

    </head>
    <body>

        <h1 style="text-align:center">Chatroom</h1>
        <form id ="chatForm" method ="" action = "">
            <input type ="hidden" id ="status" name ="status" value="active" />
            
            <table>
                <tbody>
                <tr>
                    <td>Sender:</td>
                    <td><input type="text" id ="sender" name="sender" value="" size="80" /></td>
                    </tr>
                    <tr>
                        <td>Message:</td>
                        <td><textarea id ="title" name="message" value="" size="80" rows="20" cols="80" ></textarea></td>
                    </tr>
                   
                    <tr>
                        <td></td>
                        <td><input style='margin:auto;alignment-adjust:auto' type="button" name="Submit" value="SUBMIT" id="submit"
                                   onmouseup="genericRemoteCall('Chat','chatForm')"/></td>
                    </tr>
                    <tr>
                        <td>Content:</td>
                        <td id ="message" name="message" rows="8" cols="50"></td>
                            
                    </tr>
                    <tr>
<!--                        <td>Dialog</td>
                        <td><div id ="dialog" name="dialog">
                            </div></td>-->
                    </tr>
                    <tr>
                        
<!--                        <td><input style='margin:auto;' type="button" name="Submit" value="SAVE" id="submit"
                                   onmouseup="startChatRemoteCall()"/></p></td>-->
                    </tr>
                    
                </tbody>
            </table>
        </form>
    </body>
    
</html>
