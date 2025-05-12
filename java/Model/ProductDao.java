package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class ProductDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM PRODUCTS WHERE 1=1 ";
    private IMotorSql motorSql;

    public ProductDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
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
/*
    @Override
    public int delete(Object e) {
        return 0;
    }
*/
    @Override
    public int update(Object bean) {
        return 0;
    }

    @Override
    public ArrayList<Product> findAll(Object bean) {
        ArrayList<Product> products = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Product)bean).getId_product() != 0 ) {
                sql += " AND id_product=" + ((Product)bean).getId_product() + "";
            }
            if (((Product)bean).getId_category() != 0) {
                sql += " AND id_category=" + ((Product)bean).getId_category() + "";
            }
            if (((Product)bean).getId_tax() != 0) {
                sql += " AND id_tax=" + ((Product)bean).getId_tax() + "";
            }
            if (((Product)bean).getName() != "" || ((Product)bean).getName() != null) {
                sql += " AND name like '" + ((Product)bean).getName() + "'";
            }
            if (((Product)bean).getDescription() != "" || ((Product)bean).getDescription() != null) {
                sql += " AND description like '" + ((Product)bean).getDescription() + "'";
            }
            if (((Product)bean).getPrice() != 0) {
                sql += " AND price =" + ((Product)bean).getPrice() + "";
            }
            if (((Product)bean).getImage() != "" || ((Product)bean).getImage() != null) {
                sql += " AND image like '" + ((Product)bean).getImage() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Product product = new Product();
                product.setId_product(rs.getInt("id_product"));
                product.setId_tax(rs.getInt("id_tax"));
                product.setId_category(rs.getInt("id_category"));
                product.setName(rs.getString("name"));
                product.setDescription(rs.getString("description"));
                product.setPrice(rs.getDouble("price"));
                product.setImage(rs.getString("image"));
                //System.out.println(product.toString());
                products.add(product);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return products;
    }
}
