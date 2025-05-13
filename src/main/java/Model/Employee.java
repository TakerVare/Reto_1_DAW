package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;

public class Employee extends User{

    private int m_iIdEmployee;
    private int m_iIdRol;

    //Constructores
    public Employee() {
    }

    public Employee(int p_iIdEmployee, int p_iIdRol) {
        setIdEmployee(p_iIdEmployee);
        setIdRol(p_iIdRol);
    }

    public Employee(int p_iIduser, String p_strFirstName, String p_strLastName, String p_strEmail, String p_strPassword, int p_iIdEmployee, int p_iIdRol) {
        super(p_iIduser, p_strFirstName, p_strLastName, p_strEmail, p_strPassword);
        setIdEmployee(p_iIdEmployee);
        setIdRol(p_iIdRol);
    }

    //Getters y setters

    public int getIdEmployee() {
        return m_iIdEmployee;
    }

    public void setIdEmployee(int p_iIdEmployee) {
        this.m_iIdEmployee = p_iIdEmployee;
    }

    public int getIdRol() {
        return m_iIdRol;
    }

    public void setIdRol(int p_iIdRol) {
        this.m_iIdRol = p_iIdRol;
    }

    //Métodos de la clase


    @Override
    public String toString() {
        return super.toString() +
                "Employee{" +
                "m_iIdEmployee=" + getIdEmployee() +
                ", m_iIdRol=" + getIdRol() +
                '}';
    }

    public String toCadena(Employee employee) {
        return super.toCadena(employee) +
                "Employee{" +
                "id_employee=" + employee.getIdEmployee() +
                '}';
    }

    public static String fromArrayToJson(ArrayList<Employee> employees){
        String resp = "[";
        for (Employee employee : employees) {
            resp+= "{" +
                    "id_employee=" + employee.getIdEmployee() + ", "
                    + "first_name=" + employee.getFirstName() + ", "
                    + "last_name=" + employee.getLastName() + ", "
                    + "email=" + employee.getEmail() + ", "
                    + "password=" + employee.getPassword() +
                    "}";
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Employee> employees) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(employees);

        return resp;
    }

}
