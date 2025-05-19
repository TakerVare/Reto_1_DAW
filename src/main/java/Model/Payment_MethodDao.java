package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class Payment_MethodDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM PAYMENT_METHODS WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO PAYMENT_METHODS (name) VALUES (?, ?)";
    private final String SQL_DELETE = "DELETE FROM PAYMENT_METHODS WHERE ID_PAYMENT = ?";
    private final String SQL_UPDATE = "UPDATE PAYMENT_METHODS SET name = ? WHERE ID_PAYMENT = ?";

    private IMotorSql motorSql;

    public Payment_MethodDao() {
        
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Payment_Method payment_method = (Payment_Method) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setString(1, payment_method.getName());;

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir Payment_Method: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idPayment_Method = -1;

        if (e instanceof Integer) {
            idPayment_Method = (Integer) e;
        } else if (e instanceof Payment_Method) {
            idPayment_Method = ((Payment_Method) e).getId_payment();
        }

        if (idPayment_Method > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idPayment_Method);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar Payment_Method: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Payment_Method payment_method = (Payment_Method) bean;

        if (payment_method.getId_payment() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, payment_method.getId_payment());
                stmt.setString(2, payment_method.getName());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar Payment_Method: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }


    @Override
    public ArrayList<Payment_Method> findAll(Object bean) {
        ArrayList<Payment_Method> payment_methods = new ArrayList<>();

        String sql = SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Payment_Method) bean).getId_payment() != 0) {
                sql += " AND id_payment=" + ((Payment_Method) bean).getId_payment() + "";
            }
            if (((Payment_Method) bean).getName() != "" && ((Payment_Method) bean).getName() != null) {
                sql += " AND name like '" + ((Payment_Method) bean).getName() + "'";
            }
        }
        sql += " ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Payment_Method payment_method = new Payment_Method();
                payment_method.setId_payment(rs.getInt("id_payment"));
                payment_method.setName(rs.getString("name"));
                //System.out.println(product.toString());
                payment_methods.add(payment_method);

            }


        } catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return payment_methods;
    }
}
