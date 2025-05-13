package Controller.Actions;


import Model.Employee;
import Model.EmployeeDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class EmployeeAction implements IAction{
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

        EmployeeDao employeeDao = new EmployeeDao();
        ArrayList<Employee> employees = employeeDao.findAll(new Employee());
        return Employee.toArrayJSon(employees);

    }
}
