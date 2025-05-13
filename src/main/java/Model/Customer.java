package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;

public class Customer extends User{

    private int m_iIdCustomer;
    //Constructores
    public Customer() {
    }

    public Customer(int p_iIduser, String p_strFirstName, String p_strLastName, String p_strEmail, String p_strPassword, int p_iIdCustomer) {
        super(p_iIduser, p_strFirstName, p_strLastName, p_strEmail, p_strPassword);
        this.m_iIdCustomer = p_iIdCustomer;
    }

    public Customer(int p_iIduser, String p_strFirstName, String p_strLastName, String p_strEmail, String p_strPassword) {
        super(p_iIduser, p_strFirstName, p_strLastName, p_strEmail, p_strPassword);
    }

    public int getiIdCustomer() {
        return m_iIdCustomer;
    }

    public void setiIdCustomer(int p_iIdCustomer) {
        this.m_iIdCustomer = p_iIdCustomer;
    }


    @Override
    public String toString() {
        return super.toString() +
                " Customer{" +
                "Id Customer=" + m_iIdCustomer +
                '}';
    }

    public String toCadena(Customer customer) {
        return super.toCadena(customer) +
                "Customer{" +
                "id_customer=" + customer.getiIdCustomer() +
                '}';
    }

    public static String fromArrayToJson(ArrayList<Customer> customers){
        String resp = "[";
        for (Customer customer : customers) {
            resp+= "{" +
                    "id_customer=" + customer.getiIdCustomer() + ", "
                    + "first_name=" + customer.getFirstName() + ", "
                    + "last_name=" + customer.getLastName() + ", "
                    + "email=" + customer.getEmail() + ", "
                    + "password=" + customer.getPassword() +
                    "}";
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Customer> customers) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(customers);

        return resp;
    }

}
