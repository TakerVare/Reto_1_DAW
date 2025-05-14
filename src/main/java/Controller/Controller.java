/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import Controller.Actions.*;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.*;

import javax.servlet.annotation.WebServlet;
/**
 *
 * @author S2-PC00
 */
@WebServlet(name = "Controller", urlPatterns = {"/Controller"})
public class Controller extends HttpServlet {    
    
    protected void processRequest(HttpServletRequest request, 
                                  HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //ACTION=PELICULA.FIND_ALL
        String action = request.getParameter("ACTION");
        String[] arrayAction = new String[2];
        if (action != "")
        {
            arrayAction = action.split("\\."); //[0] CATEGORY <-> [1] FIND_ALL
        }
        switch (arrayAction[0].toUpperCase())
        {
            case "PELICULA":
            {
                out.print(new PeliculaAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "PRODUCT":
            {
                out.print(new ProductAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "CATEGORY":
            {
                out.print(new CategoryAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "CITY":
            {
                out.print(new CityAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "DELIVERY":
            {
                out.print(new DeliveryAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "EMPLOYEE":
            {
                out.print(new EmployeeAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "ADDRESS":
            {
                out.print(new AddressAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "EMPLOYEE_SHOP":
            {
                out.print(new Employee_ShopAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "JOB_OFFER":
            {
                out.print(new Job_OfferAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "OFFER":
            {
                out.print(new OfferAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "ORDER":
            {
                out.print(new OrderAction().execute(request,response, arrayAction[1]));
                break;
            }
            case "ORDER_DETAIL":
            {
                out.print(new Order_DetailAction().execute(request,response, arrayAction[1]));
                break;
            }
            default:
            {                
                System.out.println(action); 
                throw new ServletException ("Acción " + action +" no valida");                
            }
        }
        
        System.out.println(action);
    }
    
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, 
                         HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(  HttpServletRequest request, 
                            HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

