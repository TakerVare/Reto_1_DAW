package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;

public class Delivery {
    //Atributos de la clase categoría

    private int id_delivery;
    private String name;

    //Constructores
    public Delivery() {

    }
    public Delivery(int id_delivery) {
        this.id_delivery = id_delivery;
    }
    public Delivery(int id_delivery, String name) {
        this.id_delivery = id_delivery;
        this.name = name;
    }

    //Getters y setters


    public int getId_delivery() {
        return id_delivery;
    }

    public void setId_delivery(int id_delivery) {
        this.id_delivery = id_delivery;
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
        return "Delivery{" +
                "id_delivery=" + id_delivery +
                ", name='" + name + '\'' +
                '}';
    }


    public static String toCadena(Delivery delivery) {
        return "Delivery{" +
                "id_delivery=" + delivery.getId_delivery() + ", "
                + " name=" + delivery.getName() + '}';
    }

    public static String fromArrayToJson(ArrayList<Delivery> deliveries){
        String resp = "[";
        for (Delivery delivery : deliveries) {
            resp+= "{" +
                    "id_delivery=" + delivery.getId_delivery() + ", "
                    + "name=" + delivery.getName() + "}";
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Delivery> deliveries) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(deliveries);

        return resp;
    }

}
