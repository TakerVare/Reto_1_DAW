package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Payment_Method {
    //Atributos
    private int id_payment;
    private String name;

    //Constructores

    public Payment_Method(){

    }

    public Payment_Method(int id_payment, String name) {
        this.id_payment = id_payment;
        this.name = name;
    }

    // Getters y Setters

    public int getId_payment() {
        return id_payment;
    }

    public void setId_payment(int id_payment) {
        this.id_payment = id_payment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    // Método toString


    @Override
    public String toString() {
        return "Payment_Method{" +
                "id_payment=" + id_payment +
                ", name='" + name + '\'' +
                '}';
    }

    public static String toCadena(Payment_Method payment_method) {
        return "Payment_Method{" +
                "id_payment=" + payment_method.getId_payment() + ", "
                + " name =" + payment_method.getName() +'}';
    }

    public static String fromArrayToJson(ArrayList<Payment_Method> payment_methods){
        String resp = "[";
        for (Payment_Method payment_method : payment_methods) {
            resp+= "{" +
                    "id_payment=" + payment_method.getId_payment() + ", "
                    + " name =" + payment_method.getName() +'}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Payment_Method> payment_methods) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(payment_methods);

        return resp;
    }

}

