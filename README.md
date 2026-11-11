# Enrutamiento

Esta es una página web hecha como práctica de **enrutamiento con Angular**. La página permite cambiar entre distintas pantallas usando los enlaces del menú y también abrir una pantalla de detalles enviándole un número en la dirección web.

El proyecto está organizado alrededor de tres partes que se pueden probar desde el navegador: **Home**, **Details** y **Admin**. En Admin hay dos apartados: usuarios y productos.

## 1. ¿Qué aparece al abrir la página?

Al entrar al proyecto, la dirección inicial `/` envía automáticamente a `/home`. Ahí se muestra la página principal.

En la parte superior hay una barra de navegación con estos elementos:

- **Home:** regresa a la página principal.
- **Admin:** abre la sección de administración.
- **Logo de GitHub:** abre el perfil del desarrollador en otra pestaña: [github.com/JEEM244](https://github.com/JEEM244).

Debajo de la barra se muestra el contenido de la pantalla seleccionada. La página no necesita crear un sitio distinto para cada dirección: Angular cambia el componente que aparece en el espacio reservado para el contenido.

## 2. Pantallas y cómo probarlas

### Home: página principal

La pantalla Home muestra el título “Página Principal”, un mensaje de bienvenida y cinco enlaces numerados del 1 al 5.

Cada enlace lleva a la pantalla Details y le envía el número seleccionado. Por ejemplo, al elegir el número 3, la dirección cambia a:

`/details/3`

Esto permite probar una ruta que recibe un dato desde la dirección web.

### Details: pantalla de detalles

Details muestra el número que se recibió desde Home. Si se abrió `/details/3`, la pantalla presenta el ID **3**.

El archivo `details.ts` obtiene el valor de la dirección usando `ActivatedRoute`. Después lo convierte a número y lo guarda en la variable `id`. El archivo `details.html` utiliza esa variable para mostrarla en pantalla.

En la parte inferior también aparece un texto que explica que ese ID podría utilizarse para buscar un registro en una base de datos. **En este proyecto solo se muestra el número: todavía no se realiza ninguna consulta SQL ni se conecta una base de datos.**

### Admin: sección de administración

Admin tiene dos enlaces internos:

- **Administrar Usuarios:** abre la ruta `/admin/users`.
- **Administrar Productos:** abre la ruta `/admin/products`.

Al seleccionar uno de ellos, el contenido correspondiente aparece dentro de la sección Admin. La barra de opciones permanece visible para poder cambiar entre las dos listas.

**Lista de usuarios**

La pantalla muestra una tabla de ejemplo con tres columnas: ID, nombre y teléfono. Los registros están escritos directamente en el archivo HTML.

**Lista de productos**

La pantalla muestra otra tabla de ejemplo con tres columnas: producto, precio y stock. También contiene tres registros escritos directamente en el HTML.

Estas dos pantallas sirven para demostrar cómo se pueden mostrar diferentes contenidos dentro de una ruta. No son todavía un sistema CRUD: no permiten registrar, modificar ni eliminar información, y los datos no se guardan en una base de datos.

## 3. Direcciones que tiene el proyecto

Estas son las rutas configuradas en `src/app/app.routes.ts`:

| Dirección | Qué sucede |
|---|---|
| `/` | Redirige a `/home`. |
| `/home` | Abre la página principal con los cinco enlaces de ID. |
| `/details/1` a `/details/5` | Abre Details y muestra el número indicado en la dirección. |
| `/admin` | Abre la sección Admin y sus opciones. |
| `/admin/users` | Muestra la tabla de usuarios dentro de Admin. |
| `/admin/products` | Muestra la tabla de productos dentro de Admin. |

Las rutas `users` y `products` están declaradas como rutas hijas de `admin`. Por eso sus direcciones comienzan con `/admin/` y su contenido se muestra dentro del espacio de navegación de Admin.

## 4. ¿Cómo se realiza la navegación?

La navegación se configura principalmente en dos archivos:

- **`app.routes.ts`:** contiene la lista de direcciones y el componente que debe mostrarse en cada una.
- **`app.config.ts`:** registra esas rutas en Angular mediante `provideRouter(routes)`.

También se utilizan estos elementos:

- **`RouterLink`:** conecta un enlace con una ruta de Angular. Por ejemplo, los enlaces de Home lo usan para abrir Details con el ID elegido.
- **`RouterLinkActive`:** agrega la clase `active` al enlace que corresponde a la ruta actual. Se usa en la navegación superior y en las opciones de Admin.
- **`RouterOutlet`:** indica el espacio donde Angular debe mostrar el componente de la ruta. Hay uno en la estructura principal y otro dentro de Admin para mostrar las listas.
- **`ActivatedRoute`:** permite leer el parámetro `id` de la dirección en la pantalla Details.

Un ejemplo del recorrido es: entrar a Home, seleccionar el enlace del ID 3 y llegar a `/details/3`. Angular reconoce esa dirección, carga el componente Details y este lee el número 3 para mostrarlo.

## 5. Organización de los archivos

Los archivos de cada pantalla están separados para que sea más fácil encontrar qué parte controla su contenido y su funcionamiento.

| Archivo o carpeta | Qué contiene |
|---|---|
| `src/app/app.html` | La barra superior, los enlaces Home y Admin, el logo de GitHub y el espacio principal donde se muestran las pantallas. |
| `src/app/app.ts` | El componente principal y los elementos de navegación que utiliza. |
| `src/app/app.css` | El diseño de la estructura principal, la barra superior, el fondo animado y el botón de GitHub. |
| `src/app/app.routes.ts` | Todas las rutas del proyecto y las rutas hijas de Admin. |
| `src/app/app.config.ts` | La configuración que activa el enrutamiento. |
| `src/app/home/` | Los archivos de Home. Su HTML contiene los cinco enlaces y su TypeScript permite utilizar RouterLink. |
| `src/app/details/` | Los archivos de Details. Su TypeScript lee el ID de la dirección y su HTML lo muestra. |
| `src/app/admin/` | Los archivos de la sección Admin y sus enlaces internos. |
| `src/app/admin/user-list/` | Los archivos de la tabla de usuarios. |
| `src/app/admin/product-list/` | Los archivos de la tabla de productos. |
| `src/styles.css` | Los estilos generales, colores, tipografía y apariencia de las tablas. |

En cada pantalla, el archivo HTML contiene los elementos que aparecen en el navegador. El archivo TypeScript controla la parte de funcionamiento y el CSS define la apariencia de esa pantalla.

## 6. Diseño de la página

El diseño utiliza un fondo oscuro y detalles en verde y azul. La barra de navegación tiene los enlaces principales y el logo de GitHub queda separado a la derecha.

El fondo incluye una cuadrícula y pequeños elementos de estilo pixel que tienen movimiento. Las tablas de usuarios y productos utilizan bordes, encabezados destacados y un cambio de fondo cuando se pasa el cursor sobre una fila.

Los colores principales están definidos como variables en `src/styles.css`. Esto permite reutilizarlos en diferentes partes de la página sin escribir el mismo valor en cada archivo.

## 7. Herramientas utilizadas

- **Angular:** se utilizó para crear las pantallas y controlar la navegación entre ellas.
- **TypeScript:** contiene la lógica de los componentes, como la lectura del ID en Details.
- **HTML:** define los títulos, enlaces, textos y tablas que aparecen en cada pantalla.
- **CSS:** controla los colores, tamaños, espacios, bordes y animaciones.
- **Node.js y npm:** permiten instalar las dependencias y ejecutar el proyecto.

## 8. Cómo ejecutar el proyecto

Para abrirlo en otra computadora se necesita instalar [Node.js](https://nodejs.org/).

1. Descarga o clona el repositorio.
2. Abre una terminal dentro de la carpeta del proyecto.
3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

5. Abre en el navegador la dirección que indique la terminal. Normalmente es `http://localhost:4200/`.

Para detener el servidor, regresa a la terminal y presiona `Ctrl + C`.

## 9. Resultado del proyecto

La página permite comprobar cómo se configuran y utilizan diferentes rutas en Angular. Desde Home se puede abrir una pantalla de detalles enviando un ID, y desde Admin se puede cambiar entre dos listas que se muestran dentro de la misma sección.

El objetivo principal es practicar la navegación entre componentes y el uso de parámetros en las direcciones. Las tablas son ejemplos visuales; la conexión a una base de datos y las operaciones para administrar usuarios o productos todavía no forman parte de este proyecto.
