package Controller.Actions;

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

                //cadDestino = delete(request, response); todo
                break;

        }
        return cadDestino;
    }

    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        CustomerDao customerDao = new CustomerDao();
        ArrayList<Customer> customers = customerDao.findAll(new Customer());
        return Customer.toArrayJSon(customers);

    }

}
