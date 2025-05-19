package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import java.util.Arrays;


public class Order {
    //Atributos
    private int id_order;
    private int id_customer;
    private int id_address;
    private int id_payment;
    private int id_shop;
    private int id_delivery;
    private int id_offer;
    private String order_date;
    private int[] order_detail;

    //Constructores

    public Order(){

    }

    public Order(int id_order, int id_customer, int id_address, int id_payment, int id_shop, int id_delivery, int id_offer, String order_date, int[] order_detail) {
        this.id_order = id_order;
        this.id_customer = id_customer;
        this.id_address = id_address;
        this.id_payment = id_payment;
        this.id_shop = id_shop;
        this.id_delivery = id_delivery;
        this.id_offer = id_offer;
        this.order_date = order_date;
        this.order_detail = order_detail;
    }

    // Getters y Setters

    public int getId_order() {
        return id_order;
    }

    public void setId_order(int id_order) {
        this.id_order = id_order;
    }

    public int getId_customer() {
        return id_customer;
    }

    public void setId_customer(int id_customer) {
        this.id_customer = id_customer;
    }

    public int getId_address() {
        return id_address;
    }

    public void setId_address(int id_address) {
        this.id_address = id_address;
    }

    public int getId_payment() {
        return id_payment;
    }

    public void setId_payment(int id_payment) {
        this.id_payment = id_payment;
    }

    public int getId_shop() {
        return id_shop;
    }

    public void setId_shop(int id_shop) {
        this.id_shop = id_shop;
    }

    public int getId_delivery() {
        return id_delivery;
    }

    public void setId_delivery(int id_delivery) {
        this.id_delivery = id_delivery;
    }

    public int getId_offer() {
        return id_offer;
    }

    public void setId_offer(int id_offer) {
        this.id_offer = id_offer;
    }

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }

    public int[] getOrder_detail() {
        return order_detail;
    }

    public void setOrder_detail(int[] order_detail) {
        this.order_detail = order_detail;
    }


    // Método toString


    @Override
    public String toString() {
        return "Order{" +
                "id_order=" + id_order +
                ", id_customer=" + id_customer +
                ", id_address=" + id_address +
                ", id_payment=" + id_payment +
                ", id_shop=" + id_shop +
                ", id_delivery=" + id_delivery +
                ", id_offer=" + id_offer +
                ", order_date=" + order_date +
                ", order_detail=" + Arrays.toString(order_detail) +
                '}';
    }

    public static String toCadena(Order order) {
        return "Order{" +
                "id_order=" + order.getId_order() + ", "
                + " id_customer=" + order.getId_customer() + ","
                + " id_address=" + order.getId_address() + ", "
                + " id_payment =" + order.getId_payment() + ", "
                + " id_shop =" + order.getId_shop() + ", "
                + " id_delivery =" + order.getId_delivery() + ", "
                + " id_offer =" + order.getId_offer() + ", "
                + " order_date =" + order.getOrder_date() + '}';
    }

    public static String fromArrayToJson(ArrayList<Order> orders){
        String resp = "[";
        for (Order order : orders) {
            resp+= "{" +
                    "id_order=" + order.getId_order() + ", "
                    + " id_customer=" + order.getId_customer() + ","
                    + " id_address=" + order.getId_address() + ", "
                    + " id_payment =" + order.getId_payment() + ", "
                    + " id_shop =" + order.getId_shop() + ", "
                    + " id_delivery =" + order.getId_delivery() + ", "
                    + " id_offer =" + order.getId_offer() + ", "
                    + " order_date =" + order.getOrder_date() + '}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Order> orders) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(orders);

        return resp;
    }

}

