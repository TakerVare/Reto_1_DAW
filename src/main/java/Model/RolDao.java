package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class RolDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM ROLES WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO ROLES (name, description, permissions) VALUES (?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM ROLES WHERE ID_ROL = ?";
    private final String SQL_UPDATE = "UPDATE ROLES SET name = ?, description = ?, permissions = ? WHERE ID_ROL = ?";

    private IMotorSql motorSql;

    public RolDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Rol rol = (Rol) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setString(1, rol.getName());
            stmt.setString(2, rol.getDescription());
            stmt.setString(3, rol.getPermissions());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir Rol: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idRol = -1;

        if (e instanceof Integer) {
            idRol = (Integer) e;
        } else if (e instanceof Rol) {
            idRol = ((Rol) e).getId_rol();
        }

        if (idRol > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idRol);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar Rol: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Rol rol = (Rol) bean;

        if (rol.getId_rol() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, rol.getId_rol());
                stmt.setString(2, rol.getName());
                stmt.setString(3, rol.getDescription());
                stmt.setString(4, rol.getPermissions());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar Rol: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }


    @Override
    public ArrayList<Rol> findAll(Object bean) {
        ArrayList<Rol> rols = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Rol)bean).getId_rol() != 0) {
                sql += " AND id_rol=" + ((Rol)bean).getId_rol() + "";
            }
            if (((Rol)bean).getName() != "" && ((Rol)bean).getName() != null) {
                sql += " AND name like '" + ((Rol)bean).getName() + "'";
            }
            if (((Rol)bean).getDescription() != "" && ((Rol)bean).getDescription() != null) {
                sql += " AND description like '" + ((Rol)bean).getDescription() + "'";
            }
            if (((Rol)bean).getPermissions() != "" && ((Rol)bean).getPermissions() != null) {
                sql += " AND permissions like '" + ((Rol)bean).getPermissions() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Rol rol = new Rol();
                rol.setId_rol(rs.getInt("id_rol"));
                rol.setName(rs.getString("name"));
                rol.setDescription(rs.getString("description"));
                rol.setPermissions(rs.getString("permissions"));
                //System.out.println(product.toString());
                rols.add(rol);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return rols;
    }
}