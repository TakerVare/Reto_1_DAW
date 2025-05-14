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
            case "ADD":
                cadDestino = add(request, response);
                break;
            case "DELETE":
                cadDestino = delete(request, response);
                break;
            case "UPDATE":
                cadDestino = update(request, response);
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

    private String add(HttpServletRequest request, HttpServletResponse response) {
        Address address = new Address();
        address.setId_customer(Integer.parseInt(request.getParameter("id_customer")));
        address.setId_city(Integer.parseInt(request.getParameter("id_city")));
        address.setStreet(request.getParameter("street"));
        address.setState(request.getParameter("state"));
        address.setZip(request.getParameter("zip"));
        address.setFavourite(Integer.parseInt(request.getParameter("favourite")));

        AddressDao addressDao = new AddressDao();
        int result = addressDao.add(address);

        return "{\"result\":" + result + "}";
    }

    private String delete(HttpServletRequest request, HttpServletResponse response) {
        int idAddress = Integer.parseInt(request.getParameter("id_address"));

        AddressDao addressDao = new AddressDao();
        int result = addressDao.delete(idAddress);

        return "{\"result\":" + result + "}";
    }

    private String update(HttpServletRequest request, HttpServletResponse response) {
        Address address = new Address();
        address.setId_address(Integer.parseInt(request.getParameter("id_address")));
        address.setId_customer(Integer.parseInt(request.getParameter("id_customer")));
        address.setId_city(Integer.parseInt(request.getParameter("id_city")));
        address.setStreet(request.getParameter("street"));
        address.setState(request.getParameter("state"));
        address.setZip(request.getParameter("zip"));
        address.setFavourite(Integer.parseInt(request.getParameter("favourite")));

        AddressDao addressDao = new AddressDao();
        int result = addressDao.update(address);

        return "{\"result\":" + result + "}";
    }



}