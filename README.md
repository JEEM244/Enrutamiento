# Proyecto de Enrutamiento

## ¿De qué trata este proyecto?

Este proyecto es una página web creada con **Angular**. Su objetivo principal es mostrar cómo se puede navegar entre diferentes secciones de una página sin tener que recargar todo el sitio cada vez que se cambia de pantalla.

A esta forma de organizar la navegación se le conoce como **enrutamiento**. Por ejemplo, desde la página principal podemos entrar a la sección de administración o abrir una pantalla que muestra un número de identificación.

El proyecto también incluye ejemplos de listas de usuarios y productos, además de un enlace con el logo de GitHub que lleva al perfil del desarrollador.

## Herramientas utilizadas

- **Angular:** herramienta que usamos para construir la página y organizarla en secciones.
- **TypeScript:** lenguaje en el que se escribe la parte que controla el funcionamiento de cada sección.
- **HTML:** se utiliza para colocar los títulos, textos, enlaces, tablas y demás elementos que aparecen en pantalla.
- **CSS:** sirve para dar color, tamaño, espacios y apariencia a la página.
- **Node.js y npm:** permiten instalar y utilizar las herramientas necesarias para ejecutar el proyecto.

## ¿Cómo se organizó la página?

La página está dividida en varias partes. Cada parte tiene una tarea específica:

### 1. Página principal (Home)

Es la primera pantalla que aparece al entrar al sitio. Tiene un título de bienvenida y una lista con cinco enlaces.

Cada enlace tiene un número diferente. Al seleccionar uno, se abre la pantalla de detalles y se envía ese número en la dirección de la página.

### 2. Página de detalles

Esta pantalla recibe el número que se seleccionó desde Home.

Por ejemplo, si se selecciona el enlace del número 3, la dirección queda así:

`/details/3`

El archivo `details.ts` obtiene ese número de la dirección y lo guarda para mostrarlo en pantalla. De esta manera, una misma pantalla puede mostrar diferentes números sin tener que crear una página nueva para cada uno.

### 3. Sección de administración (Admin)

Esta sección tiene dos apartados:

- **Administrar Usuarios:** muestra una tabla de ejemplo con el ID, nombre y teléfono de varios usuarios.
- **Administrar Productos:** muestra una tabla de ejemplo con el nombre, precio y existencia de algunos productos.

Estas tablas sirven para demostrar cómo se pueden organizar los datos. Por el momento, la información está escrita directamente en los archivos HTML. No está conectada a una base de datos y tampoco permite agregar, editar o eliminar registros.

### 4. Enlace al perfil de GitHub

En la barra superior se agregó un botón que muestra únicamente el logo de GitHub. Al seleccionarlo, abre el perfil del desarrollador en otra pestaña.

## ¿Qué es el enrutamiento y cómo funciona aquí?

El enrutamiento es la parte que decide qué pantalla debe mostrarse dependiendo de la dirección que se visite.

En este proyecto, las rutas se encuentran en el archivo `src/app/app.routes.ts`.

Las rutas principales son:

| Dirección | ¿Qué muestra? |
|---|---|
| `/` | Redirige automáticamente a Home. |
| `/home` | Muestra la página principal. |
| `/details/3` | Muestra los detalles y recibe el número 3 como ejemplo. |
| `/admin` | Abre la sección de administración. |
| `/admin/users` | Muestra la lista de usuarios. |
| `/admin/products` | Muestra la lista de productos. |

Las rutas de usuarios y productos están dentro de Admin. Esto significa que primero se entra a la sección de administración y después se elige cuál de sus apartados se quiere abrir.

Angular utiliza algunos elementos para hacer posible esta navegación:

- **RouterLink:** se coloca en los enlaces para indicar a qué dirección deben llevar.
- **RouterOutlet:** marca el espacio donde Angular muestra la pantalla que corresponde a la dirección actual.
- **RouterLinkActive:** permite identificar cuándo un enlace corresponde a la sección que está abierta.
- **ActivatedRoute:** permite leer información de la dirección actual, como el número que se envía a la pantalla de detalles.

## ¿Cómo se construyó?

El desarrollo se realizó por partes:

1. **Se creó el proyecto:** se utilizó Angular para preparar la estructura inicial de la página.
2. **Se organizaron las pantallas:** se separaron Home, Admin, Details, UserList y ProductList. Cada una tiene sus propios archivos.
3. **Se configuraron las rutas:** se indicó qué pantalla debe abrirse para cada dirección.
4. **Se agregaron los enlaces:** desde Home se puede entrar a los detalles de un número y desde Admin se puede cambiar entre usuarios y productos.
5. **Se prepararon las tablas:** se colocaron datos de ejemplo para representar las listas de usuarios y productos.
6. **Se trabajó el diseño:** con CSS se definieron los colores, fondos, tamaños, bordes y espacios. Se utilizó un estilo oscuro con detalles verdes y azules.
7. **Se agregó el acceso a GitHub:** se colocó el logo en la barra superior y se configuró para abrir el perfil en otra pestaña.

## Archivos principales del proyecto

| Archivo o carpeta | Para qué sirve |
|---|---|
| `src/app/app.html` | Contiene la estructura general y la barra de navegación. |
| `src/app/app.ts` | Define el componente principal de la aplicación. |
| `src/app/app.css` | Contiene los estilos de la estructura principal. |
| `src/app/app.routes.ts` | Guarda las direcciones y las pantallas que se abren en cada una. |
| `src/app/app.config.ts` | Configura Angular para que pueda utilizar las rutas. |
| `src/app/home/` | Contiene los archivos de la página principal. |
| `src/app/details/` | Contiene los archivos de la pantalla de detalles. |
| `src/app/admin/` | Contiene la sección de administración y sus apartados. |
| `src/styles.css` | Guarda los estilos generales que se aplican en toda la página. |

En las carpetas de las pantallas se encuentran archivos con distintas funciones. Los archivos HTML contienen lo que se muestra; los archivos TypeScript controlan su funcionamiento y los archivos CSS definen su apariencia.

## ¿Cómo ejecutar el proyecto?

Para abrir el proyecto en una computadora se necesita tener instalado **Node.js**. Después, sigue estos pasos:

1. Abre una terminal dentro de la carpeta del proyecto.
2. Instala las dependencias con este comando:

```bash
npm install
```

3. Cuando termine la instalación, inicia el servidor de desarrollo:

```bash
ng serve -o
```

4. Angular abrirá el proyecto en el navegador. Si no se abre automáticamente, entra a:

`http://localhost:4200/`

Mientras el servidor esté funcionando, los cambios que se guarden en los archivos se reflejarán en el navegador.

Para detener el servidor, vuelve a la terminal y presiona `Ctrl + C`.

## Conclusión

Con este proyecto se puso en práctica el uso de rutas para separar una página web en diferentes pantallas y permitir que el usuario pueda moverse entre ellas. También se trabajó con componentes, enlaces, tablas y estilos para organizar mejor el sitio.

El proyecto funciona como una demostración de enrutamiento en Angular. Las listas de usuarios y productos todavía utilizan datos de ejemplo, pero la estructura permite tomar como base este trabajo para después conectarlo a una base de datos y agregar funciones para administrar la información.
