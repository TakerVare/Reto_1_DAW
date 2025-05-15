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
        }
        return cadDestino;
    }

    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        OrderDao orderDao = new OrderDao();
        ArrayList<Order> orders = orderDao.findAll(null);
        return Order.toArrayJSon(orders);


    }

}