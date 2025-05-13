package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Employee {
    //Atributos de la clase Product
    private int id_employee;
    private int id_rol;
    private String first_name;
    private String last_name;
    private String email;
    private String password;

    //Constructores

    public Employee(){

    }

    public Employee(int id_employee, int id_rol, String first_name, String last_name, String email, String password) {
        this.id_employee = id_employee;
        this.id_rol = id_rol;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    // Getters y Setters


    public int getId_employee() {
        return id_employee;
    }

    public void setId_employee(int id_employee) {
        this.id_employee = id_employee;
    }

    public int getId_rol() {
        return id_rol;
    }

    public void setId_rol(int id_rol) {
        this.id_rol = id_rol;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id_employee=" + id_employee +
                ", id_rol=" + id_rol +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public static String toCadena(Employee employee) {
        return "Employee{" +
                "id_employee=" + employee.getId_employee()
                + ", id_rol=" + employee.getId_rol()
                + ", first_name='" + employee.getFirst_name()
                + ", last_name='" + employee.getLast_name()
                + ", email='" + employee.getEmail()
                + ", password='" + employee.getPassword() +'}';
    }

    public static String fromArrayToJson(ArrayList<Employee> employees){
        String resp = "[";
        for (Employee employee : employees) {
            resp+= "{" +
                    "id_employee=" + employee.getId_employee() + ", "
                    + " id_rol=" + employee.getId_rol() + ","
                    + " first_name=" + employee.getFirst_name() + ", "
                    + " last_name =" + employee.getLast_name() + ", "
                    + " email =" + employee.getEmail()
                    + ", password=" + employee.getPassword() +"}";
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
