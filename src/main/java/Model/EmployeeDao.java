package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class EmployeeDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM EMPLOYEES WHERE 1=1 ";
    private IMotorSql motorSql;

    public EmployeeDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        return 0;
    }

    @Override
    public int delete(Object e) {
        return 0;
    }
    /*
        @Override
        public int delete(Object e) {
            return 0;
        }
    */
    @Override
    public int update(Object bean) {
        return 0;
    }

    @Override
    public ArrayList<Employee> findAll(Object bean) {
        ArrayList<Employee> employees = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Employee)bean).getId_employee() != 0 ) {
                sql += " AND id_employee=" + ((Employee)bean).getId_employee() + "";
            }
            if (((Employee)bean).getId_rol() != 0) {
                sql += " AND id_rol=" + ((Employee)bean).getId_rol() + "";
            }
            if (((Employee)bean).getFirst_name() != "" && ((Employee)bean).getFirst_name()!= null) {
                sql += " AND first_name '" + ((Employee)bean).getFirst_name() + "'";
            }
            if (((Employee)bean).getLast_name() != "" && ((Employee)bean).getLast_name()!= null) {
                sql += " AND last_name like '" + ((Employee)bean).getLast_name() + "'";
            }
            if (((Employee)bean).getEmail() != "" && ((Employee)bean).getEmail() != null) {
                sql += " AND email like '" + ((Employee)bean).getEmail() + "'";
            }
            if (((Employee)bean).getPassword() != "" && ((Employee)bean).getPassword() != null) {
                sql += " AND password like '" + ((Employee)bean).getPassword() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Employee employee = new Employee();
                employee.setId_employee(rs.getInt("id_employee"));
                employee.setId_rol(rs.getInt("id_rol"));
                employee.setFirst_name(rs.getString("first_name"));
                employee.setLast_name(rs.getString("last_name"));
                employee.setEmail(rs.getString("email"));
                employee.setPassword(rs.getString("password"));
                //System.out.println(product.toString());
                employees.add(employee);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return employees;
    }
}