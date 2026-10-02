# Resumen General del Proyecto: Altura Club (Sport Complex)

Este documento ofrece una visión completa y detallada de la arquitectura, vistas, funcionalidades, roles, librerías y diseño del sistema para **Altura Club (Sport Complex)**.

---

## 1. Descripción del Proyecto

**Altura Club** es una plataforma web integral diseñada para la administración y reserva de instalaciones deportivas y de bienestar en Medellín (Sedes: *Poblado* y *Laureles*). El sistema cubre de punta a punta el ciclo de vida del complejo deportivo:
- **Para los clientes:** Explorar categorías deportivas (canchas de tenis, pádel, fútbol, piscinas, gimnasio, zona húmeda), elegir fechas y franjas horarias disponibles, reservar, recibir un tiquete digital con código QR y gestionar sus reservas.
- **Para el personal (Staff):** Operar el punto de venta (POS) en recepción y validar el acceso de los clientes en las puertas mediante un escáner/verificador de códigos QR.
- **Para los administradores:** Monitorear métricas del negocio en tiempo real (ingresos, ocupación, reservas), gestionar el catálogo de espacios/servicios, controlar reservas, administrar membresías, configurar datos de la sede y gestionar el equipo de empleados con control de acceso por roles (RBAC).

---

## 2. Arquitectura del Proyecto (Monorepo Turborepo)

El proyecto está organizado como un **monorepo moderno** gestionado mediante **Turborepo** y **npm workspaces**, permitiendo separar claramente la lógica de negocio, los componentes visuales y la aplicación web:

```
sportsActualizado/
├── apps/
│   └── web/                   # Aplicación web Next.js 16 (App Router)
│       ├── src/
│       │   ├── app/           # Rutas organizadas por grupos de acceso
│       │   │   ├── (public)/  # Landing page pública
│       │   │   ├── (auth)/    # Login y Registro
│       │   │   ├── (customer)/# Experiencia de cliente (reservas, checkout, tiquetes, cuenta)
│       │   │   ├── (staff)/   # Herramientas de empleados (POS, Escáner)
│       │   │   └── (admin)/   # Panel administrativo completo
│       │   ├── components/    # Componentes de presentación y modales
│       │   └── lib/           # Stores reactivos y persistencia en localStorage
│       └── public/            # Assets estáticos (iconos, logos)
├── packages/
│   ├── core/                  # Dominio puro y datos compartidos (@sportcomplex/core)
│   │   └── src/
│   │       ├── domain/        # Definición de roles, navegación y control de rutas
│   │       ├── data/          # Catálogo inicial, sedes, reservas y cuentas de prueba
│   │       └── services/      # Utilidades de precios, fechas, formateo de moneda (COP)
│   └── ui/                    # Sistema de diseño y componentes base (@sportcomplex/ui)
│       └── src/
│           ├── components/    # Botones y elementos atómicos (Base UI + CVA)
│           └── lib/           # Utilidades de Tailwind (cn, clsx, twMerge)
├── turbo.json                 # Configuración de tareas de Turborepo (build, dev, typecheck)
└── components.json            # Configuración de Shadcn UI
```

---

## 3. Roles de Usuario y Flujo de Navegación

El sistema cuenta con un sistema de rutas protegidas mediante el helper `rolesAllowedFor()` y el componente `AppChrome`:

| Rol | Página de Inicio (`roleHome`) | Acceso Permitido |
| :--- | :--- | :--- |
| **Público (Anónimo)** | `/` | `/`, `/services`, `/services/[category]`, `/login`, `/register` |
| **`customer` (Cliente)** | `/dashboard` | Catálogo completo, reserva horaria, `/checkout`, `/confirmation`, `/tickets`, `/dashboard` |
| **`staff` (Empleado)** | `/pos` | Punto de venta (`/pos`), Escáner de accesos (`/scanner`), Consulta de tiquetes (`/tickets`) |
| **`admin` (Administrador)** | `/admin` | Acceso irrestricto: Panel analítico, Catálogo CRUD, Reservas CRUD, Empleados, Membresías, Configuración, más herramientas de staff |

> **Nota:** Para agilizar el desarrollo, en la pantalla de inicio de sesión (`/login`) se incluyen accesos rápidos con cuentas de prueba precargadas para cada rol:
> - Administrador: `admin@sportcomplex.com`
> - Empleado (Staff): `empleado@sportcomplex.com`
> - Cliente: `client@sportcomplex.com`

---

## 4. Mapa Detallado de Vistas (Páginas)

### 4.1. Zona Pública
- **`Landing Page` (`/`)**:
  - Encabezado Hero con propuesta de valor, llamado a la acción (CTA) y prueba social (+2.400 personas, valoración 4.9/5).
  - Horario de atención en tiempo real y sede Medellín.
  - Cuadrícula de categorías principales con precios base calculados dinámicamente ("Desde $X COP").
  - Explicación del flujo en 3 pasos: *Elige*, *Reserva*, *Paga*.
  - Footer institucional con enlaces y marca Altura Club.

### 4.2. Autenticación
- **`Iniciar Sesión` (`/login`)**: Formulario con correo y contraseña, soporte visual para Google Login (mock), conmutador a registro y selector de credenciales de desarrollo por rol.
- **`Crear Cuenta` (`/register`)**: Formulario de captura de nombre completo, correo y contraseña.

### 4.3. Experiencia del Cliente
- **`Catálogo de Servicios` (`/services`)**: Vista general de las cuatro categorías disponibles (Canchas, Piscinas, Gimnasio, Zona Húmeda) con sus respectivas unidades de cobro (/hora, /entrada, /sesión, /acceso).
- **`Listado por Categoría` (`/services/[category]`)**: Lista detallada de los espacios físicos disponibles en la categoría seleccionada (ej. Cancha de tenis 1 en Poblado, Cancha de pádel en Laureles). Indica capacidad máxima, sede, precio y estado (Disponible / Mantenimiento).
- **`Detalle y Reserva` (`/services/[category]/[id]`)**:
  - Selector interactivo de fecha (los próximos 7 días a partir de la fecha actual).
  - Cuadrícula de horarios (franjas desde 7:00 a. m. hasta 9:00 p. m.) que bloquea automáticamente los horarios ya reservados.
  - Selector de cantidad de asistentes según el aforo máximo del espacio.
  - Desglose del total en pesos colombianos (COP).
  - Modal de confirmación previa antes de avanzar al checkout.
- **`Checkout / Pago` (`/checkout`)**:
  - Resumen paso a paso (Espacio ➔ Pago ➔ Confirmación).
  - Validación anti-colisiones (evita reservas simultáneas del mismo horario).
  - Método de cobro en complejo (preparado para pasarelas de pago digitales).
- **`Confirmación de Reserva` (`/confirmation`)**:
  - Pase digital con código único de reserva (ej. `ALT-0210-4412`).
  - Renderizado de un Código QR dinámico generado en CSS/SVG para ser presentado en la entrada física del complejo.
- **`Mi Cuenta / Dashboard de Cliente` (`/dashboard`)**:
  - Saludo personalizado y fecha de hoy.
  - Tarjeta de la "Próxima Reserva" con acceso directo a ver el tiquete.
  - Atajos rápidos para agendar nuevos espacios y estado de disponibilidad en tiempo real.
- **`Mis Tiquetes` (`/tickets`)**: Historial de reservas y estado de cada tiquete (Confirmada, Pendiente, Usada, Cancelada).

### 4.4. Panel de Empleados (Staff)
- **`Punto de Venta / Caja` (`/pos`)**:
  - Registro de ventas directas en mostrador.
  - Selector de servicio disponible y cliente (habitual u ocasional).
  - Opción de aplicar automáticamente el **descuento de miembro (10%)**.
  - Cálculo de subtotal, descuento y total en COP, emitiendo un comprobante `POS-XXXXXX`.
- **`Escáner y Control de Acceso` (`/scanner`)**:
  - Interfaz oscura estilo terminal de control de accesos con visor de cámara simulada y visor de cuadrícula QR.
  - Validación en vivo del código de reserva ingresado contra la base de datos de reservas.
  - Validación cruzada: comprueba si el tiquete corresponde a la categoría/puerta seleccionada (ej. si tiene pase de gimnasio pero intenta entrar a zona húmeda).
  - Al validar exitosamente, permite al empleado pulsar **"Registrar acceso"**, actualizando el estado de la reserva a `Usada`.

### 4.5. Panel de Administración (`/admin`)
- **`Resumen / Dashboard General` (`/admin`)**:
  - 4 KPIs principales: Reservas de hoy (+12.8%), Ingresos del día, Ocupación actual (%), Miembros activos (+3.1%), con micro-gráficos sparklines.
  - Gráfico de barras de reservas por franja horaria a lo largo del día.
  - Gráfico de dona con tasa de ocupación comparativa entre la Sede Poblado (82%) y Laureles (68%).
  - Tabla de últimas reservas realizadas con estados en vivo.
- **`Gestión del Catálogo` (`/admin/catalog`)**:
  - Tabla con listado de todos los servicios.
  - Funcionalidad para **Agregar un nuevo espacio** o **Editar** uno existente mediante un modal (nombre, categoría, descripción, precio, aforo, sede, estado).
  - Acción rápida para **Pausar / Activar** disponibilidad (Disponible / Mantenimiento) o eliminar.
- **`Gestión de Reservas` (`/admin/bookings`)**:
  - Lista de todas las reservas globales del complejo.
  - Cambio directo de estado desde un desplegable (`Confirmada`, `Pendiente`, `Cancelada`, `Usada`).
  - Modal para agendar una reserva manual a nombre de cualquier cliente.
- **`Gestión de Empleados y Roles` (`/admin/employees`)**:
  - Administración del personal del complejo.
  - Asignación y cambio de roles (`admin`, `staff`, `customer`).
  - Modal para registrar nuevos colaboradores.
- **`Membresías` (`/admin/memberships`)**:
  - Control de planes (`Esencial`, `Plus`, `Familiar`) con periodicidades (Mensual, Trimestral, Anual).
  - Detección automática de planes vigentes vs. vencidos según la fecha de hoy.
  - Creación y edición de planes.
- **`Configuración del Complejo` (`/admin/settings`)**:
  - Edición del nombre comercial (*Altura Club*).
  - Configuración del horario general de atención.
  - Interruptor para habilitar o suspender reservas en línea.

---

## 5. Funcionalidades Destacadas del Sistema

1. **Gestión de Estado Reactiva y Persistente (`usePersistentState`)**:
   - Todo el estado (catálogo, reservas, empleados, membresías, sesión, tema oscuro) se guarda en `localStorage` de forma reactiva.
   - Utiliza `useSyncExternalStore` con soporte para eventos multi-pestaña (`storage` event), lo que permite que si un empleado valida un tiquete en una pestaña, el cliente lo vea reflejado de inmediato en la suya sin recargar la página.
2. **Control de Horarios y Prevención de Solapamiento**:
   - Las franjas horarias ocupadas se inhabilitan en la interfaz de usuario.
   - Se valida nuevamente en el checkout para prevenir colisiones por concurrencia.
3. **Pase de Abordaje / Tiquete con QR**:
   - Generación de código estructurado `ALT-DDMM-XXXX`.
   - Componente visual que dibuja un código QR interactivo para escanear en taquilla.
4. **Soporte de Tema Oscuro / Claro**:
   - Selector en la barra de navegación que aplica o remueve la clase `.dark` sobre el contenedor raíz persistiendo la preferencia del usuario.
5. **Manejo Centralizado de Notificaciones (Toasts)**:
   - Proveedor `AppProvider` que emite mensajes de retroalimentación automáticos (éxito, error, advertencias) que expiran tras 3.6 segundos.

---

## 6. Stack Tecnológico y Librerías

### Dependencias Principales (`apps/web` y `packages/`):
- **Next.js 16 (v16.3.3)**: Framework React con App Router, renderizado de componentes de servidor/cliente y rutas agrupadas (`(group)`).
- **React 19 & React DOM 19**: Versión más reciente de React con hooks modernos (`useSyncExternalStore`, `useActionState`, etc.).
- **Tailwind CSS v4 (v4.3.3)** y `@tailwindcss/postcss`: Estilos utilitarios rápidos y modernos basados en variables CSS nativas.
- **Lucide React (v1.16.0)**: Set completo de iconografía SVG consistente y liviana para todos los módulos.
- **@base-ui/react (v1.5.0)**: Primitivas accesibles sin estilos para componentes como botones.
- **class-variance-authority (`cva`)**: Composición tipada de variantes de componentes UI.
- **clsx & tailwind-merge**: Fusión segura de clases de Tailwind dinámicas.
- **@vercel/analytics**: Monitoreo de telemetría y rendimiento para despliegue en Vercel.
- **Turborepo**: Orquestación y caché de compilaciones y scripts en monorepo.
- **TypeScript 5.7.3**: Tipado estático estricto en todos los paquetes.

---

## 7. Próximos Pasos Recomendados para Producción

1. **Conexión a Base de Datos Real**:
   - La arquitectura actual en `apps/web/src/lib/stores.ts` está desacoplada mediante hooks. Solo es necesario reemplazar las lecturas/escrituras de `usePersistentState` por llamadas a una API REST / Server Actions conectadas a PostgreSQL, Supabase o Prisma.
2. **Autenticación Real (Auth.js o Supabase Auth)**:
   - Reemplazar el simulador de `AppProvider` por sesiones seguras basadas en cookies HTTP-only y tokens JWT.
3. **Pasarela de Pagos**:
   - En `/checkout`, integrar proveedores como Wompi, Mercado Pago o Stripe para cobros en línea de tarjetas, PSE o Nequi.
4. **Lector de Cámara Real en Escáner**:
   - En `/scanner`, agregar soporte para la API del navegador `navigator.mediaDevices.getUserMedia()` o librerías como `html5-qrcode` para lectura física desde la cámara del celular o tablet de recepción.
