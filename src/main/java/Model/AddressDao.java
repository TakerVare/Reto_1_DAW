package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class AddressDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM ADDRESSES WHERE 1=1 ";
    private IMotorSql motorSql;

    public AddressDao() {
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
