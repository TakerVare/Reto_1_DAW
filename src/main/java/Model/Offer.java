package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Offer {
    //Atributos de la clase Product
    private int id_offer;
    private String name;
    private double discount;
    private String start_date;
    private String end_date;

    //Constructores

    public Offer(){

    }

    public Offer(int id_offer, String name, double discount, String start_date, String end_date) {
        this.id_offer = id_offer;
        this.name = name;
        this.discount = discount;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    // Getters y Setters

    public int getId_offer() {
        return id_offer;
    }

    public void setId_offer(int id_offer) {
        this.id_offer = id_offer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }


    // Método toString


    @Override
    public String toString() {
        return "Offer{" +
                "id_offer=" + id_offer +
                ", name='" + name + '\'' +
                ", discount=" + discount +
                ", start_date='" + start_date + '\'' +
                ", end_date='" + end_date + '\'' +
                '}';
    }

    public static String toCadena(Offer offer) {
        return "Offer{" +
                "id_offer=" + offer.getId_offer() + ", "
                + " name=" + offer.getName() + ","
                + " discount=" + offer.getDiscount() + ", "
                + " start_date =" + offer.getStart_date() + ", "
                + "end_date =" + offer.getEnd_date() +'}';
    }

    public static String fromArrayToJson(ArrayList<Offer> offers){
        String resp = "[";
        for (Offer offer : offers) {
            resp+= "{" +
                    "id_offer=" + offer.getId_offer() + ", "
                    + " name=" + offer.getName() + ","
                    + " discount=" + offer.getDiscount() + ", "
                    + " start_date =" + offer.getStart_date() + ", "
                    + "end_date =" + offer.getEnd_date() +'}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Offer> offers) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(offers);

        return resp;
    }

}
