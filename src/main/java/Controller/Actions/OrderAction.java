package Controller.Actions;

import Model.Order;
import Model.OrderDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class OrderAction implements IAction {

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response, String action) {
        String cadDestino = "";
        switch (action) {
            case "FIND_ALL":
                cadDestino = findAll(request, response);
                break;
            case "ADD":
                cadDestino = add(request, response);
                break;
        }
        return cadDestino;
    }

    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        //Crear un objeto Order para usar como filtro
        Order orderFilter = new Order();

        // Comprobar si viene el parámetro id_customer y añadirlo al filtro
        String idCustomerParam = request.getParameter("id_customer");
        if (idCustomerParam != null && !idCustomerParam.isEmpty()) {
            try {
                int idCustomer = Integer.parseInt(idCustomerParam);
                orderFilter.setId_customer(idCustomer);
                System.out.println("Filtrando perido por id_customer: " + idCustomer);
            } catch (NumberFormatException e) {
                System.out.println("Error al parsear id_customer: " + e.getMessage());
            }
        }

        OrderDao orderDao = new OrderDao();
        ArrayList<Order> orders = orderDao.findAll(orderFilter);
        return Order.toArrayJSon(orders);
    }

    private String add(HttpServletRequest request, HttpServletResponse response) {
        Order order = new Order();
        order.setId_customer(Integer.parseInt(request.getParameter("id_customer")));
        order.setId_address(Integer.parseInt(request.getParameter("id_address")));
        order.setId_payment(Integer.parseInt(request.getParameter("id_payment")));
        order.setId_shop(Integer.parseInt(request.getParameter("id_shop")));
        order.setId_delivery(Integer.parseInt(request.getParameter("id_delivery")));

        // Añadir id_offer solo si está presente
        String idOfferParam = request.getParameter("id_offer");
        if (idOfferParam != null && !idOfferParam.isEmpty()) {
            order.setId_offer(Integer.parseInt(idOfferParam));
        } else {
            order.setId_offer(1); // Valor por defecto si no se especifica
        }

        // Añadir order_date
        String orderDateParam = request.getParameter("order_date");
        if (orderDateParam != null && !orderDateParam.isEmpty()) {
            order.setOrder_date(orderDateParam);
        } else {
            // Fecha actual en formato YYYY-MM-DD
            java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
            order.setOrder_date(sdf.format(new java.util.Date()));
        }

        OrderDao orderDao = new OrderDao();
        int result = orderDao.add(order);

        return "{\"result\":" + result + "}";
    }

}