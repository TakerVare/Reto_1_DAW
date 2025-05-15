package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Tax {
    //Atributos
    private int id_tax;
    private String name;
    private double percentage;

    //Constructores

    public Tax(){

    }

    public Tax(int id_tax, String name, double percentage) {
        this.id_tax = id_tax;
        this.name = name;
        this.percentage = percentage;
    }

    // Getters y Setters

    public int getId_tax() {
        return id_tax;
    }

    public void setId_tax(int id_tax) {
        this.id_tax = id_tax;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }


    // Método toString


    @Override
    public String toString() {
        return "Tax{" +
                "id_tax=" + id_tax +
                ", name='" + name + '\'' +
                ", percentage=" + percentage +
                '}';
    }

    public static String toCadena(Tax tax) {
        return "Tax{" +
                " id_tax=" + tax.getId_tax() + ","
                + " name =" + tax.getName() + ", "
                + "percentage=" + tax.getPercentage() +'}';
    }

    public static String fromArrayToJson(ArrayList<Tax> taxes){
        String resp = "[";
        for (Tax tax : taxes) {
            resp+= "{" +
                    " id_tax=" + tax.getId_tax() + ","
                    + " name =" + tax.getName() + ", "
                    + "percentage='" + tax.getPercentage() +'}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Tax> taxes) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(taxes);

        return resp;
    }

}
