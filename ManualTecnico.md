# Manual Técnico: Sistema de Intérprete de Lenguaje Personalizado
## José Daniel Lorenzana Medina - 202206560

## Introducción

El sistema de intérprete de lenguaje personalizado es una aplicación diseñada para interpretar y ejecutar código escrito en un lenguaje de programación específico. Este manual técnico proporciona una visión general del diseño, la arquitectura, los componentes y las tecnologías utilizadas en el desarrollo del sistema.

## Arquitectura

El sistema de intérprete sigue una arquitectura de cliente-servidor, donde el cliente es una aplicación web que envía solicitudes al servidor para interpretar y ejecutar código. La arquitectura se compone de los siguientes elementos:

1. **Cliente (Aplicación Web)**: La interfaz de usuario del sistema, donde los usuarios pueden escribir código en el lenguaje personalizado y enviarlo al servidor para su ejecución.

2. **Servidor (Backend)**: El servidor es responsable de recibir las solicitudes del cliente, interpretar el código recibido, ejecutarlo y devolver los resultados al cliente. Está construido con Node.js y Express.js.


``` typescript
const parser = require("../Grammar/Lexico.js");

function interprete(contenido: string) {
    try {
        const ast = parser.parse(contenido);
        ast.ejecutar();
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
```

## Componentes

El sistema consta de varios componentes, cada uno con una función específica en el proceso de interpretación y ejecución del código. Los principales componentes incluyen:

1. **Parser (Analizador Sintáctico)**: Este componente se encarga de analizar el código fuente para identificar la estructura sintáctica del lenguaje. Utiliza un analizador léxico y un analizador de sintaxis para convertir el código en una representación intermedia (AST - Árbol de Sintaxis Abstracta) que pueda ser interpretada por el sistema.

2. **AST (Árbol de Sintaxis Abstracta)**: El AST es una representación intermedia del código fuente después de ser analizado por el parser. Consiste en una estructura de árbol que captura la estructura sintáctica del código, lo que facilita su interpretación y ejecución por parte del sistema.

``` typescript
export class AST{
    public instrucciones: Instruccion[]
    public consola: string[]
    public global: Environment

    constructor(instrucciones: Instruccion[]){
        this.instrucciones = instrucciones
        this.consola = []
        this.global = new Environment(null)
    }

    public ejecutar(): void{
        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(this.global, this.consola)
        });
    }
```

3. **Interprete**: El intérprete es responsable de recorrer el AST generado a partir del código fuente y ejecutar las instrucciones definidas en él. Cada nodo del AST se interpreta de acuerdo con las reglas definidas en el lenguaje personalizado.

``` typescript
function interprete(contenido: string) {
    try {
        const ast = parser.parse(contenido);
        ast.ejecutar();
        console.log("Análisis finalizado");
        return ast.getConsola();
    } catch (error) {
        console.error(error);
    }
}

```

4. **Environment (Entorno de Ejecución)**: El entorno de ejecución mantiene un seguimiento de las variables, funciones y otros elementos definidos durante la ejecución del código. Proporciona un contexto para la interpretación del código y facilita el manejo de ámbitos y alcances.

``` typescript
export class Environment{
    private variables: Map<string,Symbol>
    private functions: Map<string,Function>

    constructor(public previous: Environment | null){
        this.variables = new Map()
        this.functions = new Map()
    }

    public saveVar(id:string, value:any, type:TipoDato, line:number, column:number) : void{
        let env: Environment | null = this;
        if(env.variables.has(id)){
            this.editVar(id,value,type,line,column);
        }
        this.variables.set(id,new Symbol(id,type,value, line, column));
    }

```

5. **Expresiones e Instrucciones**: Estos son elementos fundamentales del lenguaje personalizado que representan operaciones aritméticas, lógicas, declaraciones de variables, funciones, entre otros.
``` typescript
export abstract class  Expresion{
    public line: number;
    public column: number; 
    // Esta clase siempre pedirá línea y columna
    constructor(line: number, colum:number){
        this.line = line;
        this.column = colum;
    }
    // Método que siempre debe ejecutarse en todos los objetos que hereda
    public abstract interpretar(environment_name: Environment):Resultado;
        
 }
```

## Tecnologías Utilizadas

El sistema de intérprete de lenguaje personalizado se ha desarrollado utilizando las siguientes tecnologías:

- **Node.js**: Plataforma de ejecución de JavaScript del lado del servidor.
- **Express.js**: Marco de aplicación web de Node.js para construir el servidor.
- **Jison**: Generador de analizadores sintácticos que se utiliza para construir el parser del lenguaje personalizado.
- **HTML/CSS/JavaScript**: Para la creación de la interfaz de usuario del cliente.
- **Express Static Middleware**: Para servir archivos estáticos, como la interfaz web, al cliente.
``` html5
    const buttonRun = document.getElementById("ejecutarButton");
      
        buttonRun.addEventListener("click", () => {
    const textoEditor = editor.getValue(); // Obtiene el texto del editor

    fetch("/interpretar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ contenido: textoEditor })
    })
    .then(response => response.text()) // Recibe la respuesta como texto
    .then(data => {
        console.log(data); // Muestra el resultado en la consola
        editor2.setValue(data); // Establece el resultado en el editor de consola
    })
    .catch(error => console.error(error));
});
```

## Instalación y Configuración

Para instalar y configurar el sistema de intérprete de lenguaje personalizado, siga estos pasos:

1. Clone el repositorio del proyecto desde el repositorio remoto.
2. Asegúrese de tener Node.js y npm instalados en su sistema.
3. Ejecute `npm install` en el directorio raíz del proyecto para instalar las dependencias.
4. Inicie el servidor ejecutando `node server.js` en el directorio raíz del proyecto.
5. Acceda a la aplicación a través de su navegador web visitando la URL proporcionada.

## Uso

Una vez que la aplicación esté en funcionamiento, puede utilizarla de la siguiente manera:

1. Abra la interfaz de usuario en su navegador web.
2. Escriba el código en el lenguaje personalizado en el editor proporcionado.
3. Envíe el código al servidor haciendo clic en el botón de ejecución.
4. Visualice los resultados de la ejecución en la consola de salida.

## Consideraciones de Seguridad

Al implementar el sistema de intérprete de lenguaje personalizado en un entorno de producción, es importante tener en cuenta las siguientes consideraciones de seguridad:

- **Validación de Entrada**: Validar y filtrar cualquier entrada de usuario para evitar ataques de inyección de código.
- **Restricciones de Recursos**: Establecer límites en los recursos (CPU, memoria, tiempo de ejecución) para evitar abusos y ataques de denegación de servicio.
- **Monitoreo de Actividad**: Implementar registros de actividad y supervisión para detectar y responder a posibles intentos de intrusión o comportamiento malicioso.

## Conclusión

El sistema de intérprete de lenguaje personalizado proporciona una plataforma para escribir, ejecutar y probar código en un lenguaje específico. Con una arquitectura cliente-servidor y un enfoque modular, el sistema es flexible y escalable para su uso en una variedad de aplicaciones y entornos. Mediante el uso de tecnologías modernas y buenas prácticas de seguridad, el sistema ofrece una experiencia segura y confiable para los usuarios finales.
