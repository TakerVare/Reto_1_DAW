package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;

public class Employee_Shop {
    //Atributos de la clase categoría

    private int id_employee_shop;
    private int id_employee;
    private int id_shop;

    //Constructores
    public Employee_Shop() {

    }

    public Employee_Shop(int id_employee_shop, int id_employee, int id_shop) {
        this.id_employee_shop = id_employee_shop;
        this.id_employee = id_employee;
        this.id_shop = id_shop;
    }
    //Getters y setters

    public int getId_employee_shop() {
        return id_employee_shop;
    }

    public void setId_employee_shop(int id_employee_shop) {
        this.id_employee_shop = id_employee_shop;
    }

    public int getId_employee() {
        return id_employee;
    }

    public void setId_employee(int id_employee) {
        this.id_employee = id_employee;
    }

    public int getId_shop() {
        return id_shop;
    }

    public void setId_shop(int id_shop) {
        this.id_shop = id_shop;
    }


    // Método toString


    @Override
    public String toString() {
        return "Employee_Shop{" +
                "id_employee_shop=" + id_employee_shop +
                ", id_employee=" + id_employee +
                ", id_shop=" + id_shop +
                '}';
    }

    public static String toCadena(Employee_Shop employee_shop) {
        return "Employee_Shop{" +
                "id_employee_shop=" + employee_shop.getId_employee_shop() + ", "+
                "id_employee=" + employee_shop.getId_employee() + ", "
                + "id_shop=" + employee_shop.getId_shop() + '}';
    }

    public static String fromArrayToJson(ArrayList<Employee_Shop> employee_shops){
        String resp = "[";
        for (Employee_Shop employee_shop : employee_shops) {
            resp+= "{" +
                    "id_employee_shop=" + employee_shop.getId_employee_shop() + ", "+
                    "id_employee=" + employee_shop.getId_employee() + ", "
                    + "id_shop=" + employee_shop.getId_shop() + '}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Employee_Shop> employee_shops) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(employee_shops);

        return resp;
    }

}