package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class ShopDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM SHOPS WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO SHOPS (id_city, phone_number, email) VALUES (?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM SHOPS WHERE ID_SHOP = ?";
    private final String SQL_UPDATE = "UPDATE SHOPS SET id_city = ?, phone_number = ?, email = ? WHERE ID_SHOP = ?";

    private IMotorSql motorSql;

    public ShopDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Shop shop = (Shop) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setInt(1, shop.getId_shop());
            stmt.setString(2, shop.getPhone_number());
            stmt.setString(3, shop.getEmail());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir Shop: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idShop = -1;

        if (e instanceof Integer) {
            idShop = (Integer) e;
        } else if (e instanceof Shop) {
            idShop = ((Shop) e).getId_shop();
        }

        if (idShop > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idShop);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar Shop: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Shop shop = (Shop) bean;

        if (shop.getId_shop() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, shop.getId_shop());
                stmt.setInt(2, shop.getId_city());
                stmt.setString(3, shop.getPhone_number());
                stmt.setString(4, shop.getEmail());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar Shop: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }


    @Override
    public ArrayList<Shop> findAll(Object bean) {
        ArrayList<Shop> shops = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Shop)bean).getId_shop() != 0) {
                sql += " AND id_shop=" + ((Shop)bean).getId_shop() + "";
            }
            if (((Shop)bean).getId_city() != 0) {
                sql += " AND id_city=" + ((Shop)bean).getId_city() + "";
            }
            if (((Shop)bean).getPhone_number() != "" && ((Shop)bean).getPhone_number() != null) {
                sql += " AND phone_number like '" + ((Shop)bean).getPhone_number() + "'";
            }
            if (((Shop)bean).getEmail() != "" && ((Shop)bean).getEmail() != null) {
                sql += " AND email like '" + ((Shop)bean).getEmail() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Shop shop = new Shop();
                shop.setId_shop(rs.getInt("id_shop"));
                shop.setId_city(rs.getInt("id_city"));
                shop.setPhone_number(rs.getString("phone_number"));
                shop.setEmail(rs.getString("email"));
                //System.out.println(product.toString());
                shops.add(shop);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return shops;
    }
}
