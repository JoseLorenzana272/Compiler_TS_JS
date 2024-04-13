"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = __importStar(require("path")); // Importa el módulo path para trabajar con rutas de archivos
const parser = require("../Grammar/Lexico.js");
function interprete(contenido) {
    try {
        const ast = parser.parse(contenido);
        ast.ejecutar();
        console.log("Análisis finalizado");
        return ast.getConsola();
    }
    catch (error) {
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
app.get('/', (req, res) => {
    // Sirve tu archivo HTML cuando se accede a la ruta raíz
    res.sendFile(htmlPath);
    console.log("Hola mundo");
});
app.post('/interpretar', (req, res) => {
    const contenido = req.body.contenido;
    console.log(contenido);
    const interpretado = interprete(contenido);
    res.send(interpretado);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    (0, child_process_1.exec)('start http://localhost:3000'); // Este comando abre la URL en el navegador predeterminado
});
