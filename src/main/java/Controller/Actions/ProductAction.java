package Controller.Actions;

import Model.Product;
import Model.ProductDao;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//Imports para el manejo de ficheros
import java.io.File;
import java.io.FileOutputStream;
import java.util.Base64;

public class ProductAction implements IAction {

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response, String action) {
        String cadDestino = "";
        switch (action) {
            case "FIND_ALL":
                cadDestino = findAll(request, response);
                break;
            case "DELETE":
                cadDestino = delete(request, response);
                break;
            case "ADD":
                cadDestino = add(request, response);
                break;
            case "UPDATE":
                cadDestino = update(request, response);
                break;
        }
        return cadDestino;
    }

    private String findAll(HttpServletRequest request,
                           HttpServletResponse response) {

        ProductDao productDao = new ProductDao();
        ArrayList<Product> products = productDao.findAll(null);
        return Product.toArrayJSon(products);
    }

    private String delete(HttpServletRequest request, HttpServletResponse response) {
        int idProduct = Integer.parseInt(request.getParameter("id_product"));

        ProductDao productDao = new ProductDao();
        int result = productDao.delete(idProduct);

        return "{\"result\":" + result + "}";
    }


    //Modificación crítica, guardo copia
    /*
    private String add(HttpServletRequest request, HttpServletResponse response) {
        Product product = new Product();
        product.setId_tax(Integer.parseInt(request.getParameter("id_tax")));
        product.setId_category(Integer.parseInt(request.getParameter("id_category")));
        product.setName(request.getParameter("name"));
        product.setDescription(request.getParameter("description"));
        product.setPrice(Double.parseDouble(request.getParameter("price")));
        product.setImage(request.getParameter("image"));

        ProductDao productDao = new ProductDao();
        int result = productDao.add(product);

        return "{\"result\":" + result + "}";
    }
*/

    //Inicio edición Guillermo add + images
    private String add(HttpServletRequest request, HttpServletResponse response) {
        Product product = new Product();
        product.setId_tax(Integer.parseInt(request.getParameter("id_tax")));
        product.setId_category(Integer.parseInt(request.getParameter("id_category")));
        product.setName(request.getParameter("name"));
        product.setDescription(request.getParameter("description"));
        product.setPrice(Double.parseDouble(request.getParameter("price")));

        // Obtener la imagen como cadena (podría ser una URL de datos base64)
        String imageString = request.getParameter("image");

        // Si la imagen está en formato base64, guardarla en la carpeta "images"
        if (imageString != null && imageString.startsWith("data:image")) {
            try {
                // Extraer el tipo de imagen y los datos base64
                String[] parts = imageString.split(",");
                String imageType = parts[0].split(";")[0].split(":")[1];
                String imageExtension = imageType.split("/")[1];
                String base64Data = parts[1];

                // Decodificar los datos base64
                byte[] imageBytes = Base64.getDecoder().decode(base64Data);

                // Generar un nombre único para el archivo
                String fileName = System.currentTimeMillis() + "." + imageExtension;

                // Obtener la ruta real de la carpeta "images" en la raíz del proyecto
                String imagesPath = request.getServletContext().getRealPath("/images");

                // Crear la carpeta si no existe
                File imagesDir = new File(imagesPath);
                if (!imagesDir.exists()) {
                    imagesDir.mkdirs();
                }

                // Ruta completa del archivo
                String filePath = imagesPath + File.separator + fileName;

                // Guardar el archivo
                try (FileOutputStream fos = new FileOutputStream(filePath)) {
                    fos.write(imageBytes);
                }

                // Establecer la ruta relativa en la propiedad "image"
                product.setImage("images/" + fileName);
            } catch (Exception e) {
                // Manejar errores al procesar la imagen
                System.out.println("Error al procesar la imagen: " + e.getMessage());
                product.setImage(imageString); // Usar la cadena original en caso de error
            }
        } else {
            // Si no es una cadena base64, usar la cadena original
            product.setImage(imageString);
        }

        ProductDao productDao = new ProductDao();
        int result = productDao.add(product);

        return "{\"result\":" + result + "}";
    }
    //fin edición Guillermo

    private String update(HttpServletRequest request, HttpServletResponse response) {
        Product product = new Product();
        product.setId_product(Integer.parseInt(request.getParameter("id_product")));
        product.setId_tax(Integer.parseInt(request.getParameter("id_tax")));
        product.setId_category(Integer.parseInt(request.getParameter("id_category")));
        product.setName(request.getParameter("name"));
        product.setDescription(request.getParameter("description"));
        product.setPrice(Double.parseDouble(request.getParameter("price")));
        product.setImage(request.getParameter("image"));

        ProductDao productDao = new ProductDao();
        int result = productDao.update(product);

        return "{\"result\":" + result + "}";
    }

}
