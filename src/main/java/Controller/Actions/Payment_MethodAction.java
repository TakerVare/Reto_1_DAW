package Controller.Actions;

import Model.Payment_Method;
import Model.Payment_MethodDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class Payment_MethodAction implements IAction {

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

        Payment_MethodDao payment_methodDao = new Payment_MethodDao();
        ArrayList<Payment_Method> payment_methods = payment_methodDao.findAll(null);
        return Payment_Method.toArrayJSon(payment_methods);


    }

}

