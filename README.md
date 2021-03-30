# Introducción

Este proyecto es una demo del juego buscaminas

## Antes de jugar:

Antes de poder correr el proyecto se necesita:

- Tener una version de node instalada

- Instalar el proyecto en un directorio local - instalar las dependencias utilizadas con `npm install`

### `npm start`

Corre el proyecto en modo development y permite jugar.\
Abrir [http://localhost:3000](http://localhost:3000) para visualizarlo en el buscador.

### `npm test`

Ejecuta los tests relizados

## A tener en cuenta

Si no hay una partida guardada el memoria local, por defecto se crea un tablero de 10x10 con 20 minas. En los ajustes se pueden modificar estos parametros y apretando el botón de `Juego Nuevo` se creará un nuevo tablero con las características introducidas.

Se puede volver a empezar la partida con un tablero de las mismas características apretando el botón `reset`.

El guardado de la partida se realiza en la memoria local del buscado utilizado.\
Una vez que una partida previamente guardada fue cargada, ésta se eliminará de memoria por lo que si se quiere guardar se lo deberá hacer nuevamente.
