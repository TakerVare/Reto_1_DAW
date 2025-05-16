package Controller.Actions;

import Model.Order_Detail;
import Model.Order_DetailDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class OrderDetailAction implements IAction {

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response, String action) {
        String cadDestino = "";
        switch (action) {
            case "FIND_ALL":
                cadDestino = findAll(request, response);
                break;
            case "ADD":
                cadDestino = add(request, response);
                break;
        }
        return cadDestino;
    }

    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        Order_DetailDao order_detailDao = new Order_DetailDao();
        ArrayList<Order_Detail> order_details = order_detailDao.findAll(null);
        return Order_Detail.toArrayJSon(order_details);
    }

    private String add(HttpServletRequest request, HttpServletResponse response) {
        Order_Detail orderDetail = new Order_Detail();
        orderDetail.setId_order(Integer.parseInt(request.getParameter("id_order")));
        orderDetail.setId_product(Integer.parseInt(request.getParameter("id_product")));
        orderDetail.setLine_price(Double.parseDouble(request.getParameter("line_price")));

        Order_DetailDao orderDetailDao = new Order_DetailDao();
        int result = orderDetailDao.add(orderDetail);

        return "{\"result\":" + result + "}";
    }
}