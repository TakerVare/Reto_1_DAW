/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import java.sql.*;

public class MotorSql implements IMotorSql{
/*Objetos necesarios para hablar con la BD*/
//1º--> Conexión - Connection
//2º--> Hablar en SQL - Statement
//3º--> Recoger datos - Resultset
    public static String DRIVER_NAME = "com.mysql.cj.jdbc.Driver";
    //public static String MYSQL_URL="jdbc:mysql://localhost:3306/burweb_db";
    public static String MYSQL_URL="jdbc:mysql://database-burweb.citknh3u1vk8.us-east-1.rds.amazonaws.com:3306/DatabaseBurWeb";
    public static String MYSQL_USER="admin";
    public static String MYSQL_USER_PASS="Cambiame2025";
    private Connection m_Connection;
    private Statement m_Statement;
    private ResultSet m_ResultSet;
    private PreparedStatement m_PrepareStatement;

    public Connection getConnection(){
        return m_Connection;
    }

// ¿Dónde está la Base de Datos?
     /*
    private static final String URL = "jdbc:derby://localhost:3306/burweb_db";
    private static final String CONTROLADOR = "org.apache.derby.jdbc.ClientDriver";
    private static final String USER = "admin";
    private static final String PASS = "Cambiame2025";
    */
    // Métodos de lectura y manipulación de
    // la Base de Datos
    public void connect() {
        try{
            Class.forName(DRIVER_NAME);
            m_Connection = DriverManager.getConnection(MYSQL_URL, MYSQL_USER, MYSQL_USER_PASS);
            m_Statement = m_Connection.createStatement();
        }catch (ClassNotFoundException e){
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    @Override
    public boolean execute(PreparedStatement stmt) {
        setPreparedStatement(stmt);
        return execute();
    }

    @Override
    public boolean execute() {
        boolean bRet = false;
        if(m_PrepareStatement != null)
        {
            try {
                bRet=m_PrepareStatement.execute();
            } catch (SQLException sqlEx) {
                System.out.println(sqlEx.getMessage());
                throw new RuntimeException(sqlEx.getMessage());
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
        return bRet;

    }


    // Consultas DDL - Data Definition Language
    public void execute(String sql) {
        try {
            m_ResultSet=m_Statement.executeQuery(sql);
        } catch (SQLException sqlEx) {
            System.out.println(sqlEx.getMessage());
            m_ResultSet = null;
        }
       
    }
    // Consultas DML - Data Manipulation Language
    public ResultSet executeQuery(String sql) {
        try {
            m_ResultSet = m_Statement.executeQuery(sql);
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return m_ResultSet;
    }
    
    public void disconnect() {
        try {
            if (m_ResultSet != null) {
                m_ResultSet.close();
            }
            if (m_Statement != null) {
                m_Statement.close();
            }
            if (m_Connection != null) {
                m_Connection.close();
            }
        } catch (SQLException ex) {
        }
    }

    public void setPreparedStatement(PreparedStatement stmt){
        m_PrepareStatement = stmt;
    }

}
