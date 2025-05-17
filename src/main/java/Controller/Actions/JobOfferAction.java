package Controller.Actions;

import Model.JobOffer;
import Model.JobOfferDao;

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

        JobOfferDao job_offerDao = new JobOfferDao();
        ArrayList<JobOffer> job_offers = job_offerDao.findAll(null);
        return JobOffer.toArrayJSon(job_offers);


    }

}
