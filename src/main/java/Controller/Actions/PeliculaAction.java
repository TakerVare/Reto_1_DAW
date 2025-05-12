/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller.Actions;

import Model.Pelicula;
import Model.PeliculaDao;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author S2-PC00
 */
public class PeliculaAction implements IAction{

    @Override
    public String execute(  HttpServletRequest request, 
                            HttpServletResponse response, String action) {
        String cadDestino = "";
        switch (action) {
            case "FIND_ALL":
                cadDestino = findAll(request, response);
                break;           
        }
        return cadDestino;
    }
    private String findAll(HttpServletRequest request, 
                                HttpServletResponse response) {

        PeliculaDao peliculaDao = new PeliculaDao();
        ArrayList<Pelicula> peliculas = peliculaDao.findAll(null);
        return Pelicula.toArrayJSon(peliculas);


        /*
        // En lugar de usar el DAO para obtener datos de la base de datos,
        // creamos manualmente un ArrayList con 3 películas de ejemplo
        ArrayList<Pelicula> peliculas = new ArrayList<>();

        // Película 1
        Pelicula pelicula1 = new Pelicula(
                "El Padrino",
                "https://www.youtube.com/watch?v=sY1S34973zA",
                "La historia de la familia Corleone, una de las más poderosas familias de la mafia de Nueva York.",
                "1972-03-24",
                "https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",
                175,
                15000,
                92,
                1,
                8.99);

        // Película 2
        Pelicula pelicula2 = new Pelicula(
                "Titanic",
                "https://www.youtube.com/watch?v=kVrqfYjkTdQ",
                "Un relato ficticio de la tragedia del Titanic, centrado en la historia de amor entre dos pasajeros de diferentes clases sociales.",
                "1997-12-19",
                "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
                195,
                12000,
                88,
                2,
                7.99);

        // Película 3
        Pelicula pelicula3 = new Pelicula(
                "El Señor de los Anillos: El Retorno del Rey",
                "https://www.youtube.com/watch?v=r5X-hFf6Bwo",
                "La conclusión épica de la trilogía del Señor de los Anillos, donde Frodo debe destruir el Anillo Único.",
                "2003-12-17",
                "https://image.tmdb.org/t/p/w500/mWuFbQrXyLk2kMBKF1Jw8QbNYKB.jpg",
                201,
                18000,
                94,
                3,
                9.99);

        // Añadimos las películas al ArrayList
        peliculas.add(pelicula1);
        peliculas.add(pelicula2);
        peliculas.add(pelicula3);

        // Convertimos y devolvemos el ArrayList como JSON
        return Pelicula.toArrayJSon(peliculas);
        */
    }
    
}
