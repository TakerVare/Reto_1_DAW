document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los elementos DOM
    const dragDropArea = document.getElementById('dragDropArea');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const uploadPrompt = document.getElementById('uploadPrompt');
    
    // Añadir botón para eliminar imagen
    const removeButton = document.createElement('div');
    removeButton.className = 'remove-image hidden';
    removeButton.innerHTML = '<i class="fas fa-times"></i>';
    dragDropArea.appendChild(removeButton);
    
    // Función para mostrar la imagen seleccionada
    function displayImage(file) {
        // Verificar que el archivo es una imagen
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona un archivo de imagen válido.');
            return;
        }
        
        // Crear URL para la imagen
        const reader = new FileReader();
        reader.onload = function(e) {
            // Mostrar la imagen y ocultar el prompt
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            uploadPrompt.classList.add('hidden');
            removeButton.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
    
    // Evento para cuando se selecciona un archivo mediante el input
    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            displayImage(this.files[0]);
        }
    });
    
    // Eventos para arrastrar y soltar
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Cambiar estilo cuando se arrastra sobre el área
    ['dragenter', 'dragover'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, function() {
            dragDropArea.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, function() {
            dragDropArea.classList.remove('dragover');
        }, false);
    });
    
    // Manejar el evento drop
    dragDropArea.addEventListener('drop', function(e) {
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            imageInput.files = files; // Actualizar el input para enviar el formulario
            displayImage(files[0]);
        }
    }, false);
    
    // Evento para eliminar la imagen
    removeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        imagePreview.src = '';
        imagePreview.classList.add('hidden');
        uploadPrompt.classList.remove('hidden');
        removeButton.classList.add('hidden');
        imageInput.value = ''; // Limpiar el input
    });
    
    // Hacer que el área sea clickeable para seleccionar archivo
    dragDropArea.addEventListener('click', function() {
        // Si no hay una imagen mostrada, abrir el selector de archivos
        if (imagePreview.classList.contains('hidden')) {
            imageInput.click();
        }
    });
});