package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerDao implements IDao {
    private final String SQL_FINDALL = "SELECT * FROM CUSTOMERS WHERE 1=1 ";

    private IMotorSql motorSql;


    public CustomerDao() {
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
