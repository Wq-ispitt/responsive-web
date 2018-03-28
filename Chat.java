/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mbs;


import java.io.*;
import java.net.*;

import javax.servlet.*;
import javax.servlet.http.*;
import org.json.*;

/**
 *
 * @author spring
 */
public class Chat extends HttpServlet {
   
    /** 
    * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
    * @param request servlet request
    * @param response servlet response
    */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {response.setContentType("text/html;charset=UTF-8");
    
        char[] cbuf = new char[200];
        String[] names;
        String[] values = new String[20];
        int amtread;
        JSONObject jo,jo2;
        PrintWriter out = response.getWriter();
        BufferedReader in = request.getReader();
        amtread = in.read(cbuf);
        cbuf[amtread]='\0';
        String invalue = new String(cbuf,0,amtread);
        
        try{
            jo=new JSONObject(invalue);
            jo2=new JSONObject();
            names = JSONObject.getNames(jo); 
            System.out.println("Read: "+amtread);
            System.out.println("Text: "+invalue);
            
            for (int j =0; j<names.length;j++){
                values[j]=jo.getString(names[j]);
            }
            
            for (int j =0; j<names.length;j++){
                jo2.append("out"+names[j], "mod"+values[j]);
            }
            
            out.println(jo2.toString()); 
            
            }
        
        catch(Exception e)
           {e.printStackTrace();
            System.out.println("what the hell");
           }
        
        finally { 
            out.close();
        }
    }
    

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
    * Handles the HTTP <code>GET</code> method.
    * @param request servlet request
    * @param response servlet response
    */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
    } 

    /** 
    * Handles the HTTP <code>POST</code> method.
    * @param request servlet request
    * @param response servlet response
    */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
    * Returns a short description of the servlet.
    */
    public String getServletInfo() {
        return "Short description";
    }
    // </editor-fold>
}

