package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Order_Detail {
    //Atributos
    private int id_order_detail;
    private int id_order;
    private int id_product;
    private double line_price;

    //Constructores

    public Order_Detail(){

    }

    public Order_Detail(int id_order_detail, int id_order, int id_product, double line_price) {
        this.id_order_detail = id_order_detail;
        this.id_order = id_order;
        this.id_product = id_product;
        this.line_price = line_price;
    }
    // Getters y Setters

    public int getId_order_detail() {
        return id_order_detail;
    }

    public void setId_order_detail(int id_order_detail) {
        this.id_order_detail = id_order_detail;
    }

    public int getId_order() {
        return id_order;
    }

    public void setId_order(int id_order) {
        this.id_order = id_order;
    }

    public int getId_product() {
        return id_product;
    }

    public void setId_product(int id_product) {
        this.id_product = id_product;
    }

    public double getLine_price() {
        return line_price;
    }

    public void setLine_price(double line_price) {
        this.line_price = line_price;
    }


    // Método toString


    @Override
    public String toString() {
        return "Order_Detail{" +
                "id_order_detail=" + id_order_detail +
                ", id_order=" + id_order +
                ", id_product=" + id_product +
                ", line_price=" + line_price +
                '}';
    }

    public static String toCadena(Order_Detail order_detail) {
        return "Order_Detail{" +
                "id_order_detail=" + order_detail.getId_order_detail() + ", "
                + " id_order=" + order_detail.getId_order() + ","
                + " id_product=" + order_detail.getId_product() + ", "
                + "line_price =" + order_detail.getLine_price() +'}';
    }

    public static String fromArrayToJson(ArrayList<Order_Detail> order_details){
        String resp = "[";
        for (Order_Detail order_detail : order_details) {
            resp+= "{" +
                    "id_order_detail=" + order_detail.getId_order_detail() + ", "
                    + " id_order=" + order_detail.getId_order() + ","
                    + " id_product=" + order_detail.getId_product() + ", "
                    + "line_price =" + order_detail.getLine_price() +'}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Order_Detail> order_details) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(order_details);

        return resp;
    }

}
