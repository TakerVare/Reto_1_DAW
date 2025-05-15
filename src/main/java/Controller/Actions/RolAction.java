package Controller.Actions;

import Model.Rol;
import Model.RolDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class RolAction implements IAction {

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

        RolDao rolDao = new RolDao();
        ArrayList<Rol> rols = rolDao.findAll(null);
        return Rol.toArrayJSon(rols);


    }

}
