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

    @Override
    public int update(Object bean) {
        return 0;
    }

    @Override
    public ArrayList findAll(Object bean) {
        ArrayList<Employee> employees = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();

        if (bean != null) {
            if (((Employee)bean).getIdEmployee() != 0 ) {
                sql += " AND ID_EMPLOYEE=" + ((Employee)bean).getIdEmployee() + "";
            }
            if (((Employee)bean).getIdRol() != 0 ) {
                sql += " AND ID_ROL=" + ((Employee)bean).getIdRol() + "";
            }
            if (((Employee)bean).getFirstName() != "" && ((Employee)bean).getFirstName() != null) {
                sql += " AND FIRST_NAME like '" + ((Employee)bean).getFirstName() + "'";
            }
            if (((Employee)bean).getLastName() != "" && ((Employee)bean).getLastName() != null) {
                sql += " AND LAST_NAME like '" + ((Employee)bean).getLastName() + "'";
            }
            if (((Employee)bean).getEmail() != "" && ((Employee)bean).getEmail() != null) {
                sql += " AND EMAIL like '" + ((Employee)bean).getEmail() + "'";
            }
            if (((Employee)bean).getPassword() != "" && ((Employee)bean).getPassword() != null) {
                sql += " AND PASSWORD like '" + ((Employee)bean).getPassword() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Employee employee = new Employee();
                employee.setIdEmployee(rs.getInt("id_employee"));
                employee.setFirstName(rs.getString("first_name"));
                employee.setLastName(rs.getString("last_name"));
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
