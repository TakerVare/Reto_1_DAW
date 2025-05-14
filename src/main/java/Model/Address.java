package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Address {
    //Atributos
    private int id_address;
    private int id_customer;
    private int id_city;
    private String street;
    private String state;
    private String zip;
    private int favourite; // 0 = false , 1= true

    //Constructores

    public Address(){

    }

    public Address(int id_address, int id_customer, int id_city, String street, String state, String zip, int favourite) {
        this.id_address = id_address;
        this.id_customer = id_customer;
        this.id_city = id_city;
        this.street = street;
        this.state = state;
        this.zip = zip;
        this.favourite = favourite;
    }

    // Getters y Setters

    public int getId_address() {
        return id_address;
    }

    public void setId_address(int id_address) {
        this.id_address = id_address;
    }

    public int getId_customer() {
        return id_customer;
    }

    public void setId_customer(int id_customer) {
        this.id_customer = id_customer;
    }

    public int getId_city() {
        return id_city;
    }

    public void setId_city(int id_city) {
        this.id_city = id_city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public int getFavourite() {
        return favourite;
    }

    public void setFavourite(int favourite) {
        this.favourite = favourite;
    }


    // Método toString


    @Override
    public String toString() {
        return "Address{" +
                "id_address=" + id_address +
                ", id_customer=" + id_customer +
                ", id_city=" + id_city +
                ", street='" + street + '\'' +
                ", state='" + state + '\'' +
                ", zip='" + zip + '\'' +
                ", favourite=" + favourite +
                '}';
    }

    public static String toCadena(Address address) {
        return "Address{" +
                "id_address=" + address.getId_address() +
                ", id_customer=" + address.getId_customer() +
                ", id_city=" + address.getId_city() +
                ", street='" + address.getStreet() +
                ", state='" + address.getState() +
                ", zip='" + address.getZip() +
                ", favourite=" + address.getFavourite() +'}';
    }

    public static String fromArrayToJson(ArrayList<Address> addresses){
        String resp = "[";
        for (Address address : addresses) {
            resp+= "{" +
                    "id_address=" + address.getId_address() +
                    ", id_customer=" + address.getId_customer() +
                    ", id_city=" + address.getId_city() +
                    ", street='" + address.getStreet() +
                    ", state='" + address.getState() +
                    ", zip='" + address.getZip() +
                    ", favourite=" + address.getFavourite() +'}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Address> addresses) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(addresses);

        return resp;
    }

}
