# Informe Práctica 11 - Cliente y servidor para una aplicación de procesamiento de notas de texto.

# 1.Introducción.
---
En esta práctica se implementa una aplicación de procesamiento de notas de texto donde se utiliza un **servidor**, un **socket** y un **cliente**. Todo esto es posible gracias al módulo `net` de **Node.js**.

Se usará la aplicación de Notas de Texto de la **Práctica 9** para implementar esta aplicación, así ahorramos tiempo en volver a diseñar todo lo relacionado a las Notas y nos enfocamos en el cliente-servidor. El usuario deberá poder interactuar con la aplicación mediante la linea de comandos.

# 2. Objetivos.
---
Tendremos como objetivo:
* Saber utilizar la clase **EventEmitter** proporcionada por el módulo **Events**.
* Aprender a utilizar el módulo `net` de **Node.js**.
* Aprender a trabajar con **sockets** para las operaciones **cliente-servidor**.

# 3. Ejercicio - Aplicación de procesamiento de notas de texto.
---
Los requisitos que debe cumplir la aplicación de procesamiento de notas de texto son los enumerados a continuación:
1. La aplicación de notas deberá permitir que múltiples usuarios interactúen con ella.
2. Una nota estará formada, como mínimo, por un título, un cuerpo y un color (rojo, verde, azul o amarillo).
3. Cada usuario tendrá su propia lista de notas, con la que podrá llevar a cabo las siguientes operaciones:

* Añadir una nota a la lista. Antes de añadir una nota a la lista se debe comprobar si ya existe una nota con el mismo título. En caso de que así fuera, deberá mostrarse un mensaje de error por la consola del cliente. En caso contrario, se añadirá la nueva nota a la lista y se mostrará un mensaje informativo por la consola del cliente.

* Modificar una nota de la lista. Antes de modificar una nota, previamente se debe comprobar que exista una nota con el título de la nota a modificar en la lista. Si existe, se procede a su modificación y se emite un mensaje informativo por la consola del cliente. En caso contrario, debe mostrarse un mensaje de error por la consola del cliente.

* Eliminar una nota de la lista. Antes de eliminar una nota, previamente se debe comprobar que exista una nota con el título de la nota a eliminar en la lista. Si existe, se procede a su eliminación y se emite un mensaje informativo por la consola del cliente. En caso contrario, debe mostrarse un mensaje de error por la consola del cliente.

* Listar los títulos de las notas de la lista. Los títulos de las notas deben mostrarse por la consola del cliente con el color correspondiente de cada una de ellas. Use el paquete `chalk` para ello.

* Leer una nota concreta de la lista. Antes de mostrar el título y el cuerpo de la nota que se quiere leer, se debe comprobar que en la lista existe una nota cuyo título sea el de la nota a leer. Si existe, se mostrará el título y cuerpo de la nota por la consola del cliente con el color correspondiente de la nota. Para ello, use el paquete `chalk`. En caso contrario, se mostrará un mensaje de error por la consola del cliente.

* Todos los mensajes informativos se mostrarán con color verde, mientras que los mensajes de error se mostrarán con color rojo. Use el paquete `chalk` para ello.

* El servidor es responsable de hacer persistente la lista de notas de cada usuario.
  * Guardar cada nota de la lista en un fichero con formato JSON. Los ficheros JSON correspondientes a las notas de un usuario concreto deberán almacenarse en un directorio con el nombre de dicho usuario.
  * Cargar una nota desde los diferentes ficheros con formato JSON almacenados en el directorio del usuario correspondiente.

4. Un usuario solo puede interactuar con la aplicación de procesamiento de notas de texto a través de la línea de comandos del cliente. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete `yargs`.

### Ejercicio resuelto:
---

**Clase NotesDatabase:**

```ts

```
**Explicación de NotesDatabase:**

**Clase Note:**

```ts

```

**Explicación de Note:**

**Cliente:**

```ts

```

**Explicación de Cliente:**

**Clase EventEmitterClient:**

```ts

```

**Explicación de EventEmitterClient:**

**Server:**

```ts

```

**Explicación de Server:**

**Clase EventEmitterServer:**

```ts

```

**Explicación de EventEmitterServer:**

## 4. Pruebas TDD.
---

### Client Tests.

```ts

```

### Note class Tests.

```ts

```
### NotesDatabase class Tests.

```ts

```

### Server Tests.

```ts

```
### Resultado de las pruebas:

```bash

```

## 5. Cubrimiento de código (Coveralls - Instambul).
---
En esta práctica se han añadido un informe de cubrimiento de código. Así podemos observar el porcentaje de nuestro código que está cubierto por las pruebas realizadas con **Mocha** y **Chai**.

Ejecutamos el comando `npm run coverage` para obtener la tabla con los resultados por consola.

**FOTO TABLA**

## 6. Documentación..
---
Esta práctica también cuenta con la documentación del código generada por TypeDoc, para generarla es necesario añadir todos los ficheros a la configuración de `typedoc.json`.

**FOTO CONFIG**

A continuación ejecutamos el comando npm `run doc` y se nos generaran todos los archivos en la carpeta de salida que hemos escrito.

En esta carpeta abrimos el `index.html` con la extensión de VSCode llamada `Live Server` para poder ver el contenido de la página.

**FOTO WEB**

## 7. Conclusión.
---


## 8. Bibliografía.
---
[Guión de la Práctica 11](https://ull-esit-inf-dsi-2122.github.io/prct11-async-sockets/).

[Documentación de la asignatura](https://ull-esit-inf-dsi-2122.github.io/nodejs-theory/).

[Módulo net de Node.js](https://nodejs.org/dist/latest-v18.x/docs/api/net.html).

[Clase EventEmitter](https://nodejs.org/dist/latest-v18.x/docs/api/events.html#events_class_eventemitter).

[Paquete Yargs](https://www.npmjs.com/package/yargs).

[Paquete Chalk](https://www.npmjs.com/package/chalk).

Jeff Pérez Frade [Perfil GitHub](https://github.com/jeffperezfrade).
