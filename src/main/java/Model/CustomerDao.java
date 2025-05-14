package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerDao implements IDao {
    private final String SQL_FINDALL = "SELECT * FROM CUSTOMERS WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO CUSTOMERS (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM CUSTOMERS WHERE ID_CUSTOMER = ?";
    private final String SQL_UPDATE = "UPDATE CUSTOMERS SET first_name = ?, last_name = ?, email = ?, password = ? WHERE ID_CUSTOMER = ?";

    private IMotorSql motorSql;


    public CustomerDao() {
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Customer customer = (Customer) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setString(1, customer.getFirstName());
            stmt.setString(2, customer.getLastName());
            stmt.setString(3, customer.getEmail());
            stmt.setString(4, customer.getPassword());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir cliente: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idCustomer = -1;

        if (e instanceof Integer) {
            idCustomer = (Integer) e;
        } else if (e instanceof Customer) {
            idCustomer = ((Customer) e).getiIdCustomer();
        }

        if (idCustomer > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idCustomer);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar cliente: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Customer customer = (Customer) bean;

        if (customer.getiIdCustomer() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setString(1, customer.getFirstName());
                stmt.setString(2, customer.getLastName());
                stmt.setString(3, customer.getEmail());
                stmt.setString(4, customer.getPassword());
                stmt.setInt(5, customer.getiIdCustomer());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar cliente: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public ArrayList findAll(Object bean) {

        ArrayList<Customer> customers = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();

        if (bean != null) {
            if (((Customer)bean).getiIdCustomer() != 0 ) {
                sql += " AND ID_CUSTOMER=" + ((Customer)bean).getiIdCustomer() + "";
            }
            if (((Customer)bean).getFirstName() != "" && ((Customer)bean).getFirstName() != null) {
                sql += " AND FIRST_NAME like '" + ((Customer)bean).getFirstName() + "'";
            }
            if (((Customer)bean).getLastName() != "" && ((Customer)bean).getLastName() != null) {
                sql += " AND LAST_NAME like '" + ((Customer)bean).getLastName() + "'";
            }
            if (((Customer)bean).getEmail() != "" && ((Customer)bean).getEmail() != null) {
                sql += " AND EMAIL like '" + ((Customer)bean).getEmail() + "'";
            }
            if (((Customer)bean).getPassword() != "" && ((Customer)bean).getPassword() != null) {
                sql += " AND PASSWORD like '" + ((Customer)bean).getPassword() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Customer customer = new Customer();
                customer.setiIdCustomer(rs.getInt("id_customer"));
                customer.setFirstName(rs.getString("first_name"));
                customer.setLastName(rs.getString("last_name"));
                customer.setEmail(rs.getString("email"));
                customer.setPassword(rs.getString("password"));
                //System.out.println(product.toString());
                customers.add(customer);

            }

        }
        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return customers;

    }
}
