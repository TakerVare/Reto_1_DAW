package Controller.Actions;

import Model.Delivery;
import Model.DeliveryDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DeliveryAction implements IAction {
    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response, String action) {
        String cadDestino = "";
        switch (action) {
            case "FIND_ALL":
                cadDestino = findAll(request, response);
                break;
            case "DELETE":
                cadDestino = delete(request, response);
                break;
            case "ADD":
                cadDestino = add(request, response);
                break;
            case "UPDATE":
                cadDestino = update(request, response);
                break;

        }
        return cadDestino;
    }
    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        DeliveryDao deliveryDao = new DeliveryDao();
        ArrayList<Delivery> deliveries = deliveryDao.findAll(new Delivery());
        return Delivery.toArrayJSon(deliveries);

    }

    private String delete(HttpServletRequest request, HttpServletResponse response) {
        int idDelivery = Integer.parseInt(request.getParameter("id_delivery"));

        DeliveryDao deliveryDao = new DeliveryDao();
        int result = deliveryDao.delete(idDelivery);

        return "{\"result\":" + result + "}";
    }

    private String add(HttpServletRequest request, HttpServletResponse response) {
        Delivery delivery = new Delivery();
        delivery.setName(request.getParameter("name"));

        DeliveryDao deliveryDao = new DeliveryDao();
        int result = deliveryDao.add(delivery);

        return "{\"result\":" + result + "}";
    }

    private String update(HttpServletRequest request, HttpServletResponse response) {
        Delivery delivery = new Delivery();
        delivery.setId_delivery(Integer.parseInt(request.getParameter("id_delivery")));
        delivery.setName(request.getParameter("name"));

        DeliveryDao deliveryDao = new DeliveryDao();
        int result = deliveryDao.update(delivery);

        return "{\"result\":" + result + "}";
    }
}