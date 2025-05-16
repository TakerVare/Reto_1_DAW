package Controller.Actions;

import Model.Job_Offer;
import Model.Job_OfferDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class JobOfferAction implements IAction {

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

        Job_OfferDao job_offerDao = new Job_OfferDao();
        ArrayList<Job_Offer> job_offers = job_offerDao.findAll(null);
        return Job_Offer.toArrayJSon(job_offers);


    }

}
