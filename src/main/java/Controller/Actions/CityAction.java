package Controller.Actions;

import Model.City;
import Model.CityDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CityAction implements IAction {
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

    /* private String delete(HttpServletRequest request,
                           HttpServletResponse response){
         CityDao cityDao = new CityDao();
         Integer iRes = cityDao.delete();

     }*/
    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        CityDao cityDao = new CityDao();
        ArrayList<City> cities = cityDao.findAll(new City());
        return City.toArrayJSon(cities);


    }
}