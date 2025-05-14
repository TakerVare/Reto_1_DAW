package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class Employee_ShopDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM EMPLOYEE_SHOPS WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO EMPLOYEE_SHOPS (id_employee, id_shop) VALUES (?, ?)";
    private final String SQL_DELETE = "DELETE FROM EMPLOYEE_SHOPS WHERE ID_EMPLOYEE_SHOP = ?";
    private final String SQL_UPDATE = "UPDATE EMPLOYEE_SHOPS SET id_employee = ?, id_shop = ? WHERE ID_EMPLOYEE_SHOP = ?";

    private IMotorSql motorSql;

    public Employee_ShopDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Employee_Shop employee_shop = (Employee_Shop) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setInt(1, employee_shop.getId_employee());
            stmt.setInt(2, employee_shop.getId_shop());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir employee_shop: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idEmployee_Shop = -1;

        if (e instanceof Integer) {
            idEmployee_Shop = (Integer) e;
        } else if (e instanceof Employee_Shop) {
            idEmployee_Shop = ((Employee_Shop) e).getId_employee_shop();
        }

        if (idEmployee_Shop > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idEmployee_Shop);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar employee_shop: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Employee_Shop employee_shop = (Employee_Shop) bean;

        if (employee_shop.getId_employee_shop() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, employee_shop.getId_employee_shop());
                stmt.setInt(2, employee_shop.getId_employee());
                stmt.setInt(3, employee_shop.getId_shop());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar employee_shop: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public ArrayList<Employee_Shop> findAll(Object bean) {
        ArrayList<Employee_Shop> employee_shops = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Employee_Shop)bean).getId_employee_shop() != 0 ) {
                sql += " AND id_employee_shop=" + ((Employee_Shop)bean).getId_employee_shop() + "";
            }
            if (((Employee_Shop)bean).getId_employee() != 0) {
                sql += " AND id_employee=" + ((Employee_Shop)bean).getId_employee() + "";
            }
            if (((Employee_Shop)bean).getId_shop() != 0) {
                sql += " AND id_shop=" + ((Employee_Shop)bean).getId_shop() + "";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Employee_Shop employee_shop = new Employee_Shop();
                employee_shop.setId_employee_shop(rs.getInt("id_employee_shop"));
                employee_shop.setId_employee(rs.getInt("id_employee"));
                employee_shop.setId_shop(rs.getInt("id_shop"));
                //System.out.println(product.toString());
                employee_shops.add(employee_shop);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return employee_shops;
    }
}