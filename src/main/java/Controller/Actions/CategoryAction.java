package Controller.Actions;

import Model.Category;
import Model.CategoryDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CategoryAction implements IAction {
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

        CategoryDao categoryDao = new CategoryDao();
        ArrayList<Category> categories = categoryDao.findAll(new Category());
        return Category.toArrayJSon(categories);

    }


    private String delete(HttpServletRequest request, HttpServletResponse response) {
        int idCategory = Integer.parseInt(request.getParameter("id_category"));

        CategoryDao categoryDao = new CategoryDao();
        int result = categoryDao.delete(idCategory);

        return "{\"result\":" + result + "}";
    }

    private String add(HttpServletRequest request, HttpServletResponse response) {
        Category category = new Category();
        category.setName(request.getParameter("name"));

        CategoryDao categoryDao = new CategoryDao();
        int result = categoryDao.add(category);

        return "{\"result\":" + result + "}";
    }

    private String update(HttpServletRequest request, HttpServletResponse response) {
        Category category = new Category();
        category.setId_category(Integer.parseInt(request.getParameter("id_category")));
        category.setName(request.getParameter("name"));

        CategoryDao categoryDao = new CategoryDao();
        int result = categoryDao.update(category);

        return "{\"result\":" + result + "}";
    }



}
