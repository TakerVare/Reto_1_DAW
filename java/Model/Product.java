package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Product {
    //Atributos de la clase Product
    private int id_product;
    private int id_tax;
    private int id_category;
    private String name;
    private String description;
    private double price;
    private String image;

    //Constructores

    public Product(){

    }

    public Product(int id_product, int id_category, String name) {
        this.id_product = id_product;
        this.id_category = id_category;
        this.name = name;
    }

    public Product(int id_product, int id_tax, int id_category, String name, String description, double price, String image) {
        this.id_product = id_product;
        this.id_tax = id_tax;
        this.id_category = id_category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
    // Getters y Setters


    public int getId_product() {
        return id_product;
    }

    public void setId_product(int id_product) {
        this.id_product = id_product;
    }

    public int getId_tax() {
        return id_tax;
    }

    public void setId_tax(int id_tax) {
        this.id_tax = id_tax;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    // Método toString

    @Override
    public String toString() {
        return "Product{" +
                "id_product=" + id_product +
                ", id_tax=" + id_tax +
                ", id_category=" + id_category +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", image='" + image + '\'' +
                '}';
    }

    public static String toCadena(Product product) {
        return "Producto{" +
                "id_product=" + product.getId_product() + ", "
                + " id_tax=" + product.getId_category() + ","
                + " id_category=" + product.getId_category() + ", "
                + " name =" + product.getName() + ", "
                + "description =" + product.getDescription()
                + ", price=" + product.getPrice() + ", "
                + " image= " + product.getImage() +'}';
    }

    public static String fromArrayToJson(ArrayList<Product> products){
        String resp = "[";
        for (Product product : products) {
            resp+= "{" +
                    "id_product=" + product.getId_product() + ", "
                    + " id_tax=" + product.getId_category() + ","
                    + " id_category=" + product.getId_category() + ", "
                    + " name =" + product.getName() + ", "
                    + "description =" + product.getDescription()
                    + ", price=" + product.getPrice() + ", "
                    + " image= " + product.getImage() +"}";
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Product> products) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(products);

        return resp;
    }

}
