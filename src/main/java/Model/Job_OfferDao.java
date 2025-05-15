package Model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class Job_OfferDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM JOB_OFFER WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO JOB_OFFER (id_rol, id_shop, name, description) VALUES (?, ?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM JOB_OFFER WHERE ID_JOB_OFFER = ?";
    private final String SQL_UPDATE = "UPDATE JOB_OFFER SET id_rol = ?, id_shop = ?, name = ?, description = ? WHERE ID_JOB_OFFER = ?";

    private IMotorSql motorSql;

    public Job_OfferDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Job_Offer job_offer = (Job_Offer) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setInt(1, job_offer.getId_rol());
            stmt.setInt(2, job_offer.getId_shop());
            stmt.setString(3, job_offer.getName());
            stmt.setString(4, job_offer.getDescription());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir Job_Offer: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idJob_Offer = -1;

        if (e instanceof Integer) {
            idJob_Offer = (Integer) e;
        } else if (e instanceof Job_Offer) {
            idJob_Offer = ((Job_Offer) e).getId_job_offer();
        }

        if (idJob_Offer > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idJob_Offer);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar Job_Offer: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Job_Offer job_offer = (Job_Offer) bean;

        if (job_offer.getId_job_offer() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, job_offer.getId_job_offer());
                stmt.setInt(2, job_offer.getId_rol());
                stmt.setInt(3, job_offer.getId_shop());
                stmt.setString(4, job_offer.getName());
                stmt.setString(5, job_offer.getDescription());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar Job_Offer: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }


    @Override
    public ArrayList<Job_Offer> findAll(Object bean) {
        ArrayList<Job_Offer> job_offers = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Job_Offer)bean).getId_job_offer() != 0 ) {
                sql += " AND id_job_offer=" + ((Job_Offer)bean).getId_job_offer() + "";
            }
            if (((Job_Offer)bean).getId_rol() != 0) {
                sql += " AND id_rol=" + ((Job_Offer)bean).getId_rol() + "";
            }
            if (((Job_Offer)bean).getId_shop() != 0) {
                sql += " AND id_shop=" + ((Job_Offer)bean).getId_shop() + "";
            }
            if (((Job_Offer)bean).getName() != "" && ((Job_Offer)bean).getName() != null) {
                sql += " AND name like '" + ((Job_Offer)bean).getName() + "'";
            }
            if (((Job_Offer)bean).getDescription() != "" && ((Job_Offer)bean).getDescription() != null) {
                sql += " AND description like '" + ((Job_Offer)bean).getDescription() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Job_Offer job_offer = new Job_Offer();
                job_offer.setId_job_offer(rs.getInt("id_job_offer"));
                job_offer.setId_rol(rs.getInt("id_rol"));
                job_offer.setId_shop(rs.getInt("id_shop"));
                job_offer.setName(rs.getString("name"));
                job_offer.setDescription(rs.getString("description"));
                //System.out.println(product.toString());
                job_offers.add(job_offer);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return job_offers;
    }
}