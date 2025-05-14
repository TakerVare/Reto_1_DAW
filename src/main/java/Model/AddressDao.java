package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class AddressDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM ADDRESSES WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO ADDRESSES (id_customer, id_city, street, state, zip, favourite) VALUES (?, ?, ?, ?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM ADDRESSES WHERE id_address = ?";
    private final String SQL_UPDATE = "UPDATE ADDRESSES SET id_customer = ?, id_city = ?, street = ?, state = ?, zip = ?, favourite = ? WHERE id_address = ?";

    private IMotorSql motorSql;

    public AddressDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Address address = (Address) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setInt(1, address.getId_customer());
            stmt.setInt(2, address.getId_city());
            stmt.setString(3, address.getStreet());
            stmt.setString(4, address.getState());
            stmt.setString(5, address.getZip());
            stmt.setInt(6, address.getFavourite());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir dirección: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idAddress = -1;

        if (e instanceof Integer) {
            idAddress = (Integer) e;
        } else if (e instanceof Address) {
            idAddress = ((Address) e).getId_address();
        }

        if (idAddress > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idAddress);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar dirección: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }


    @Override
    public int update(Object bean) {
        int result = 0;
        Address address = (Address) bean;

        if (address.getId_address() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, address.getId_customer());
                stmt.setInt(2, address.getId_city());
                stmt.setString(3, address.getStreet());
                stmt.setString(4, address.getState());
                stmt.setString(5, address.getZip());
                stmt.setInt(6, address.getFavourite());
                stmt.setInt(7, address.getId_address());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar dirección: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public ArrayList<Address> findAll(Object bean) {
        ArrayList<Address> addresses = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Address)bean).getId_address() != 0 ) {
                sql += " AND id_address=" + ((Address)bean).getId_address() + "";
            }
            if (((Address)bean).getId_customer() != 0) {
                sql += " AND id_customer=" + ((Address)bean).getId_customer() + "";
            }
            if (((Address)bean).getId_city() != 0) {
                sql += " AND id_city=" + ((Address)bean).getId_city() + "";
            }
            if (((Address)bean).getStreet() != "" && ((Address)bean).getStreet() != null) {
                sql += " AND street like '" + ((Address)bean).getStreet() + "'";
            }
            if (((Address)bean).getState() != "" && ((Address)bean).getState() != null) {
                sql += " AND state like '" + ((Address)bean).getState() + "'";
            }
            if (((Address)bean).getFavourite() != 0) {
                sql += " AND favourite =" + ((Address)bean).getFavourite() + "";
            }
            if (((Address)bean).getZip() != "" && ((Address)bean).getZip() != null) {
                sql += " AND zip like '" + ((Address)bean).getZip() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Address address = new Address();
                address.setId_address(rs.getInt("id_address"));
                address.setId_customer(rs.getInt("id_customer"));
                address.setId_city(rs.getInt("id_city"));
                address.setStreet(rs.getString("street"));
                address.setState(rs.getString("state"));
                address.setFavourite(rs.getInt("favourite"));
                address.setZip(rs.getString("zip"));
                //System.out.println(product.toString());
                addresses.add(address);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return addresses;
    }
}
