package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;

public class City {
    //Atributos de la clase categoría

    private int id_city;
    private String name;

    //Constructores
    public City() {

    }
    public City(int id_city) {
        this.id_city = id_city;
    }
    public City(int id_city, String name) {
        this.id_city = id_city;
        this.name = name;
    }

    //Getters y setters


    public int getId_city() {
        return id_city;
    }

    public void setId_city(int id_city) {
        this.id_city = id_city;
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
        return "City{" +
                "id_city=" + id_city +
                ", name='" + name + '\'' +
                '}';
    }


    public static String toCadena(City city) {
        return "City{" +
                "id_city=" + city.getId_city() + ", "
                + " name=" + city.getName() + '}';
    }

    public static String fromArrayToJson(ArrayList<City> cities){
        String resp = "[";
        for (City city : cities) {
            resp+= "{" +
                    "id_city=" + city.getId_city() + ", "
                    + "name=" + city.getName() + "}";
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<City> cities) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(cities);

        return resp;
    }

}