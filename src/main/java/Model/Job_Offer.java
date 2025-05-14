package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Job_Offer {
    //Atributos
    private int id_job_offer;
    private int id_rol;
    private int id_shop;
    private String name;
    private String description;

    //Constructores

    public Job_Offer(){

    }

    public Job_Offer(int id_job_offer, int id_rol, int id_shop, String name, String description) {
        this.id_job_offer = id_job_offer;
        this.id_rol = id_rol;
        this.id_shop = id_shop;
        this.name = name;
        this.description = description;
    }
// Getters y Setters

    public int getId_job_offer() {
        return id_job_offer;
    }

    public void setId_job_offer(int id_job_offer) {
        this.id_job_offer = id_job_offer;
    }

    public int getId_rol() {
        return id_rol;
    }

    public void setId_rol(int id_rol) {
        this.id_rol = id_rol;
    }

    public int getId_shop() {
        return id_shop;
    }

    public void setId_shop(int id_shop) {
        this.id_shop = id_shop;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    // Método toString


    @Override
    public String toString() {
        return "Job_Offer{" +
                "id_job_offer=" + id_job_offer +
                ", id_rol=" + id_rol +
                ", id_shop=" + id_shop +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }

    public static String toCadena(Job_Offer job_offer) {
        return "Job_Offer{" +
                "id_job_offer=" + job_offer.getId_job_offer() + ", "
                + " id_rol=" + job_offer.getId_rol() + ","
                + " id_shop=" + job_offer.getId_shop() + ", "
                + " name =" + job_offer.getName() + ", "
                + "description =" + job_offer.getDescription() +'}';
    }

    public static String fromArrayToJson(ArrayList<Job_Offer> job_offers){
        String resp = "[";
        for (Job_Offer job_offer : job_offers) {
            resp+= "{" +
                    "id_job_offer=" + job_offer.getId_job_offer() + ", "
                    + " id_rol=" + job_offer.getId_rol() + ","
                    + " id_shop=" + job_offer.getId_shop() + ", "
                    + " name =" + job_offer.getName() + ", "
                    + "description =" + job_offer.getDescription() +'}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Job_Offer> job_offers) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(job_offers);

        return resp;
    }

}
