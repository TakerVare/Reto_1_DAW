package Model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class DeliveryDao implements IDao {
    public final String SQL_FINDALL = "SELECT * FROM DELIVERIES WHERE 1=1 ";
    public final String SQL_DELETE = "DELETE * FROM DELIVERIES WHERE ";

    private IMotorSql motorSql;

    public DeliveryDao() {  //Este punto no acabo de entenderlo
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        return 0;
    }
    //###########################################
    @Override
    public int delete(Object e) {
        //Comprobar el tipo de objeto para asignarlo al Id de elemento
        Integer idDelivery = -1;
        Integer iRet = -1;

        if (e instanceof Integer)
        {
            idDelivery = (Integer) e;
        }
        else if (e instanceof Delivery)
        {
            idDelivery = ((Delivery)e).getId_delivery();
        }
        String sql = SQL_DELETE;

        //Si puedo asignar el idCategory
        if(idDelivery>0)
        {
            try {
                motorSql.connect();
                sql += " ID_DELIVERY = ?";
                PreparedStatement sentencia = motorSql.getConnection().prepareStatement(sql);
                sentencia.setInt(1, idDelivery);    //Le paso el primer parámetro a la consulta que será idCategory
                motorSql.setPreparedStatement(sentencia);
                motorSql.execute(sql);

            }
            catch (SQLException sqlEx)
            {
                System.out.println(sqlEx.getMessage());
            }
            catch (Exception ex){
                System.out.println(ex.getMessage());
            }
            finally {
                motorSql.disconnect();
            }
        }

        return 0;
    }
    //###########################################
    @Override
    public int update(Object bean) {
        return 0;
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

