package Model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class Order_DetailDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM ORDER_DETAILS WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO ORDER_DETAILS (id_order, id_product, line_price) VALUES (?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM ORDER_DETAILS WHERE ID_ORDER_DETAIL = ?";
    private final String SQL_UPDATE = "UPDATE ORDER_DETAILS SET id_order = ?, id_product = ?, line_price = ? WHERE ID_ORDER_DETAIL = ?";

    private IMotorSql motorSql;

    public Order_DetailDao() {
    
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Order_Detail order_detail = (Order_Detail) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setInt(1, order_detail.getId_order());
            stmt.setInt(2, order_detail.getId_product());
            stmt.setDouble(3, order_detail.getLine_price());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Éxito
        } catch (SQLException e) {
            System.out.println("Error al añadir Order_Detail: " + e.getMessage());
            e.printStackTrace();
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idOrder_Detail = -1;

        if (e instanceof Integer) {
            idOrder_Detail = (Integer) e;
        } else if (e instanceof Order_Detail) {
            idOrder_Detail = ((Order_Detail) e).getId_order_detail();
        }

        if (idOrder_Detail > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idOrder_Detail);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar Order_Detail: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Order_Detail order_detail = (Order_Detail) bean;

        if (order_detail.getId_order_detail() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, order_detail.getId_order_detail());
                stmt.setInt(2, order_detail.getId_order());
                stmt.setInt(3, order_detail.getId_product());
                stmt.setDouble(4, order_detail.getLine_price());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar Order_Detail: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public ArrayList<Order_Detail> findAll(Object bean) {
        ArrayList<Order_Detail> order_details = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Order_Detail)bean).getId_order_detail() != 0 ) {
                sql += " AND id_order_detail=" + ((Order_Detail)bean).getId_order_detail() + "";
            }
            if (((Order_Detail)bean).getId_order() != 0) {
                sql += " AND id_order=" + ((Order_Detail)bean).getId_order() + "";
            }
            if (((Order_Detail)bean).getId_product() != 0) {
                sql += " AND id_product=" + ((Order_Detail)bean).getId_product() + "";
            }
            if (((Order_Detail)bean).getLine_price() != 0) {
                sql += " AND line_price like =" + ((Order_Detail)bean).getLine_price() + "";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Order_Detail order_detail = new Order_Detail();
                order_detail.setId_order_detail(rs.getInt("id_order_detail"));
                order_detail.setId_order(rs.getInt("id_order"));
                order_detail.setId_product(rs.getInt("id_product"));
                order_detail.setLine_price(rs.getDouble("line_price"));
                //System.out.println(product.toString());
                order_details.add(order_detail);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return order_details;
    }
}
