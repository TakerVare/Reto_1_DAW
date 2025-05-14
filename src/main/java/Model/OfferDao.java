package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class OfferDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM OFFERS WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO OFFERS (name, discount, start_date, end_date) VALUES (?, ?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM OFFERS WHERE ID_OFFER = ?";
    private final String SQL_UPDATE = "UPDATE OFFERS SET name = ?, discount = ?, start_date = ?, end_date = ? WHERE ID_OFFER = ?";

    private IMotorSql motorSql;

    public OfferDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Offer offer = (Offer) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setString(1, offer.getName());
            stmt.setDouble(2, offer.getDiscount());
            stmt.setString(3, offer.getStart_date());
            stmt.setString(4, offer.getEnd_date());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir Offer: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idOffer = -1;

        if (e instanceof Integer) {
            idOffer = (Integer) e;
        } else if (e instanceof Offer) {
            idOffer = ((Offer) e).getId_offer();
        }

        if (idOffer > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idOffer);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar Offer: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Offer offer = (Offer) bean;

        if (offer.getId_offer() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, offer.getId_offer());
                stmt.setString(2, offer.getName());
                stmt.setDouble(3, offer.getDiscount());
                stmt.setString(4, offer.getStart_date());
                stmt.setString(5, offer.getEnd_date());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar Offer: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public ArrayList<Offer> findAll(Object bean) {
        ArrayList<Offer> offers = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Offer)bean).getId_offer() != 0 ) {
                sql += " AND id_offer=" + ((Offer)bean).getId_offer() + "";
            }
            if (((Offer)bean).getName() != "" && ((Offer)bean).getName() != null) {
                sql += " AND name like '" + ((Offer)bean).getName() + "'";
            }
            if (((Offer)bean).getDiscount() != 0 ) {
                sql += " AND discount like =" + ((Offer)bean).getDiscount() + "";
            }
            if (((Offer)bean).getStart_date() != "" && ((Offer)bean).getStart_date() != null) {
                sql += " AND start_date like '" + ((Offer)bean).getStart_date() + "'";
            }
            if (((Offer)bean).getEnd_date() != "" && ((Offer)bean).getEnd_date() != null) {
                sql += " AND end_date like '" + ((Offer)bean).getEnd_date() + "'";
            }

        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Offer offer = new Offer();
                offer.setId_offer(rs.getInt("id_offer"));
                offer.setName(rs.getString("name"));
                offer.setDiscount(rs.getDouble("discount"));
                offer.setStart_date(rs.getString("start_date"));
                offer.setEnd_date(rs.getString("end_date"));
                //System.out.println(product.toString());
                offers.add(offer);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return offers;
    }
}
