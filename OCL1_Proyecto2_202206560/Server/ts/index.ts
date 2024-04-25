import { Request, Response } from "express";
import { exec } from 'child_process';
import * as path from 'path'; // Importa el módulo path para trabajar con rutas de archivos
const fs = require('fs');

const parser = require("../Grammar/Lexico.js");


function interprete(contenido: string) {
    try {
        const ast = parser.parse(contenido);
        
        ast.ejecutar();
        var graph = ast.generateGraphvizDOT()

        console.log(graph);
        seeImage(graph);
        console.log("Análisis finalizado");
        return ast.getConsola();
    } catch (error) {
        console.error(error);
    }
}

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// Define la ruta donde se sirve tu archivo HTML
const htmlPath = path.join('C:/Users/PERSONAL/Downloads/OLC1_Proyecto2_202206560/OCL1_Proyecto2_202206560/interfaz.html');
app.use(express.static(path.join("C:/Users/PERSONAL/Downloads/OLC1_Proyecto2_202206560/OCL1_Proyecto2_202206560/public")));


app.get('/', (req: Request, res: Response) => {
    // Sirve tu archivo HTML cuando se accede a la ruta raíz
    res.sendFile(htmlPath);
    console.log("Hola mundo");
});

app.post('/interpretar', (req: Request, res: Response) => {
    const contenido = req.body.contenido;
    console.log(contenido);
    const interpretado = interprete(contenido);
    
    res.send( interpretado );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    exec('start http://localhost:3000'); // Este comando abre la URL en el navegador predeterminado
});

function seeImage(texto: string): void {
    const outputPath = path.join(__dirname, 'output.dot');
    fs.writeFile(outputPath, texto, (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error("Error al escribir el archivo:", err);
        } else {
            console.log("Archivo .dot generado con éxito.");
            generarImagen();
        }
    });

    function generarImagen(): void {
        const inputPath = path.join(__dirname, 'output.dot');
        const outputPath = path.join(__dirname, 'output.png');

        const cmd: string = `dot -Tpng ${inputPath} -o ${outputPath} && start ${outputPath}`;


        exec(cmd, (error: Error | null, stdout: string, stderr: string) => {
            if (error) {
                console.error(`Error al ejecutar el comando: ${error}`);
                return;
            }
            if (stderr) {
                console.error(`Error en stderr: ${stderr}`);
                return;
            }
            console.log('Imagen generada y abierta con éxito.');
        });
    }
}