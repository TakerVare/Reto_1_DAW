package Model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class JobOfferDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM JOB_OFFER WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO JOB_OFFER (id_rol, id_shop, name, description) VALUES (?, ?, ?, ?)";
    private final String SQL_DELETE = "DELETE FROM JOB_OFFER WHERE ID_JOB_OFFER = ?";
    private final String SQL_UPDATE = "UPDATE JOB_OFFER SET id_rol = ?, id_shop = ?, name = ?, description = ? WHERE ID_JOB_OFFER = ?";

    private IMotorSql motorSql;

    public JobOfferDao() {
       
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        JobOffer job_offer = (JobOffer) bean;

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
            System.out.println("Error al añadir JobOffer: " + e.getMessage());
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
        } else if (e instanceof JobOffer) {
            idJob_Offer = ((JobOffer) e).getId_job_offer();
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
                System.out.println("Error al eliminar JobOffer: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        JobOffer job_offer = (JobOffer) bean;

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
                System.out.println("Error al actualizar JobOffer: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }


    @Override
    public ArrayList<JobOffer> findAll(Object bean) {
        ArrayList<JobOffer> job_offers = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((JobOffer)bean).getId_job_offer() != 0 ) {
                sql += " AND id_job_offer=" + ((JobOffer)bean).getId_job_offer() + "";
            }
            if (((JobOffer)bean).getId_rol() != 0) {
                sql += " AND id_rol=" + ((JobOffer)bean).getId_rol() + "";
            }
            if (((JobOffer)bean).getId_shop() != 0) {
                sql += " AND id_shop=" + ((JobOffer)bean).getId_shop() + "";
            }
            if (((JobOffer)bean).getName() != "" && ((JobOffer)bean).getName() != null) {
                sql += " AND name like '" + ((JobOffer)bean).getName() + "'";
            }
            if (((JobOffer)bean).getDescription() != "" && ((JobOffer)bean).getDescription() != null) {
                sql += " AND description like '" + ((JobOffer)bean).getDescription() + "'";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                JobOffer job_offer = new JobOffer();
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