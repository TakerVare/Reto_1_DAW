package Model;

import javax.lang.model.element.Element;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class TaxDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM TAXES WHERE 1=1 ";
    private final String SQL_INSERT = "INSERT INTO TAXES (name, percentage) VALUES (?, ?)";
    private final String SQL_DELETE = "DELETE FROM TAXES WHERE ID_TAX = ?";
    private final String SQL_UPDATE = "UPDATE TAXES SET name = ?, percentage = ? WHERE ID_TAX = ?";

    private IMotorSql motorSql;

    public TaxDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada:
        motorSql = new MotorSql();
    }

    @Override
    public int add(Object bean) {
        int result = 0;
        Tax tax = (Tax) bean;

        try {
            motorSql.connect();
            PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_INSERT);
            stmt.setString(1, tax.getName());
            stmt.setDouble(2, tax.getPercentage());

            motorSql.setPreparedStatement(stmt);
            motorSql.execute();
            result = 1; // Asumimos que la operación fue exitosa
        } catch (SQLException e) {
            System.out.println("Error al añadir Tax: " + e.getMessage());
        } finally {
            motorSql.disconnect();
        }

        return result;
    }

    @Override
    public int delete(Object e) {
        int result = 0;
        Integer idTax = -1;

        if (e instanceof Integer) {
            idTax = (Integer) e;
        } else if (e instanceof Tax) {
            idTax = ((Tax) e).getId_tax();
        }

        if (idTax > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_DELETE);
                stmt.setInt(1, idTax);

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al eliminar Tax: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }

    @Override
    public int update(Object bean) {
        int result = 0;
        Tax tax = (Tax) bean;

        if (tax.getId_tax() > 0) {
            try {
                motorSql.connect();
                PreparedStatement stmt = motorSql.getConnection().prepareStatement(SQL_UPDATE);
                stmt.setInt(1, tax.getId_tax());
                stmt.setString(2, tax.getName());
                stmt.setDouble(3, tax.getPercentage());

                motorSql.setPreparedStatement(stmt);
                motorSql.execute();
                result = 1; // Asumimos que la operación fue exitosa
            } catch (SQLException ex) {
                System.out.println("Error al actualizar Tax: " + ex.getMessage());
            } finally {
                motorSql.disconnect();
            }
        }

        return result;
    }


    @Override
    public ArrayList<Tax> findAll(Object bean) {
        ArrayList<Tax> taxes = new ArrayList<>();

        String sql= SQL_FINDALL;
        motorSql.connect();
        if (bean != null) {
            if (((Tax)bean).getId_tax() != 0) {
                sql += " AND id_tax=" + ((Tax)bean).getId_tax() + "";
            }
            if (((Tax)bean).getName() != "" && ((Tax)bean).getName() != null) {
                sql += " AND name like '" + ((Tax)bean).getName() + "'";
            }
            if (((Tax)bean).getPercentage() != 0) {
                sql += " AND percentage=" + ((Tax)bean).getPercentage() + "";
            }
        }
        sql+=" ;";

        try {

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Tax tax = new Tax();
                tax.setId_tax(rs.getInt("id_tax"));
                tax.setName(rs.getString("name"));
                tax.setPercentage(rs.getDouble("percentage"));
                //System.out.println(product.toString());
                taxes.add(tax);

            }



        }

        catch (SQLException e) {
            System.out.println(e);

        } finally {
            motorSql.disconnect();
        }

        return taxes;
    }
}
