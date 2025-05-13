package Controller.Actions;

import Model.Address;
import Model.AddressDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class AddressAction implements IAction {

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

        AddressDao addressDao = new AddressDao();
        ArrayList<Address> addresses = addressDao.findAll(null);
        return Address.toArrayJSon(addresses);


    }

}