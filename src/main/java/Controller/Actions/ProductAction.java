package Controller.Actions;

import Model.Product;
import Model.ProductDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class ProductAction implements IAction {

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response, String action) {
        String cadDestino = "";
        switch (action) {
            case "FIND_ALL":
                cadDestino = findAll(request, response);
                break;
            case "DELETE":
                cadDestino = delete(request, response);
                break;
            case "ADD":
                cadDestino = add(request, response);
                break;
            case "UPDATE":
                cadDestino = update(request, response);
                break;
        }
        return cadDestino;
    }

    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        ProductDao productDao = new ProductDao();
        ArrayList<Product> products = productDao.findAll(null);
        return Product.toArrayJSon(products);
    }

    private String delete(HttpServletRequest request, HttpServletResponse response) {
        int idProduct = Integer.parseInt(request.getParameter("id_product"));

        ProductDao productDao = new ProductDao();
        int result = productDao.delete(idProduct);

        return "{\"result\":" + result + "}";
    }

    private String add(HttpServletRequest request, HttpServletResponse response) {
        Product product = new Product();
        product.setId_tax(Integer.parseInt(request.getParameter("id_tax")));
        product.setId_category(Integer.parseInt(request.getParameter("id_category")));
        product.setName(request.getParameter("name"));
        product.setDescription(request.getParameter("description"));
        product.setPrice(Double.parseDouble(request.getParameter("price")));
        product.setImage(request.getParameter("image"));

        ProductDao productDao = new ProductDao();
        int result = productDao.add(product);

        return "{\"result\":" + result + "}";
    }

    private String update(HttpServletRequest request, HttpServletResponse response) {
        Product product = new Product();
        product.setId_product(Integer.parseInt(request.getParameter("id_product")));
        product.setId_tax(Integer.parseInt(request.getParameter("id_tax")));
        product.setId_category(Integer.parseInt(request.getParameter("id_category")));
        product.setName(request.getParameter("name"));
        product.setDescription(request.getParameter("description"));
        product.setPrice(Double.parseDouble(request.getParameter("price")));
        product.setImage(request.getParameter("image"));

        ProductDao productDao = new ProductDao();
        int result = productDao.update(product);

        return "{\"result\":" + result + "}";
    }

}
