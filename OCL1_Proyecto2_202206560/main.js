const analyzeList = require('./Expresiones/listValues.js');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
let cors = require('cors');

app.use(cors());
app.use(express.json());

const parser = require('./Lexico');

// Servir archivos estáticos desde el directorio "public"
app.use(express.static('public'));

app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname, 'interfaz.html'));
});

app.post( "/compilar",(req,res) =>{

    try {
        var resultado = parser.parse(req.body.textoEditor);
        let resultadoString = '';
        //console.log('Resultado:', resultado);
        var salida = analyzeList(resultado.instrucciones);
        // Esto es lo que debe de imprimir
        console.log('Salida: ', salida);
        resultado.instrucciones.forEach(function (elemento) {
            resultadoString += elemento + '\n'; // Agregar cada elemento al resultado con un salto de línea
        });

        // Enviar el resultado al cliente como respuesta
        res.status(200).send(salida);
    } catch (error) {
        console.error(error);
        // Enviar un mensaje de error al cliente si ocurre un error durante el análisis
        res.status(500).send("Error durante el análisis");
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
