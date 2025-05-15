package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Shop {
    //Atributos
    private int id_shop;
    private int id_city;
    private String phone_number;
    private String email;

    //Constructores

    public Shop(){

    }

    public Shop(int id_shop, int id_city, String phone_number, String email) {
        this.id_shop = id_shop;
        this.id_city = id_city;
        this.phone_number = phone_number;
        this.email = email;
    }

    // Getters y Setters

    public int getId_shop() {
        return id_shop;
    }

    public void setId_shop(int id_shop) {
        this.id_shop = id_shop;
    }

    public int getId_city() {
        return id_city;
    }

    public void setId_city(int id_city) {
        this.id_city = id_city;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // Método toString


    @Override
    public String toString() {
        return "Shop{" +
                "id_shop=" + id_shop +
                ", id_city=" + id_city +
                ", phone_number='" + phone_number + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    public static String toCadena(Shop shop) {
        return "Shop{" +
                "id_shop=" + shop.getId_shop() + ", "
                + " id_rol=" + shop.getId_city() + ","
                + " phone_number =" + shop.getPhone_number() + ", "
                + "email =" + shop.getEmail() +'}';
    }

    public static String fromArrayToJson(ArrayList<Shop> shops){
        String resp = "[";
        for (Shop shop : shops) {
            resp+= "{" +
                    "id_shop=" + shop.getId_shop() + ", "
                    + " id_rol=" + shop.getId_city() + ","
                    + " phone_number =" + shop.getPhone_number() + ", "
                    + "email =" + shop.getEmail() +'}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Shop> shops) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(shops);

        return resp;
    }

}

