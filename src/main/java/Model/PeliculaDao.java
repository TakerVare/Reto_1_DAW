/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author S2-PC00
 */
public class PeliculaDao implements IDao {

    private final String SQL_FINDALL = "SELECT * FROM peliculas WHERE 1=1 ";
    private IMotorSql motorSql;
    
    public PeliculaDao() {
        // Opción sencilla: motorSql = new MotorSQL();
        // Opción más avanzada: 
        motorSql = new MotorSql();
    }
        
    @Override
    public int add(Object bean) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int delete(Object e) {
        return 0;
    }

    @Override
    public int update(Object bean) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ArrayList<Pelicula> findAll(Object bean) {
        ArrayList<Pelicula> peliculas = new ArrayList<>();
        String sql= SQL_FINDALL;
        try {
            motorSql.connect();
            if (bean != null) {
                if (((Pelicula)bean).getId() != 0) {
                    sql += " AND ID_PELICULA='" + ((Pelicula)bean).getId() + "'";
                }
                if (((Pelicula)bean).getTitulo() != null) {
                    sql += " AND TITULO='" + ((Pelicula)bean).getTitulo() + "'";
                }
                if (((Pelicula)bean).getPrecio() > 0) {
                    sql += " AND PRECIO=" + ((Pelicula)bean).getPrecio() + "";
                }
                if (((Pelicula)bean).getTrailer() != null) {
                    sql += " AND TRAILER='" + ((Pelicula)bean).getTrailer() + "'";
                }
                if (((Pelicula)bean).getSinopsis() != null) {
                    sql += " AND SINOPSIS LIKE('%" + ((Pelicula)bean).getSinopsis() + "%')";
                }
                if (((Pelicula)bean).getnVotos() != 0) {
                    sql += " AND N_VOTOS='" + ((Pelicula)bean).getnVotos() + "'";
                }
                if (((Pelicula)bean).getsPuntuacion() != 0) {
                    sql += " AND S_PUNTUACION='" + ((Pelicula)bean).getsPuntuacion() + "'";
                }
                if (((Pelicula)bean).getFechaEstreno() != null) {
                    sql += " AND FECHA_ESTRENO='" + ((Pelicula)bean).getFechaEstreno() + "'";
                }
                if (((Pelicula)bean).getUrl()!= null) {
                    sql += " AND URL='" + ((Pelicula)bean).getUrl() + "'";
                }
            }

            System.out.println(sql);
            ResultSet rs = motorSql.executeQuery(sql);

            while (rs.next()) {// TRANSFOMAR LA COLECCIÓN DEBASE DE DATOS A UN ARRAYLIST
                Pelicula pelicula = new Pelicula();
                pelicula.setId(rs.getInt("ID"));
                pelicula.setTitulo(rs.getString("TITULO"));
                pelicula.setPrecio(rs.getDouble("PRECIO"));
                pelicula.setTrailer(rs.getString("TRAILER"));
                pelicula.setSinopsis(rs.getString("DESCRIPCION"));
                pelicula.setnVotos(rs.getInt("N_VOTOS"));
                pelicula.setsPuntuacion(rs.getInt("S_PUNTUACION"));
                pelicula.setFechaEstreno(rs.getString("ANO"));
                pelicula.setUrl(rs.getString("URL"));
                    /*Genero genero = new Genero();
                    genero.setIdGenero(rs.getInt(10));
                pelicula.setGenero(genero);*/

                peliculas.add(pelicula);

            }
        } catch (SQLException e) {
            System.out.println(e);
        } finally {
            motorSql.disconnect();
        }
        return peliculas;
        
    }
}
