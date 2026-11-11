# Enrutamiento

## Introducción

Este proyecto lo desarrollé con Angular para practicar cómo se conectan varias pantallas mediante rutas. La parte principal del trabajo fue programar los componentes, configurar las direcciones de navegación y hacer que una pantalla pudiera recibir un dato desde la URL.

En este documento explico cómo está escrito el código y cómo se relacionan sus archivos. No se trata solamente de describir lo que aparece en la página, sino de explicar cómo se programó.

## 1. Preparación del proyecto

Primero creé el proyecto utilizando Angular. Angular organiza la página en **componentes**. Un componente es una parte independiente de la aplicación; por ejemplo, Home, Details y Admin son componentes diferentes.

En este proyecto cada componente tiene archivos separados:

- Un archivo `.ts` para escribir su funcionamiento.
- Un archivo `.html` para definir lo que se muestra.
- Un archivo `.css` para darle diseño.

Los componentes utilizados son independientes (*standalone*). Esto significa que cada uno declara directamente las herramientas de Angular que necesita, en lugar de depender de un módulo general.

Por ejemplo, en `src/app/home/home.ts` se importan `CommonModule` y `RouterLink`, porque Home utiliza `*ngFor` y enlaces de navegación.

## 2. Configuración de las rutas

Después de crear los componentes, configuré las direcciones que permiten pasar de una pantalla a otra. Esto se hace en:

`src/app/app.routes.ts`

El archivo importa los componentes que se van a mostrar y los relaciona con sus direcciones. La configuración principal quedó así:

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'details/:id', component: Details },
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: 'users', component: UserList },
      { path: 'products', component: ProductList },
    ],
  },
];
```

Cada parte tiene una función:

- `path` indica la dirección que Angular debe reconocer.
- `component` indica qué componente debe mostrar.
- `redirectTo` permite enviar una dirección a otra. Por eso, cuando se entra a la dirección inicial, se redirige a Home.
- `children` permite colocar rutas dentro de otra ruta. En este caso, Users y Products son apartados de Admin.
- `:id` indica que esa parte de la dirección es un dato variable. No siempre será el mismo número.

Por ejemplo, la ruta `details/:id` puede recibir `/details/1`, `/details/2` o cualquier otro valor en esa posición. Así no es necesario crear una ruta diferente para cada número.

### Activar las rutas en Angular

Después de escribir las rutas, tuve que indicarle a Angular que las utilizara. Esto se hace en `src/app/app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

La función `provideRouter` registra la lista de rutas que escribí en `app.routes.ts`. Si no se configura, Angular no tendría registrada esa navegación.

## 3. Crear la estructura principal

En `src/app/app.html` programé la estructura que permanece visible al cambiar de pantalla. Ahí coloqué la barra superior con los enlaces Home y Admin, el botón de GitHub y un espacio para mostrar el componente de la ruta actual.

La parte importante para mostrar las pantallas es:

```html
<div class="container2 page-frame">
  <router-outlet></router-outlet>
</div>
```

`router-outlet` funciona como un espacio reservado. Angular coloca ahí el componente que corresponde a la dirección que se está visitando. Por ejemplo, si la dirección es `/home`, muestra Home; si es `/details/3`, muestra Details.

En el archivo `app.ts` importé las herramientas necesarias para que la plantilla pueda utilizarlas:

```typescript
imports: [RouterLink, RouterLinkActive, RouterOutlet],
```

- `RouterLink` permite que los enlaces naveguen entre rutas de Angular.
- `RouterLinkActive` agrega una clase CSS al enlace que corresponde a la ruta activa.
- `RouterOutlet` permite mostrar el componente de la ruta.

### Enlace al perfil de GitHub

En esa misma barra agregué un enlace normal de HTML que contiene un dibujo SVG del logo de GitHub:

```html
<a
  href="https://github.com/JEEM244"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visitar mi perfil de GitHub"
>
  <!-- Aquí se encuentra el SVG del logo -->
</a>
```

El atributo `href` contiene la dirección del perfil y `target="_blank"` hace que se abra en otra pestaña. El logo está escrito como SVG dentro del enlace, por eso se muestra el símbolo sin necesitar una imagen externa.

## 4. Programar la página Home

En `src/app/home/home.html` escribí el título, el mensaje de bienvenida y los enlaces para probar las rutas de detalles.

Para no escribir cinco enlaces casi iguales, utilicé `*ngFor`:

```html
<li *ngFor="let id of [1, 2, 3, 4, 5]">
  <a [routerLink]="['/details', id]">
    Ir a detalles del ID: #{{id}}
  </a>
</li>
```

Esta instrucción recorre los números del 1 al 5 y crea un elemento de lista por cada uno.

La expresión `[routerLink]="['/details', id]"` construye la dirección usando el número que se está recorriendo. Por ejemplo, cuando `id` vale 3, el enlace lleva a `/details/3`.

Las llaves dobles `{{id}}` sirven para mostrar el valor de la variable dentro del texto HTML.

En `home.ts` importé `CommonModule` para poder utilizar `*ngFor`, y `RouterLink` para que funcionen los enlaces:

```typescript
imports: [CommonModule, RouterLink],
```

## 5. Recibir el ID en Details

La pantalla Details es importante porque demuestra cómo pasar información mediante una dirección. Su funcionamiento está programado en `src/app/details/details.ts`.

Primero importé `ActivatedRoute`, que permite consultar los datos de la ruta actual. Después declaré una variable para guardar el ID:

```typescript
id: number | null = null;
```

La variable puede contener un número o estar vacía inicialmente. También utilicé el método `ngOnInit`, que Angular ejecuta cuando el componente se inicializa:

```typescript
ngOnInit(): void {
  this.id = Number(this.route.snapshot.paramMap.get('id'));
}
```

Esta instrucción realiza varios pasos:

1. `this.route` representa la ruta actual.
2. `snapshot.paramMap.get('id')` obtiene el valor que llegó en la parte `:id` de la dirección.
3. `Number(...)` convierte el valor obtenido, que llega como texto, a un número.
4. `this.id =` guarda ese número en la variable del componente.

Después, en `details.html`, utilicé la variable con interpolación:

```html
<strong>#{{id}}</strong>
```

Así, si se abre `/details/4`, Angular obtiene el número 4 y la plantilla lo muestra. En esta práctica el ID solamente se presenta en pantalla; todavía no se utiliza para consultar una base de datos.

## 6. Crear Admin y sus rutas internas

Para la sección de administración creé el componente Admin. Su plantilla, `admin.html`, contiene dos enlaces:

```html
<a routerLink="users" routerLinkActive="active">
  Administrar Usuarios
</a>

<a routerLink="products" routerLinkActive="active">
  Administrar Productos
</a>

<router-outlet></router-outlet>
```

Los enlaces utilizan rutas relativas porque ya estamos dentro de Admin. Al seleccionar Users se abre `/admin/users`; al seleccionar Products se abre `/admin/products`.

También agregué un segundo `router-outlet`. Este está dentro de Admin, por lo que Angular coloca ahí la lista seleccionada. El primer `router-outlet` muestra Admin y el que está dentro de Admin muestra UserList o ProductList. De esta manera, la sección principal permanece y solamente cambia su contenido interno.

En `admin.ts` importé `RouterLink`, `RouterLinkActive` y `RouterOutlet` para poder utilizar esos elementos en su HTML.

## 7. Programar las tablas de ejemplo

Creé dos componentes separados para que cada lista tuviera su propio archivo:

- `src/app/admin/user-list/`
- `src/app/admin/product-list/`

En el HTML de UserList escribí una tabla con las columnas ID, nombre y teléfono. En ProductList escribí otra con producto, precio y stock.

Para construirlas utilicé las etiquetas HTML de tabla:

- `<table>` crea la tabla.
- `<tr>` crea una fila.
- `<th>` crea una celda de encabezado.
- `<td>` coloca un dato dentro de una fila.

Los datos están escritos directamente en el HTML para mostrar cómo se verían las listas. No utilicé arreglos, servicios ni una base de datos para llenarlas. Tampoco agregué botones o funciones para registrar, editar o borrar información.

## 8. Programar los estilos

Para el diseño utilicé CSS. Separé los estilos generales en `src/styles.css` y los estilos de la estructura principal en `src/app/app.css`. Las pantallas también tienen sus propios archivos CSS.

En `styles.css` definí variables para guardar los colores principales:

```css
:root {
  --screen: #0d1117;
  --screen-raised: #161b22;
  --fg: #d7dee6;
  --blue: #58a6ff;
  --green: #63d471;
}
```

Una variable CSS comienza con dos guiones y se puede reutilizar con `var()`. Por ejemplo, `var(--green)` utiliza el verde que definí al inicio. Esto ayuda a mantener los mismos colores en diferentes elementos.

En `app.css` trabajé el fondo de la aplicación. Utilicé los selectores `::before` y `::after` para agregar capas decorativas sin tener que escribir elementos HTML adicionales. Congradientes y tamaños de fondo formé una cuadrícula; después utilicé `@keyframes` para darle movimiento.

También agregué reglas `@media` para cambiar algunos espacios cuando la pantalla es más pequeña, y una regla `prefers-reduced-motion` para reducir las animaciones si el dispositivo tiene activada esa preferencia.

## 9. Archivos principales y su relación

| Archivo | Trabajo que realiza |
|---|---|
| `src/app/app.routes.ts` | Relaciona las direcciones con los componentes. |
| `src/app/app.config.ts` | Registra las rutas en Angular. |
| `src/app/app.ts` | Configura el componente principal y sus herramientas de navegación. |
| `src/app/app.html` | Contiene la barra superior y el espacio principal de las pantallas. |
| `src/app/app.css` | Da estilo a la estructura principal y al fondo. |
| `src/app/home/home.ts` | Importa las herramientas que utiliza Home. |
| `src/app/home/home.html` | Genera los enlaces de los IDs. |
| `src/app/details/details.ts` | Lee y convierte el ID recibido en la dirección. |
| `src/app/details/details.html` | Muestra el ID obtenido. |
| `src/app/admin/admin.ts` | Prepara la navegación interna de Admin. |
| `src/app/admin/admin.html` | Muestra los enlaces de usuarios y productos y su espacio de contenido. |
| `src/app/admin/user-list/user-list.html` | Contiene la tabla de usuarios. |
| `src/app/admin/product-list/product-list.html` | Contiene la tabla de productos. |
| `src/styles.css` | Define los estilos generales y las tablas. |

## 10. Cómo ejecutar el proyecto

Para ejecutar el proyecto en otra computadora se necesita tener instalado [Node.js](https://nodejs.org/).

Primero se abre una terminal dentro de la carpeta del proyecto y se instalan las dependencias:

```bash
npm install
```

Después se inicia el servidor de desarrollo:

```bash
npm start
```

Angular muestra en la terminal la dirección local para abrir la página, normalmente `http://localhost:4200/`. Para detener el servidor se utiliza `Ctrl + C`.

## Conclusión

Durante el desarrollo programé varios componentes y configuré sus rutas para que trabajaran como una sola aplicación. Practiqué cómo registrar las rutas, mostrar componentes con `router-outlet`, crear enlaces con `routerLink`, recibir parámetros de una dirección con `ActivatedRoute` y mostrar esos valores en HTML.

También separé la estructura, el funcionamiento y los estilos en archivos distintos. Las listas de usuarios y productos son tablas de ejemplo, por lo que el proyecto se enfoca en practicar el enrutamiento y no en administrar datos reales.
