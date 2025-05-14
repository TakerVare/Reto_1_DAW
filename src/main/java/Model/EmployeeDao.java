package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class EmployeeDao implements IDao {
    private final String SQL_FINDALL = "SELECT * FROM EMPLOYEES WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO EMPLOYEES (first_name, last_name, email, password, id_rol) VALUES (?, ?, ?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM EMPLOYEES WHERE ID_EMPLOYEE = ?";
    private final String SQL_UPDATE = "UPDATE EMPLOYEES SET first_name = ?, last_name = ?, email = ?, password = ?, id_rol = ? WHERE ID_EMPLOYEE = ?";

    private IMotorSql motorSql;

    public EmployeeDao() {
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Employee employee = (Employee) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setString(1, employee.getFirstName());
            stmt.setString(2, employee.getLastName());
            stmt.setString(3, employee.getEmail());
            stmt.setString(4, employee.getPassword());
            stmt.setInt(5, employee.getIdRol());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir empleado: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idEmployee = -1;

        if (e instanceof Integer) {
            idEmployee = (Integer) e;
        } else if (e instanceof Employee) {
            idEmployee = ((Employee) e).getIdEmployee();
        }

        if (idEmployee > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idEmployee);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar empleado: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Employee employee = (Employee) bean;

        if (employee.getIdEmployee() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setString(1, employee.getFirstName());
                stmt.setString(2, employee.getLastName());
                stmt.setString(3, employee.getEmail());
                stmt.setString(4, employee.getPassword());
                stmt.setInt(5, employee.getIdRol());
                stmt.setInt(6, employee.getIdEmployee());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar empleado: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
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
