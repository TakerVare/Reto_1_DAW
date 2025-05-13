package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class CityDao implements IDao {
    public final String SQL_FINDALL = "SELECT * FROM CITIES WHERE 1=1 ";
    public final String SQL_DELETE = "DELETE * FROM CITIES WHERE ";

    private IMotorSql motorSql;

    public CityDao() {  //Este punto no acabo de entenderlo
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
        Integer idCity = -1;
        Integer iRet = -1;

        if (e instanceof Integer)
        {
            idCity = (Integer) e;
        }
        else if (e instanceof City)
        {
            idCity = ((City)e).getId_city();
        }
        String sql = SQL_DELETE;

        //Si puedo asignar el idCategory
        if(idCity>0)
        {
            try {
                motorSql.connect();
                sql += " ID_CITY = ?";
                PreparedStatement sentencia = motorSql.getConnection().prepareStatement(sql);
                sentencia.setInt(1, idCity);    //Le paso el primer parámetro a la consulta que será idCategory
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
        /*
        //Hardcodeado para hacer pruebas
        //llamar a la BBDD todo

        Category category1 = new Category();
        category1.setId_category(1);
        category1.setName("bebidas");
        categories.add(category1);

        Category category2 = new Category();
        category2.setId_category(2);
        category2.setName("burgers");
        categories.add(category2);
        */
        return cities;
    }


}

