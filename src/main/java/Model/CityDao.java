package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class CityDao implements IDao {
    public final String SQL_FINDALL = "SELECT * FROM CITIES WHERE 1=1 ";
    public final String SQL_DELETE = "DELETE FROM CITIES WHERE ID_CITY = ?";
    public final String SQL_INSERT = "INSERT INTO CITIES (NAME) VALUES (?)";
    public final String SQL_UPDATE = "UPDATE CITIES SET NAME = ? WHERE ID_CITY = ?";

    private IMotorSql motorSql;

    public CityDao() {  //Este punto no acabo de entenderlo
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        City city = (City) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setString(1, city.getName());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir ciudad: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }
    //###########################################
    @Override
    public int delete(Object e) {
        //Comprobar el tipo de objeto para asignarlo al Id de elemento
        Integer idCity = -1;
        Integer iRet = 0;

        if (e instanceof Integer) {
            idCity = (Integer) e;
        } else if (e instanceof City) {
            idCity = ((City)e).getId_city();
        }

        if (idCity > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idCity);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                iRet = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar ciudad: " + ex.getMessage());
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
        City city = (City) bean;

        if (city.getId_city() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setString(1, city.getName());
                stmt.setInt(2, city.getId_city());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar ciudad: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public ArrayList findAll(Object bean) {

        ArrayList<City> cities = new ArrayList<>();
        String sql = SQL_FINDALL;
        motorSql.connect();

        if(bean !=null){
            City city = (City)bean;

            if(city.getId_city() !=0){
                sql += " AND ID_CITY = " + city.getId_city();
            }

            if(city.getName() !="" && city.getName() !=null){
                sql += " AND NAME = '" + city.getName() + "'";
            }
            sql+=" ;";



            try {
                ResultSet rs = motorSql.executeQuery(sql);

                while (rs.next()){
                    City cityDB = new City(
                            rs.getInt("ID_CITY"),
                            rs.getString("NAME")
                    );
                    cities.add(cityDB);
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

        return cities;
    }


}

