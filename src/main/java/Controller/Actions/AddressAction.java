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

        // Crear un objeto Address para usar como filtro
        Address addressFilter = new Address();

        // Comprobar si viene el parámetro id_customer y añadirlo al filtro
        String idCustomerParam = request.getParameter("id_customer");
        if (idCustomerParam != null && !idCustomerParam.isEmpty()) {
            try {
                int idCustomer = Integer.parseInt(idCustomerParam);
                addressFilter.setId_customer(idCustomer);
                System.out.println("Filtrando direcciones por id_customer: " + idCustomer);
            } catch (NumberFormatException e) {
                System.out.println("Error al parsear id_customer: " + e.getMessage());
            }
        }

        // Comprobar si viene el parámetro id_address y añadirlo al filtro
        String idAddressParam = request.getParameter("id_address");
        if (idAddressParam != null && !idAddressParam.isEmpty()) {
            try {
                int idAddress = Integer.parseInt(idAddressParam);
                addressFilter.setId_address(idAddress);
                System.out.println("Filtrando direcciones por id_address: " + idAddress);
            } catch (NumberFormatException e) {
                System.out.println("Error al parsear id_address: " + e.getMessage());
            }
        }

        // Comprobar si viene el parámetro id_city y añadirlo al filtro
        String idCityParam = request.getParameter("id_city");
        if (idCityParam != null && !idCityParam.isEmpty()) {
            try {
                int idCity = Integer.parseInt(idCityParam);
                addressFilter.setId_city(idCity);
                System.out.println("Filtrando direcciones por id_city: " + idCity);
            } catch (NumberFormatException e) {
                System.out.println("Error al parsear id_city: " + e.getMessage());
            }
        }

        // También podemos añadir otros parámetros como street, state, zip, etc.
        String streetParam = request.getParameter("street");
        if (streetParam != null && !streetParam.isEmpty()) {
            addressFilter.setStreet(streetParam);
            System.out.println("Filtrando direcciones por street: " + streetParam);
        }

        String stateParam = request.getParameter("state");
        if (stateParam != null && !stateParam.isEmpty()) {
            addressFilter.setState(stateParam);
            System.out.println("Filtrando direcciones por state: " + stateParam);
        }

        String zipParam = request.getParameter("zip");
        if (zipParam != null && !zipParam.isEmpty()) {
            addressFilter.setZip(zipParam);
            System.out.println("Filtrando direcciones por zip: " + zipParam);
        }

        // Ahora usamos el objeto Address con los filtros para la consulta

        AddressDao addressDao = new AddressDao();
        ArrayList<Address> addresses = addressDao.findAll(addressFilter);
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