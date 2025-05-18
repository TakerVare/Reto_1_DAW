package Controller.Actions;

import Model.Address;
import Model.Customer;
import Model.CustomerDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class CustomerAction implements IAction{
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

        // Crear un objeto Address para usar como filtro
        Customer customerFilter = new Customer();

        // Comprobar si viene el parámetro id_customer y añadirlo al filtro
        String idCustomerParam = request.getParameter("id_customer");
        if (idCustomerParam != null && !idCustomerParam.isEmpty()) {
            try {
                int idCustomer = Integer.parseInt(idCustomerParam);
                customerFilter.setiIdCustomer(idCustomer);
                System.out.println("Filtrando clientes por id_customer: " + idCustomer);
            } catch (NumberFormatException e) {
                System.out.println("Error al parsear id_customer: " + e.getMessage());
            }
        }

        CustomerDao customerDao = new CustomerDao();
        ArrayList<Customer> customers = customerDao.findAll(customerFilter);
        return Customer.toArrayJSon(customers);

    }

    private String delete(HttpServletRequest request, HttpServletResponse response) {
        int idCustomer = Integer.parseInt(request.getParameter("id_customer"));

        CustomerDao customerDao = new CustomerDao();
        int result = customerDao.delete(idCustomer);

        return "{\"result\":" + result + "}";
    }

    private String add(HttpServletRequest request, HttpServletResponse response) {
        Customer customer = new Customer();
        customer.setFirstName(request.getParameter("first_name"));
        customer.setLastName(request.getParameter("last_name"));
        customer.setEmail(request.getParameter("email"));
        customer.setPassword(request.getParameter("password"));

        CustomerDao customerDao = new CustomerDao();
        int result = customerDao.add(customer);

        return "{\"result\":" + result + "}";
    }

    private String update(HttpServletRequest request, HttpServletResponse response) {
        Customer customer = new Customer();
        customer.setiIdCustomer(Integer.parseInt(request.getParameter("id_customer")));
        customer.setFirstName(request.getParameter("first_name"));
        customer.setLastName(request.getParameter("last_name"));
        customer.setEmail(request.getParameter("email"));
        customer.setPassword(request.getParameter("password"));

        CustomerDao customerDao = new CustomerDao();
        int result = customerDao.update(customer);

        return "{\"result\":" + result + "}";
    }

}
