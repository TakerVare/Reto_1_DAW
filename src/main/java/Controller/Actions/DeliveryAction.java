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

                //cadDestino = delete(request, response); todo
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
}