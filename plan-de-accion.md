# Plan de Acción Técnico y de Diseño (UX / UI) — Altura Club

Este plan de acción desglosa la ejecución de las mejoras identificadas en la auditoría integral, organizadas en 4 fases secuenciales con criterios de aceptación claros, archivos involucrados y estimación de esfuerzo.

---

## 🗺️ Visión General del Plan

| Fase | Enfoque | Impacto | Esfuerzo | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **Fase 1** | **Quick Wins, Higiene de Datos y Accesibilidad Crítica** | Crítico | Bajo | ✅ **Completada** |
| **Fase 2** | **Correcciones Estructurales, Ergonomía Móvil y Dark Mode** | Alto | Medio | ✅ **Completada** |
| **Fase 3** | **Sistema Visual, Tipografía Corporativa y Componentes UI** | Alto | Medio | ✅ **Completada** |
| **Fase 4** | **Escalabilidad de Negocio, Pasarela de Pagos y Cámara QR** | Alto | Alto | ✅ **Completada** |

---

## 🚀 Fase 1: Quick Wins, Higiene de Datos y Accesibilidad Crítica

### Tarea 1.1: Corrección de rol y aislamiento de privacidad en `/tickets`
- **Problema:** En `apps/web/src/app/(customer)/tickets/page.tsx`, se evaluaba `session?.role === 'Cliente'`. Como el tipo es `'customer'`, evaluaba a `false` y exponía las reservas globales del complejo a clientes normales.
- **Acción:**
  - Actualizar la condición a `session?.role === 'customer'`.
  - Asegurar que los clientes solo vean sus propios tiquetes filtrados por su nombre/sesión.
  - Modificar los textos y encabezados para que al cliente le diga "Mis Tiquetes / Tu acceso" y al staff le muestre "Control de Acceso / Todos los tiquetes".
- **Archivos:** `apps/web/src/app/(customer)/tickets/page.tsx`.

### Tarea 1.2: Erradicación de la microtipografía en todo el CSS
- **Problema:** Múltiples clases en `globals.css` usan tamaños de `6px`, `7px`, `8px`, `9px` y `10px`, violando legibilidad y normativas WCAG.
- **Acción:**
  - Subir la escala mínima:
    - Badges, metadatos y etiquetas secundarias: mínimo `12px` (o `11.5px` en mayúsculas con tracking).
    - Encabezados de tabla (`th`) y celdas (`td`): mínimo `12px` y `13px-14px`.
    - Gráficos (`.chart-y-labels`, `.donut-chart small`): mínimo `11px-12px`.
    - Precios y descripciones de tarjetas: `14px-16px` para precios y `12px-13px` para descripciones.
  - Mejorar el contraste de `--color-content-muted` de `#748079` (ratio 3.9:1) a `#526058` (ratio > 5:1).
- **Archivos:** `apps/web/src/app/globals.css`.

### Tarea 1.3: Unificación de Marca a «Altura Club»
- **Problema:** Coexistencia confusa de "SportComplex" y "Altura Club".
- **Acción:**
  - Actualizar `Brand` en `apps/web/src/components/brand.tsx` a "Altura Club".
  - Actualizar títulos y metadatos SEO en `apps/web/src/app/layout.tsx`.
- **Archivos:** `apps/web/src/components/brand.tsx`, `apps/web/src/app/layout.tsx`.

### Tarea 1.4: Accesibilidad en Toasts y Feedback
- **Problema:** `ToastMessage` no notificaba a lectores de pantalla.
- **Acción:**
  - Agregar `role="status"` y `aria-live="polite"` al contenedor de toasts.
- **Archivos:** `apps/web/src/components/toast-message.tsx`.

### Tarea 1.5: Corrección de fallbacks de navegación y roles
- **Problema:** `roleNavigation[session?.role ?? 'Empleado']` arriesga excepciones `undefined.map()`, y el formulario de empleados inicializa con `'Empleado'` en lugar de `'staff'`.
- **Acción:**
  - Corregir el fallback a `'staff'` en `apps/web/src/app/(staff)/scanner/page.tsx`.
  - Corregir el estado inicial en `apps/web/src/app/(admin)/admin/employees/page.tsx`.
- **Archivos:** `apps/web/src/app/(staff)/scanner/page.tsx`, `apps/web/src/app/(admin)/admin/employees/page.tsx`.

---

## ✅ Fase 2: Correcciones Estructurales, Ergonomía Móvil y Dark Mode (Completada)

### Tarea 2.1: Dark Mode unificado en Administración y Staff (Completada)
- Implementación de selectores `.club-app.dark` para `.admin-shell`, `.admin-sidebar`, `.admin-topbar`, `.metric-card`, `.chart-card`, `.occupancy-card`, `.reservations-card`, tablas, formularios y controles.
- Botón interactivo de alternar tema (`Sun` / `Moon`) integrado en la barra superior de administración con persistencia de estado (`altura:dark`).
- Paleta visual armónica modo noche: `#111815` (canvas), `#17211c` (sidebar/topbar), `#19221e` (cards), con acentos luminosos `#8cd766` y contraste superior a 6:1.
- **Archivos:** `apps/web/src/app/(admin)/admin/layout.tsx`, `apps/web/src/app/globals.css`.

### Tarea 2.2: Ergonomía Táctil Móvil (Touch Targets $\ge 44\text{ px}$) (Completada)
- Botones de alternancia de tema (`.theme-toggle`, `mobile-menu`) y botones de íconos en barra superior y tablas (`.admin-icon-button`, `.icon-action`) ajustados a $44 \times 44\text{ px}$.
- Botones de selección de franja horaria (`.slot-button`) actualizados a `min-height: 44px`.
- Campos de entrada y menús desplegables (`.demo-table select`, `.demo-field input`, `.scanner-field input`) ajustados a `min-height: 44px`.
- Enlaces y botones de navegación administrativa móvil ajustados a `min-height: 44px`.
- **Archivos:** `apps/web/src/app/globals.css`.

### Tarea 2.3: Desbloqueo de previsualización para Administradores y Huéspedes (Completada)
- Retirada la redirección bloqueante en `/services/[category]/[id]` (`session.role !== 'customer'`).
- Inclusión del rol `'admin'` en las rutas protegidas `/checkout` y `/confirmation` dentro del dominio `@sportcomplex/core`.
- Distinción contextual en la interfaz: badge de "VISTA ADMINISTRADOR" y botón adaptativo de prueba de auditoría para administradores y visitantes no autenticados.
- **Archivos:** `apps/web/src/app/(customer)/services/[category]/[id]/page.tsx`, `packages/core/src/domain/navigation.ts`, `packages/core/src/data/catalog.ts`.

### Tarea 2.4: Modal de Inspección y Ficha Técnica en `/admin/bookings` (Completada)
- Añadido botón de inspección visual (`Eye`) en cada fila de reserva de la tabla administrativa.
- Modal dedicado con previsualización del código QR digital, ficha del cliente, servicio, sede, fecha, asistentes, monto total y control directo de cambio de estado.
- **Archivos:** `apps/web/src/app/(admin)/admin/bookings/page.tsx`.

---

## ✅ Fase 3: Sistema Visual, Tipografía Corporativa y Componentes UI (Completada)

### Tarea 3.1: Tipografía corporativa con `next/font/google` (Completada)
- Sustitución de las fuentes genéricas del sistema y Arial por **Plus Jakarta Sans** (`next/font/google`), con pesos optimizados (400, 500, 600, 700, 800) cargados sin impacto en latencia de red (`display: swap`).
- Inyección mediante variable CSS global `--font-sans` en `apps/web/src/app/layout.tsx` y regla raíz en `apps/web/src/app/globals.css`.
- Tipografía moderna, geométrica y con alta legibilidad en pantallas retina y móviles.
- **Archivos:** `apps/web/src/app/layout.tsx`, `apps/web/src/app/globals.css`.

### Tarea 3.2: Reutilización y expansión de `@sportcomplex/ui` (Completada)
- **Componentes base desarrollados en `@sportcomplex/ui`:**
  - `Button`: Variantes (`default`, `brand`, `accent`, `outline`, `secondary`, `ghost`, `destructive`, `link`), tamaños con alturas ergonómicas mínimas de 44 px para cumplimiento estricto WCAG 2.2 AA.
  - `Badge`: Variantes semánticas (`default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `admin`) con soporte adaptativo para Light y Dark Mode.
  - `Card`: Composición modular (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
  - `Input`: Campo tipado con altura ergonómica de 44 px (`h-11`), anillos de foco con contraste, bordes temáticos y soporte de estados inválidos/deshabilitados.
- **Migración a lo largo de la aplicación:**
  - Reutilización de `Badge` en `admin/layout.tsx`, `services/[category]/[id]/page.tsx`, `tickets/page.tsx`, `admin/bookings/page.tsx`, `admin/catalog/page.tsx`, `admin/employees/page.tsx`, `admin/memberships/page.tsx` y `scanner/page.tsx`.
  - Reutilización de `Input` en formularios modales de catálogo, reservas, empleados, membresías, configuración, escáner de taquilla y autenticación (`auth-form.tsx`).
  - Integración de `ActionButton` con `Button` de `@sportcomplex/ui` preservando compatibilidad y estandarizando interacción.
- **Archivos:**
  - `packages/ui/src/index.ts`
  - `packages/ui/src/components/button.tsx`
  - `packages/ui/src/components/badge.tsx`
  - `packages/ui/src/components/card.tsx`
  - `packages/ui/src/components/input.tsx`
  - `apps/web/src/components/action-button.tsx`
  - Vistas de administración, cliente y staff.

---

## ✅ Fase 4: Escalabilidad de Negocio, Pasarela de Pagos y Cámara QR (Completada)

### Tarea 4.1: Pasarela de pagos interactiva en `/checkout` y comprobante digital en `/confirmation` (Completada)
- **Extensión del Dominio:** Modelo `Booking` enriquecido con `paymentMethod` (`'card' | 'pse' | 'wompi' | 'on_site'`), `paymentStatus` (`'approved' | 'pending' | 'rejected'`) y `transactionRef` único generado en formato `WMP-ALT-XXXXXX`.
- **Experiencia de Pago Multicanal:**
  1. **Tarjeta de Crédito / Débito:** Previsualización dinámica e interactiva de tarjeta física con microtexturas, chip dorado, formateo automático en bloques de 4 dígitos, fecha de vencimiento (`MM/AA`), código de seguridad CVC, selector de cuotas (1 a 24) y botón de carga de tarjeta de pruebas de auditoría.
  2. **PSE / Transferencia Bancaria:** Selector de 10 entidades bancarias colombianas, clasificación de persona (Natural / Jurídica), tipo de documento, número de identificación y correo registrado en ACH.
  3. **Wompi / Nequi / Bancolombia a la Mano:** Entrada de número celular a 10 dígitos y badge de procesamiento instantáneo.
  4. **Pago en Sede Deportiva:** Opción para abono en efectivo o datáfono físico en recepción al presentarse a la reserva.
- **Simulador de Transacción:** Modal de procesamiento con animación de spinner, 3 etapas de validación en tiempo real (Conexión $\rightarrow$ Verificación de fondos y token $\rightarrow$ Aprobación) y generación de recibo digital.
- **Comprobante y Pase Digital (`/confirmation`):** Renderizado de factura con desglose de IVA (19%), ID de transacción auditable, estado `APROBADO` en verde esmeralda y pase de acceso con código QR generado en tiempo real.
- **Archivos:** `packages/core/src/data/records.ts`, `apps/web/src/app/(customer)/checkout/page.tsx`, `apps/web/src/app/(customer)/confirmation/page.tsx`, `apps/web/src/app/globals.css`.

### Tarea 4.2: Lector de cámara física con WebRTC y escáner de códigos QR en `/scanner` (Completada)
- **Flujo de Video en Tiempo Real:** Integración directa con `navigator.mediaDevices.getUserMedia` para transmisión continua de video en el visor del escáner con selector de cámara frontal o trasera (`facingMode: 'environment' | 'user'`).
- **Resiliencia y Manejo de Permisos:** Detección de soporte de hardware, control de timeout (`Promise.race`) contra bloqueos en navegadores sin permisos o entornos headless, y banner informativo estilizado ante excepciones de hardware (`NotAllowedError`, `NotFoundError`).
- **Reconocimiento y Validación Instantánea:**
  - Bucle de detección automática con API nativa `BarcodeDetector` (para formatos QR, Code 128, Code 39, EAN 13).
  - Feedback sonoro sintetizado con Web Audio API (`AudioContext`) emitiendo acordes de éxito armónicos (880 Hz / 1174 Hz) y alertas de error conmutables mediante botón de silenciar.
  - Efecto de destello visual en pantalla (`camera-scan-flash`) y animación de rayo láser escaneador (`camera-scanline-active`).
- **Simulación y Pruebas Rápidas:** Selector de códigos rápidos de desarrollo vinculados en tiempo real con las reservas activas (incluyendo las recién pagadas).
- **Control de Acceso Operativo:** Detección de tiquetes válidos, reservas usadas (`YA USADO`), reservas no activas y servicios incorrectos, con botón de registro de ingreso en un solo clic que actualiza el estado inmediatamente en todo el sistema.
- **Archivos:** `apps/web/src/app/(staff)/scanner/page.tsx`, `apps/web/src/app/globals.css`.
