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

        CityDao cityDao = new CityDao();
        ArrayList<City> cities = cityDao.findAll(new City());
        return City.toArrayJSon(cities);

    }

    private String delete(HttpServletRequest request, HttpServletResponse response) {
        int idCity = Integer.parseInt(request.getParameter("id_city"));

        CityDao cityDao = new CityDao();
        int result = cityDao.delete(idCity);

        return "{\"result\":" + result + "}";
    }

    private String add(HttpServletRequest request, HttpServletResponse response) {
        City city = new City();
        city.setName(request.getParameter("name"));

        CityDao cityDao = new CityDao();
        int result = cityDao.add(city);

        return "{\"result\":" + result + "}";
    }

    private String update(HttpServletRequest request, HttpServletResponse response) {
        City city = new City();
        city.setId_city(Integer.parseInt(request.getParameter("id_city")));
        city.setName(request.getParameter("name"));

        CityDao cityDao = new CityDao();
        int result = cityDao.update(city);

        return "{\"result\":" + result + "}";
    }

}