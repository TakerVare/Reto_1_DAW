package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class CategoryDao implements IDao {
    public final String SQL_FINDALL = "SELECT * FROM CATEGORIES WHERE 1=1 ";
    public final String SQL_DELETE = "DELETE FROM CATEGORIES WHERE ID_CATEGORY = ?";
    public final String SQL_INSERT = "INSERT INTO CATEGORIES (NAME) VALUES (?)";
    public final String SQL_UPDATE = "UPDATE CATEGORIES SET NAME = ? WHERE ID_CATEGORY = ?";

    private IMotorSql motorSql;

    public CategoryDao() {  
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Category category = (Category) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setString(1, category.getName());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; 
        } catch (SQLException e) {
            System.out.println("Error al añadir categoría: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }
    //###########################################
    @Override
    public int delete(Object e) {
        //Comprobar el tipo de objeto para asignarlo al Id de elemento
        Integer idCategory = -1;
        Integer iRet = 0;

        if (e instanceof Integer) {
            idCategory = (Integer) e;
        } else if (e instanceof Category) {
            idCategory = ((Category)e).getId_category();
        }

        if (idCategory > 0) {
            try {
                motorSql.connect();
                PreparedStatement sentencia = motorSql.getConnection().prepareStatement(SQL_DELETE);
                sentencia.setInt(1, idCategory);
                motorSql.setPreparedStatement(sentencia);
                motorSql.execute();
                iRet = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException sqlEx) {
                System.out.println("Error al eliminar categoría: " + sqlEx.getMessage());
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
        Category category = (Category) bean;

        if (category.getId_category() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setString(1, category.getName());
                stmt.setInt(2, category.getId_category());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar categoría: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public ArrayList findAll(Object bean) {

        ArrayList<Category> categories = new ArrayList<>();
        String sql = SQL_FINDALL;
        motorSql.connect();

        if(bean !=null){
            Category category = (Category)bean;

            if(category.getId_category() !=0){
                sql += " AND ID_CATEGORY = " + category.getId_category();
            }

            if(category.getName() !="" && category.getName() !=null){
                sql += " AND NAME = '" + category.getName() + "'";
            }
            sql+=" ;";



            try {
                ResultSet rs = motorSql.executeQuery(sql);

                while (rs.next()){
                    Category categoryDB = new Category(
                            rs.getInt("ID_CATEGORY"),
                            rs.getString("NAME")
                    );
                    categories.add(categoryDB);
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
        
        return categories;
    }


}
