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

        EmployeeDao employeeDao = new EmployeeDao();
        ArrayList<Employee> employees = employeeDao.findAll(new Employee());
        return Employee.toArrayJSon(employees);
    }

    private String delete(HttpServletRequest request, HttpServletResponse response) {
        int idEmployee = Integer.parseInt(request.getParameter("id_employee"));

        EmployeeDao employeeDao = new EmployeeDao();
        int result = employeeDao.delete(idEmployee);

        return "{\"result\":" + result + "}";
    }

    private String add(HttpServletRequest request, HttpServletResponse response) {
        Employee employee = new Employee();
        employee.setFirstName(request.getParameter("first_name"));
        employee.setLastName(request.getParameter("last_name"));
        employee.setEmail(request.getParameter("email"));
        employee.setPassword(request.getParameter("password"));
        employee.setIdRol(Integer.parseInt(request.getParameter("id_rol")));

        EmployeeDao employeeDao = new EmployeeDao();
        int result = employeeDao.add(employee);

        return "{\"result\":" + result + "}";
    }

    private String update(HttpServletRequest request, HttpServletResponse response) {
        Employee employee = new Employee();
        employee.setIdEmployee(Integer.parseInt(request.getParameter("id_employee")));
        employee.setFirstName(request.getParameter("first_name"));
        employee.setLastName(request.getParameter("last_name"));
        employee.setEmail(request.getParameter("email"));
        employee.setPassword(request.getParameter("password"));
        employee.setIdRol(Integer.parseInt(request.getParameter("id_rol")));

        EmployeeDao employeeDao = new EmployeeDao();
        int result = employeeDao.update(employee);

        return "{\"result\":" + result + "}";
    }

}
