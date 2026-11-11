# Enrutamiento

## Introducción

Este proyecto lo desarrollé con Angular para practicar cómo se conectan varias pantallas mediante rutas. También trabajé el diseño con CSS, creando un estilo oscuro inspirado en interfaces de videojuegos y elementos pixelados.

En este reporte explico cómo programé el proyecto, especialmente cómo fui construyendo los estilos: desde los colores generales hasta el fondo animado, las tarjetas, las tablas y la adaptación a pantallas pequeñas.

# 1. Cómo programé el CSS

El diseño no está escrito en un solo archivo. Separé los estilos generales de los estilos de cada componente para que cada parte de la página tuviera sus propias reglas.

Los archivos principales de estilos son:

- `src/styles.css`: contiene los colores, la tipografía y las reglas que se comparten en toda la página.
- `src/app/app.css`: controla el fondo, la barra superior y el espacio donde se muestran las pantallas.
- `src/app/home/home.css`: da formato al título y a los enlaces de números.
- `src/app/details/details.css`: organiza la pantalla de detalles.
- `src/app/admin/admin.css`: da formato al menú de administración.
- `src/app/admin/user-list/user-list.css` y `product-list.css`: ajustan los títulos y textos de las listas.

Esta separación permite cambiar el diseño de una pantalla sin tener que modificar todos los estilos de la aplicación.

## Paso 1. Definir los colores y las fuentes

Comencé en `src/styles.css`, dentro de `:root`. Ahí declaré variables CSS para guardar los colores y las fuentes que se repiten en diferentes partes del sitio.

```css
:root {
  color-scheme: dark;
  --screen: #0d1117;
  --screen-raised: #161b22;
  --screen-bright: #202832;
  --line: #303943;
  --line-lit: #526170;
  --fg: #d7dee6;
  --fg-dim: #929eaa;
  --blue: #58a6ff;
  --blue-dark: #1f6feb;
  --green: #63d471;
  --green-dark: #238636;
  --gold: #f0c674;
  --pixel: "Courier New", Consolas, monospace;
  --ui: "Segoe UI", Arial, sans-serif;
}
```

Una variable CSS se crea escribiendo dos guiones antes de su nombre. Para utilizarla después se escribe `var(--nombre)`.

Por ejemplo, `var(--green)` utiliza el verde definido en `:root`. Así pude repetir los mismos colores en los títulos, bordes, enlaces y detalles sin escribir el código hexadecimal en cada regla.

También definí dos tipos de letra: `--pixel` utiliza una fuente monoespaciada para dar apariencia de videojuego, mientras que `--ui` utiliza una fuente más común para que los textos largos sean fáciles de leer. La propiedad `color-scheme: dark` indica que la página utiliza un esquema oscuro.

## Paso 2. Preparar las medidas de los elementos

Después agregué una regla general:

```css
* {
  box-sizing: border-box;
}
```

El selector `*` aplica la regla a todos los elementos. Con `box-sizing: border-box`, el ancho y alto que se asignan a un elemento incluyen su contenido, el espacio interno y los bordes. Esto facilita calcular tamaños y evita que los elementos crezcan más de lo esperado.

También configuré el elemento `html` para que tenga un ancho mínimo de 320 píxeles y use el color oscuro de fondo.

## Paso 3. Dar estilo al fondo general y al texto

En la regla `body` quité el margen que el navegador agrega por defecto y establecí que la página ocupe como mínimo toda la altura de la ventana:

```css
body {
  min-height: 100vh;
  margin: 0;
  overflow-x: hidden;
  background:
    radial-gradient(ellipse at 18% 22%, rgb(35 134 54 / 11%), transparent 34rem),
    radial-gradient(ellipse at 82% 76%, rgb(31 111 235 / 9%), transparent 30rem),
    var(--screen);
  color: var(--fg);
  font-family: var(--ui);
  font-size: 15px;
  line-height: 1.6;
}
```

La unidad `vh` representa una parte de la altura de la ventana; por eso `100vh` ocupa toda la pantalla. `overflow-x: hidden` evita que aparezca una barra de desplazamiento horizontal por algún elemento que sobresalga.

Para el fondo utilicé dos `radial-gradient()`. Son degradados circulares: uno agrega un brillo verde y otro uno azul. Al final coloqué `var(--screen)` para mantener el color oscuro como base.

También establecí el color y el tipo de letra general. `line-height: 1.6` aumenta el espacio entre líneas para que los párrafos se lean mejor.

Después ajusté los enlaces, encabezados y párrafos con selectores generales. Por ejemplo, los enlaces utilizan el azul definido en las variables y los encabezados comparten un color claro.

## Paso 4. Crear el fondo con cuadrícula y detalles pixelados

La parte visual más elaborada está en `src/app/app.css`. Primero preparé el contenedor principal con la clase `.app-shell` y utilicé los pseudoelementos `::before` y `::after`.

Un pseudoelemento permite agregar decoración desde CSS sin tener que crear otro elemento en el HTML.

### La cuadrícula del fondo

En `.app-shell::before` configuré una capa fija que ocupa toda la ventana:

```css
.app-shell::before {
  position: fixed;
  z-index: 0;
  inset: 0;
  background-image:
    linear-gradient(rgb(142 158 174 / 8%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(142 158 174 / 8%) 1px, transparent 1px),
    /* Las demás capas continúan aquí */
  content: "";
  pointer-events: none;
  animation: grid-scroll 28s linear infinite;
}
```

La propiedad `position: fixed` mantiene la decoración en la ventana mientras se navega. `inset: 0` coloca sus cuatro lados en los límites de la pantalla. `z-index` controla qué elementos quedan delante o detrás.

Para formar la cuadrícula utilicé varios fondos en la misma propiedad `background-image`. Los dos primeros son degradados lineales: uno dibuja líneas horizontales y el otro líneas verticales. Las siguientes capas agregan líneas más separadas, puntos azules, puntos verdes y una línea horizontal tenue.

En `background-size` definí el tamaño de repetición de cada capa y en `background-position` indiqué dónde comienza. Así se forma un patrón con diferentes separaciones y pequeños detalles.

`pointer-events: none` hace que esta capa decorativa no bloquee los clics sobre los enlaces que están detrás o delante de ella.

### Los pequeños bloques pixelados

En `.app-shell::after` creé otra capa. Esta vez utilicé un elemento pequeño de 5 por 5 píxeles y la propiedad `box-shadow` para dibujar copias de ese punto en distintas posiciones. Al juntar los puntos se forman figuras pequeñas de estilo pixel art.

También coloqué otra figura usando posiciones relacionadas con el tamaño de la ventana, como `vw` y `vh`. Esto permite ubicar los detalles tomando como referencia el ancho y la altura de la pantalla.

### Orden de las capas

Después ajusté el `z-index` de la barra de navegación y del contenido para que queden por encima de las decoraciones. De esta forma, la cuadrícula y los puntos se ven en el fondo, pero no cubren los botones ni el texto.

## Paso 5. Programar las animaciones del fondo

Para mover los elementos sin utilizar JavaScript usé `@keyframes`. Esta regla permite definir cómo cambia un estilo durante una animación.

En el proyecto hay tres animaciones principales:

- `grid-scroll`: cambia la posición de las capas del fondo para dar la sensación de que la cuadrícula se desplaza lentamente.
- `sprite-hop-a`: mueve los pequeños bloques unos píxeles hacia arriba y a un lado.
- `sprite-blink`: cambia la opacidad para que los bloques se vean más o menos visibles.

Por ejemplo:

```css
@keyframes sprite-hop-a {
  to {
    transform: translate(12px, -18px);
  }
}
```

La función `translate()` mueve el elemento horizontal y verticalmente. El primer valor mueve 12 píxeles a la derecha y el segundo lo mueve 18 píxeles hacia arriba.

Para ejecutar las animaciones utilicé la propiedad `animation`, indicando su duración, forma de avance y repetición. En algunas utilicé `steps()` para que el movimiento ocurra por pequeños saltos en lugar de verse completamente continuo. Esto ayuda a conservar el estilo pixelado.

## Paso 6. Diseñar la barra de navegación

En la regla `nav` utilicé Flexbox:

```css
nav {
  display: flex;
  min-height: 56px;
  align-items: center;
  gap: 1.6rem;
  background: var(--screen-raised);
}
```

`display: flex` coloca los enlaces en una misma fila. `align-items: center` los centra verticalmente y `gap` establece la separación entre ellos.

Después agregué un borde inferior y una sombra interior para separar visualmente la barra del resto de la página. También utilicé `nav::after` para dibujar una pequeña línea verde en la parte inferior.

En `nav a` definí el color, la fuente y el tamaño de los enlaces. Con los estados `:hover` y `.active` cambié su color cuando el cursor pasa sobre ellos o cuando Angular marca que esa ruta está seleccionada.

Para mostrar un pequeño indicador junto al enlace activo utilicé `nav a.active::before`. El indicador se dibuja con un bloque de 5 por 5 píxeles y se centra verticalmente mediante `transform: translateY(-50%)`.

### Botón de GitHub

El enlace del logo tiene la clase `.github-link`. Con `margin-left: auto` aproveché Flexbox para empujarlo hacia el extremo derecho de la barra. También le agregué un borde verde, un fondo transparente y una transición para cambiar su apariencia al pasar el cursor.

## Paso 7. Crear el espacio central de la página

La clase `.page-frame` controla el área donde aparecen las pantallas. Le asigné un ancho máximo para que el contenido no se extienda demasiado en monitores grandes:

```css
.page-frame {
  width: min(100% - 2rem, 980px);
  min-height: calc(100vh - 56px);
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 4rem) clamp(1.1rem, 3.5vw, 2.5rem);
}
```

La función `min()` elige el menor valor entre el ancho disponible y 980 píxeles. Con `margin: 0 auto` el contenedor queda centrado horizontalmente.

La función `calc()` permite restar los 56 píxeles de la barra superior a la altura de la ventana. La función `clamp()` establece un espacio que puede cambiar según el tamaño de pantalla, pero que siempre se mantiene entre un mínimo y un máximo.

También agregué bordes laterales tenues y un fondo oscuro con transparencia. Con `.page-frame::before` dibujé una pequeña línea decorativa verde y azul en la parte superior.

## Paso 8. Diseñar Home y sus enlaces

En `home.css` primero limité el ancho del contenido y apliqué una animación de entrada. Después trabajé el título con una fuente monoespaciada, un tamaño adaptable y una sombra azul.

Utilicé `::before` en el título para agregar el texto decorativo “GITHUB ARCADE / PROJECT 01” sin tener que escribirlo en el HTML. Con `::after` agregué una línea formada por segmentos usando `repeating-linear-gradient()`.

Para organizar los enlaces utilicé CSS Grid:

```css
.id-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}
```

Esto crea dos columnas del mismo tamaño. `minmax(0, 1fr)` permite que las columnas compartan el espacio disponible sin obligarlas a crecer más de lo necesario.

A cada elemento de la lista le di un fondo, un borde y un borde inferior más grueso para que pareciera una tarjeta. También utilicé contadores CSS con `counter-reset` y `counter-increment` para generar los números de las etiquetas “STAGE” sin agregarlos manualmente al HTML.

Los enlaces usan Flexbox para colocar el texto y el símbolo de flecha en extremos opuestos. Con `:hover` cambié el borde, el fondo y el color del texto; además utilicé `transform: translateY(-2px)` para levantar ligeramente la tarjeta cuando se pasa el cursor.

## Paso 9. Organizar la pantalla Details

En `details.css` utilicé Grid para dividir el contenido en dos columnas: una para el ID y otra para la explicación adicional.

```css
:host {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(220px, 0.85fr);
  align-items: center;
  gap: clamp(1.5rem, 5vw, 3.5rem);
}
```

El selector `:host` se refiere al elemento principal del componente Angular. Las dos columnas tienen proporciones diferentes y se mantienen separadas mediante `gap`.

Después di estilo a los bloques de información. En el resumen utilicé un borde verde a la izquierda y un pseudoelemento para mostrar una etiqueta decorativa. El ID tiene un fondo verde oscuro, un borde y una fuente pixelada para destacarlo.

La nota adicional utiliza un borde superior y una etiqueta amarilla. Así se distinguen visualmente las dos partes de la pantalla.

## Paso 10. Diseñar Admin y sus pestañas

En `admin.css` preparé el contenedor de administración, su título y la barra de opciones. Para las pestañas utilicé Flexbox con `flex-wrap: wrap`, de manera que puedan pasar a otra línea si no hay suficiente espacio.

Cada enlace tiene un borde transparente por defecto. Cuando Angular le agrega la clase `.active`, cambia el borde, el fondo y el color del texto. Esto permite identificar cuál de las dos listas está abierta.

También definí una altura mínima para el área de contenido, evitando que la sección se vea demasiado pequeña cuando cambia entre las listas.

## Paso 11. Dar formato a las tablas y sus textos

Los estilos de las tablas están en `src/styles.css`, porque se comparten entre las listas de usuarios y productos. Utilicé el selector `#customers` para establecer el ancho, el borde, el fondo y el color del texto.

A los encabezados y celdas les agregué espacio interno con `padding` y bordes para separar cada dato. Los encabezados tienen un fondo más claro y una fuente monoespaciada.

Con `:hover` cambié el fondo de las filas cuando el cursor pasa sobre ellas. Con `td:first-child` seleccioné la primera celda de cada fila para destacar su contenido en verde.

Los archivos CSS de UserList y ProductList también ajustan los títulos y párrafos. En ambos utilicé `h3:first-child::before` para agregar una etiqueta diferente a cada lista sin modificar su estructura HTML.

## Paso 12. Adaptar el diseño a pantallas pequeñas

Al final agregué reglas `@media`. Estas permiten cambiar los estilos cuando la ventana tiene cierto ancho.

En Home, cuando la pantalla mide 580 píxeles o menos, la lista pasa de dos columnas a una sola. En Details, cuando mide 650 píxeles o menos, las dos columnas se convierten en una. En la estructura principal también reduje los espacios laterales y quité los bordes laterales del contenedor.

En las tablas disminuí el espacio interno de las celdas para que su contenido pueda caber mejor en pantallas pequeñas.

También agregué esta regla:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Esta regla detecta si el dispositivo tiene activada la opción para reducir movimiento. Si está activada, reduce las animaciones y transiciones para que la página tenga menos movimiento.

# 2. Cómo programé el enrutamiento y los componentes

Aunque el diseño CSS es una parte importante del proyecto, también fue necesario programar la navegación para que cada pantalla apareciera en el lugar correcto.

## Configurar las rutas

En `src/app/app.routes.ts` importé los componentes y los relacioné con sus direcciones. La ruta `details/:id` recibe un valor variable y Admin tiene dos rutas hijas: `users` y `products`.

En `src/app/app.config.ts` registré las rutas con `provideRouter(routes)` para que Angular pudiera utilizarlas.

## Crear la estructura principal

En `app.html` coloqué los enlaces de Home y Admin y agregué `router-outlet`. Ese elemento indica dónde debe aparecer el componente correspondiente a la dirección actual.

En `app.ts` importé `RouterLink`, `RouterLinkActive` y `RouterOutlet` para utilizar la navegación desde el HTML.

También agregué un enlace al perfil de GitHub. El logo está dibujado con SVG dentro de una etiqueta `<a>`, y `target="_blank"` hace que el perfil se abra en otra pestaña.

## Generar los enlaces de Home

En `home.html` utilicé `*ngFor` para recorrer los números del 1 al 5 y generar un enlace por cada número. Con `[routerLink]="['/details', id]"` se construye la dirección que corresponde a cada uno.

## Obtener el parámetro en Details

En `details.ts` importé `ActivatedRoute` para leer el parámetro `id` de la dirección. En `ngOnInit()` obtuve el texto con `paramMap.get('id')`, lo convertí a número con `Number()` y lo guardé en la variable `id`. Después, `details.html` muestra ese valor usando `{{id}}`.

## Crear las rutas internas de Admin

En `admin.html` agregué enlaces relativos a `users` y `products`, además de otro `router-outlet`. Este segundo espacio permite mostrar cada lista dentro de Admin sin reemplazar toda la sección.

Los componentes UserList y ProductList contienen sus respectivas tablas HTML. Los datos están escritos directamente en esos archivos; todavía no hay conexión a una base de datos ni funciones para agregar, modificar o eliminar registros.

# 3. Herramientas utilizadas

- **Angular:** para crear los componentes y configurar la navegación.
- **TypeScript:** para controlar el funcionamiento de los componentes.
- **HTML:** para construir la estructura de las pantallas, enlaces y tablas.
- **CSS:** para diseñar la página, organizar sus elementos, crear fondos y animaciones y adaptar el contenido a diferentes tamaños.
- **Node.js y npm:** para instalar las dependencias y ejecutar el proyecto.

# 4. Cómo ejecutar el proyecto

Para ejecutar el proyecto en otra computadora se necesita instalar [Node.js](https://nodejs.org/).

Abre una terminal dentro de la carpeta del proyecto e instala las dependencias:

```bash
npm install
```

Después inicia el servidor:

```bash
npm start
```

La terminal mostrará la dirección local para abrir la página, normalmente `http://localhost:4200/`. Para detener el servidor, presiona `Ctrl + C`.

# Conclusión

Durante el desarrollo organicé la aplicación en componentes y configuré sus rutas para poder navegar entre ellos. En CSS comencé definiendo los colores y las fuentes generales; después construí el fondo con degradados, cuadrículas y pseudoelementos, agregué animaciones, diseñé la barra de navegación y el área central, y finalmente di formato a cada pantalla y adapté el diseño para pantallas pequeñas.

El proyecto me permitió practicar cómo combinar HTML, TypeScript y CSS: HTML define los elementos, TypeScript controla su funcionamiento y CSS establece cómo se ven y se acomodan.
