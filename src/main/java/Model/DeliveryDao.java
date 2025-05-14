package Model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class DeliveryDao implements IDao {
    public final String SQL_FINDALL = "SELECT * FROM DELIVERIES WHERE 1=1 ";
    public final String SQL_DELETE = "DELETE FROM DELIVERIES WHERE ID_DELIVERY = ?";
    public final String SQL_INSERT = "INSERT INTO DELIVERIES (NAME) VALUES (?)";
    public final String SQL_UPDATE = "UPDATE DELIVERIES SET NAME = ? WHERE ID_DELIVERY = ?";

    private IMotorSql motorSql;

    public DeliveryDao() {  //Este punto no acabo de entenderlo
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Delivery delivery = (Delivery) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setString(1, delivery.getName());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir delivery: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }
    //###########################################
    @Override
    public int delete(Object e) {
        //Comprobar el tipo de objeto para asignarlo al Id de elemento
        Integer idDelivery = -1;
        Integer iRet = 0;

        if (e instanceof Integer) {
            idDelivery = (Integer) e;
        } else if (e instanceof Delivery) {
            idDelivery = ((Delivery)e).getId_delivery();
        }

        if (idDelivery > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idDelivery);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                iRet = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar delivery: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return iRet;
    }
    //###########################################
    @Override
    public int update(Object bean) {
        int result = 0;
        Delivery delivery = (Delivery) bean;

        if (delivery.getId_delivery() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setString(1, delivery.getName());
                stmt.setInt(2, delivery.getId_delivery());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar delivery: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public ArrayList findAll(Object bean) {

        ArrayList<Delivery> deliveries = new ArrayList<>();
        String sql = SQL_FINDALL;
        motorSql.connect();

        if(bean !=null){
            Delivery delivery = (Delivery)bean;

            if(delivery.getId_delivery() !=0){
                sql += " AND ID_DELIVERY = " + delivery.getId_delivery();
            }

            if(delivery.getName() !="" && delivery.getName() !=null){
                sql += " AND NAME = '" + delivery.getName() + "'";
            }
            sql+=" ;";



            try {
                ResultSet rs = motorSql.executeQuery(sql);

                while (rs.next()){
                    Delivery deliveryDB = new Delivery(
                            rs.getInt("id_delivery"),
                            rs.getString("name")
                    );
                    deliveries.add(deliveryDB);
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            } catch (Exception e){
                System.out.println(e.getMessage());
            }
            finally {
                motorSql.disconnect();
            }

        }

        return deliveries;
    }


}

