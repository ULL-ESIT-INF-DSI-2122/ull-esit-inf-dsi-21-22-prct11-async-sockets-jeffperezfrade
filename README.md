# Práctica 11 - Cliente y servidor para una aplicación de procesamiento de notas de texto
---
En esta práctica se implementa una aplicación de procesamiento de notas de texto donde se utiliza un **servidor**, un **socket** y un **cliente**. Todo esto es posible gracias al módulo `net` de **Node.js**. Se usará la aplicación de Notas de Texto de la **Práctica 9** para implementar esta aplicación, así ahorramos tiempo en volver a diseñar todo lo relacionado a las Notas y nos enfocamos en el cliente-servidor. El usuario deberá poder interactuar con la aplicación mediante la linea de comandos.

## Ejecución de la aplicación:
---
Debemos tener dos terminales abiertas en la misma ruta:
* En una ejecutamos `node dist/Server/Server.js` y la dejamos abierta.
* En la segunda ejecutamos `node dist/Client/Client.js` ademas de los comandos que queremos ejecutar.
  * **Por ejemplo:** `add --user="Jeff" --title="My First Note" --body="Hello my name is Jeff" --color="blue"`. Aunque también podemos ejecutar comandos como `modify`, `delete`, `list` y `print`.

Para ver la **GitHub Page** haga click [aquí](https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct11-async-sockets-jeffperezfrade/).