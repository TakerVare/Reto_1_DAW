package Controller.Actions;

import Model.Tax;
import Model.TaxDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class TaxAction implements IAction {

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

        TaxDao taxDao = new TaxDao();
        ArrayList<Tax> taxes = taxDao.findAll(null);
        return Tax.toArrayJSon(taxes);


    }

}
