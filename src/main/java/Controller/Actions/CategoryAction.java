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

                //cadDestino = delete(request, response); todo
                break;

        }
        return cadDestino;
    }

   /* private String delete(HttpServletRequest request,
                          HttpServletResponse response){
        CategoryDao categoryDao = new CategoryDao();
        Integer iRes = categoryDao.delete();

    }*/
    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        CategoryDao categoryDao = new CategoryDao();
        ArrayList<Category> categories = categoryDao.findAll(new Category());
        return Category.toArrayJSon(categories);


    }
}
