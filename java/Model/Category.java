package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;

public class Category {
    //Atributos de la clase categoría

    private int id_category;
    private String name;

    //Constructores
    public Category() {

    }
    public Category(int id_category) {
        this.id_category = id_category;
    }
    public Category(int id_category, String name) {
        this.id_category = id_category;
        this.name = name;
    }

    //Getters y setters


    public int getId_category() {
        return id_category;
    }

    public void setId_category(int id_category) {
        this.id_category = id_category;
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
        return "Category{" +
                "id_category=" + id_category +
                ", name='" + name + '\'' +
                '}';
    }


    public static String toCadena(Category category) {
        return "Category{" +
                "id_category=" + category.getId_category() + ", "
                + " name=" + category.getName() + '}';
    }

    public static String fromArrayToJson(ArrayList<Category> categories){
        String resp = "[";
        for (Category category : categories) {
            resp+= "{" +
                    "id_category=" + category.getId_category() + ", "
                    + "name=" + category.getName() + "}";
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Category> categories) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(categories);

        return resp;
    }

}
