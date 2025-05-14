package Controller.Actions;

import Model.Offer;
import Model.OfferDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class OfferAction implements IAction {

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

        OfferDao offerDao = new OfferDao();
        ArrayList<Offer> offers = offerDao.findAll(null);
        return Offer.toArrayJSon(offers);


    }

}
