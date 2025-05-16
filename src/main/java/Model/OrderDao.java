package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class OrderDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM ORDERS WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO ORDERS (id_customer, id_address, id_payment, id_shop, id_delivery, id_offer, order_date, order_detail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM ORDERS WHERE ID_ORDER = ?";
    private final String SQL_UPDATE = "UPDATE ORDERS SET id_customer = ?, id_address = ?, id_payment = ?, id_shop = ?, id_delivery = ?, id_offer = ?, order_date = ?, order_detail = ? WHERE ID_ORDER = ?";

    private IMotorSql motorSql;

    public OrderDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Order order = (Order) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT, java.sql.Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, order.getId_customer());
            stmt.setInt(2, order.getId_address());
            stmt.setInt(3, order.getId_payment());
            stmt.setInt(4, order.getId_shop());
            stmt.setInt(5, order.getId_delivery());
            stmt.setInt(6, order.getId_offer());
            stmt.setString(7, order.getOrder_date());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();

            // Obtener el ID generado para la orden
            ResultSet generatedKeys = stmt.getGeneratedKeys();
            if (generatedKeys.next()) {
                result = generatedKeys.getInt(1);
            }

        } catch (SQLException e) {
            System.out.println("Error al añadir Order: " + e.getMessage());
            e.printStackTrace();
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idOrder = -1;

        if (e instanceof Integer) {
            idOrder = (Integer) e;
        } else if (e instanceof Order) {
            idOrder = ((Order) e).getId_order();
        }

        if (idOrder > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idOrder);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar Order: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Order order = (Order) bean;

        if (order.getId_order() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, order.getId_order());
                stmt.setInt(2, order.getId_customer());
                stmt.setInt(3, order.getId_address());
                stmt.setInt(4, order.getId_payment());
                stmt.setInt(5, order.getId_shop());
                stmt.setInt(6, order.getId_delivery());
                stmt.setInt(7, order.getId_offer());
                stmt.setString(8, order.getOrder_date());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar Order: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public ArrayList<Order> findAll(Object bean) {
        ArrayList<Order> orders = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Order)bean).getId_order() != 0 ) {
                sql += " AND id_order=" + ((Order)bean).getId_order() + "";
            }
            if (((Order)bean).getId_customer() != 0) {
                sql += " AND id_customer=" + ((Order)bean).getId_customer() + "";
            }
            if (((Order)bean).getId_address() != 0) {
                sql += " AND id_address=" + ((Order)bean).getId_address() + "";
            }
            if (((Order)bean).getId_payment() != 0) {
                sql += " AND id_payment=" + ((Order)bean).getId_payment() + "";
            }
            if (((Order)bean).getId_shop() != 0) {
                sql += " AND id_shop=" + ((Order)bean).getId_shop() + "";
            }
            if (((Order)bean).getId_delivery() != 0) {
                sql += " AND id_delivery=" + ((Order)bean).getId_delivery() + "";
            }
            if (((Order)bean).getId_offer() != 0) {
                sql += " AND id_offer=" + ((Order)bean).getId_offer() + "";
            }
            if (((Order)bean).getOrder_date() != null && ((Order)bean).getOrder_date().toString() != "") {
                sql += " AND order_date like '" + ((Order)bean).getOrder_date().toString() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Order order = new Order();
                order.setId_order(rs.getInt("id_order"));
                order.setId_customer(rs.getInt("id_customer"));
                order.setId_address(rs.getInt("id_address"));
                order.setId_payment(rs.getInt("id_payment"));
                order.setId_shop(rs.getInt("id_shop"));
                order.setId_delivery(rs.getInt("id_delivery"));
                order.setId_offer(rs.getInt("id_offer"));
                order.setOrder_date(rs.getString("order_date"));
                //System.out.println(product.toString());
                orders.add(order);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return orders;
    }
}
