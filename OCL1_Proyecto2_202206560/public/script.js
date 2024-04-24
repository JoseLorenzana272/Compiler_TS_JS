// Obtener referencia a los botones por su ID
const crearButton = document.getElementById("crearButton");
const abrirButton = document.getElementById("abrirButton");
const guardarButton = document.getElementById("guardarButton");
const ejecutarButton = document.getElementById("ejecutarButton");
const reportesButton = document.getElementById("reportesButton");
const textarea1 = document.getElementById("myTextarea");
const textarea2 = document.getElementById("myTextarea2");

// Función para limpiar el contenido del editor
function limpiarEditor() {
    editor.setValue(""); // Limpia el contenido del editor
}

// Función para abrir un archivo y colocar su contenido en el editor
function abrirArchivo(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        editor.setValue(reader.result); // Establece el contenido del archivo en el editor
    };
    reader.readAsText(file);
}

// Función para guardar el contenido del editor en un archivo
function guardarArchivo() {
    const content = editor.getValue(); // Obtener el contenido del editor
    const blob = new Blob([content], { type: "text/plain" }); // Crear un blob con el contenido
    const url = URL.createObjectURL(blob); // Crear una URL para el blob
    const a = document.createElement("a"); // Crear un elemento <a>
    a.href = url; // Establecer la URL del archivo
    a.download = "archivo.txt"; // Establecer el nombre del archivo
    a.click(); // Simular un clic en el elemento <a>
    URL.revokeObjectURL(url); // Liberar la URL del archivo
}

// Agregar eventos a los botones
crearButton.addEventListener("click", function() {
  // Lógica para el botón "Archivo"
  console.log("Haz clic en el botón 'Crear'");
  limpiarEditor(); // Limpia el contenido del editor
});

abrirButton.addEventListener("click", function() {
  // Lógica para el botón "Abrir"
  console.log("Haz clic en el botón 'Abrir'");
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".sc"; // Establecer el tipo de archivo permitido, por ejemplo, .txt
  input.onchange = abrirArchivo; // Llama a la función abrirArchivo cuando se selecciona un archivo
  input.click();
});

guardarButton.addEventListener("click", function() {
  // Lógica para el botón "Guardar"
  console.log("Haz clic en el botón 'Guardar'");
  guardarArchivo(); // Guarda el contenido del editor en un archivo
});

ejecutarButton.addEventListener("click", function() {
  // Lógica para el botón "Ejecutar"
  console.log("Haz clic en el botón 'Ejecutar'");
});

reportesButton.addEventListener("click", function() {
  // Lógica para el botón "Reportes"
  console.log("Haz clic en el botón 'Reportes'");
});

textarea1.addEventListener("input", function() {
  // Lógica para el textarea1
  console.log("Haz escrito en el textarea1");
});

textarea2.addEventListener("input", function() {
  // Lógica para el textarea2
  console.log("Haz escrito en el textarea2");
});
