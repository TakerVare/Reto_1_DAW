package Model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;


public class Rol {
    //Atributos
    private int id_rol;
    private String name;
    private String description;
    private String permissions;

    //Constructores

    public Rol(){

    }

    public Rol(int id_rol, String name, String description, String permissions) {
        this.id_rol = id_rol;
        this.name = name;
        this.description = description;
        this.permissions = permissions;
    }

    // Getters y Setters

    public int getId_rol() {
        return id_rol;
    }

    public void setId_rol(int id_rol) {
        this.id_rol = id_rol;
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

    public String getPermissions() {
        return permissions;
    }

    public void setPermissions(String permissions) {
        this.permissions = permissions;
    }


    // Método toString


    @Override
    public String toString() {
        return "Rol{" +
                "id_rol=" + id_rol +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", permissions='" + permissions + '\'' +
                '}';
    }

    public static String toCadena(Rol rol) {
        return "Rol{" +
                " id_rol=" + rol.getId_rol() + ","
                + " name ='" + rol.getName() + ", "
                + "description =" + rol.getDescription() +", "
                + "permissions='" + rol.getPermissions() +'}';
    }

    public static String fromArrayToJson(ArrayList<Rol> rols){
        String resp = "[";
        for (Rol rol : rols) {
            resp+= "{" +
                    " id_rol=" + rol.getId_rol() + ","
                    + " name =" + rol.getName() + ", "
                    + "description =" + rol.getDescription() +", "
                    + "permissions='" + rol.getPermissions() +'}';
            resp+=",";
        }
        resp = resp.substring(0, resp.length()-1);
        resp+="]";
        return resp;
    }

    public static String toArrayJSon(ArrayList<Rol> rols) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(rols);

        return resp;
    }

}

