package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class ProductDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM PRODUCTS WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO PRODUCTS (id_tax, id_category, name, description, price, image) VALUES (?, ?, ?, ?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM PRODUCTS WHERE id_product = ?";
    private final String SQL_UPDATE = "UPDATE PRODUCTS SET id_tax = ?, id_category = ?, name = ?, description = ?, price = ?, image = ? WHERE id_product = ?";

    private IMotorSql motorSql;

    public ProductDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Product product = (Product) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setInt(1, product.getId_tax());
            stmt.setInt(2, product.getId_category());
            stmt.setString(3, product.getName());
            stmt.setString(4, product.getDescription());
            stmt.setDouble(5, product.getPrice());
            stmt.setString(6, product.getImage());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir producto: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idProduct = -1;

        if (e instanceof Integer) {
            idProduct = (Integer) e;
        } else if (e instanceof Product) {
            idProduct = ((Product) e).getId_product();
        }

        if (idProduct > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idProduct);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar producto: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Product product = (Product) bean;

        if (product.getId_product() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, product.getId_tax());
                stmt.setInt(2, product.getId_category());
                stmt.setString(3, product.getName());
                stmt.setString(4, product.getDescription());
                stmt.setDouble(5, product.getPrice());
                stmt.setString(6, product.getImage());
                stmt.setInt(7, product.getId_product());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar producto: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
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
