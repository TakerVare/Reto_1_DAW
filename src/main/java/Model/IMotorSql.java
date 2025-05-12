/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author S2-PC00
 */
public interface IMotorSql {
    public void connect();

    public boolean execute(PreparedStatement stmt);
    public boolean execute(); //Al no tener argumento se ejecuta como e´ste
    // Consultas DDL - Data Definition Language
    public void execute(String sql); //Antes int, cambio a void
    // Consultas DML - Data Manipulation Language
    public ResultSet executeQuery(String sql);
    public void disconnect();

    public Connection getConnection();

    public void setPreparedStatement(PreparedStatement stmt);
}