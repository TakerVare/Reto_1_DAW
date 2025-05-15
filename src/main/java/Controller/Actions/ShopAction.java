package Controller.Actions;

import Model.Shop;
import Model.ShopDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class ShopAction implements IAction {

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response, String action) {
        String cadDestino = "";
        switch (action) {
            case "FIND_ALL":
                cadDestino = findAll(request, response);
                break;
        }
        return cadDestino;
    }

    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        ShopDao shopDao = new ShopDao();
        ArrayList<Shop> shops = shopDao.findAll(null);
        return Shop.toArrayJSon(shops);


    }

}
