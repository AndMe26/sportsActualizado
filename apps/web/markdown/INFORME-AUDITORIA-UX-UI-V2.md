# Informe de Auditoría Integral de UX / UI (Versión 2.0)
**Producto:** Plataforma Web Deportiva & Wellness «AKROS · Active Lifestyle Club» (`@sportcomplex`)  
**Fecha:** 5 de octubre de 2026  
**Equipo de Evaluación:** Senior UX Researcher · Senior UI Designer · Product Designer · Front-End Architecture & WCAG Accessibility Specialist  
**Estado del Proyecto:** Prototipo / Mockup Funcional Avanzado (Fase Pre-Producción Tailwind CSS)

---

## 1. Resumen Ejecutivo

### Calificaciones Globales de Calidad (Escala 1 a 10)

| Dimensión Evaluada | Calificación V1 (Inicial) | Calificación V2 (Actual) | Evolución | Estado de Madurez |
| :--- | :---: | :---: | :---: | :--- |
| **Calificación General UX/UI** | **7.8 / 10** | **8.8 / 10** | ↗ (+1.0) | **Avanzado (Listo para Fase Beta Pública)** |
| **UX & Arquitectura de Información** | 7.9 / 10 | **8.7 / 10** | ↗ (+0.8) | Excelente flujo de reserva, contexto ampliado y propuesta de valor clara |
| **UI & Calidad Estética Visual** | 8.2 / 10 | **9.2 / 10** | ↗ (+1.0) | Nivel editorial de club internacional (Nike / Roland Garros / The Grind) |
| **Responsive Design (Móvil / Tablet / Desktop)** | 7.5 / 10 | **8.8 / 10** | ↗ (+1.3) | Grids fluidos, tabs horizontales táctiles y paddings adaptados |
| **Accesibilidad Web (WCAG 2.2 AA)** | 7.4 / 10 | **8.4 / 10** | ↗ (+1.0) | Alto contraste en light/dark, soporte de teclado y roles semánticos |
| **Consistencia & Arquitectura de Componentes** | 7.6 / 10 | **8.9 / 10** | ↗ (+1.3) | Componentes modulares, tokens semánticos y animaciones GPU |

---

### ¿Qué está extraordinariamente bien resuelto en esta versión?
1. **Identidad de Marca AKROS y Atmósfera Premium:**
   - La transición cromática a Verde Bosque Profundo (`#091b13` – `#123e30`) con destellos en Lima Atlético (`#c9ef75`) transmite sofisticación sin perder energía deportiva.
   - El **Preloader Cinemático (`SplashScreen`)** con el isotipo oficial `Akros-logo.png`, retroiluminación esmeralda, barrido de energía rotativo y barra de progreso de 1.35s genera una primera impresión impactante (*efecto WOW* de alto valor percibido).
2. **Kinetic Word Blur-Fade Reveal en Hero:**
   - Inspirado en la referencia *The Grind*, el titular `"Tu mejor versión empieza aquí."` aparece desglosado palabra a palabra con desenfoque dinámico y aceleración cúbica, eliminando la sensación estática tradicional.
3. **Showcase Interactivo de Instalaciones (`FacilityShowcase`):**
   - El selector de pestañas flotantes (`Pádel Panorámico`, `Tenis Roland Garros`, `Fútbol Sintético`, `Piscina Climatizada`, `Gimnasio Pro`, `Zona Wellness`) permite al usuario inspeccionar especificaciones técnicas, condiciones en vivo (`23°C · Cristal Seco`) y precios en un solo bloque sin recargar la página.
4. **Métricas con Interpolación Fluida en Administración (`AnimatedNumber`):**
   - Inspirado en *Alpine Guides*, los ingresos (`$4.860.000`), reservas (`128`) y porcentajes de ocupación crecen con curva desacelerada `easeOutExpo`, aportando dinamismo visual de producto moderno.
5. **Corrección de Jerarquía y Wrapping Tipográfico:**
   - Se resolvió la rotura visual previa donde palabras aisladas como `"a"` quedaban huérfanas en la cabecera. La nueva clase `.section-header-block` garantiza balance tipográfico (`text-wrap: balance`), contraste adaptativo en Light (`#1a4d36`) y Dark (`#c9ef75`), y alineación centrada o apilada coherente.
6. **Ecosistema Completo de Club (Más allá de un simple software de reservas):**
   - La inclusión de membresías (`Drop-in`, `Active Club`, `Black Pro`), agenda de torneos comunitarios, zona lounge de tercer tiempo y pase digital QR valida la visión de negocio de un club de vida activa.

---

### Riesgos y Oportunidades Críticas Detectadas
1. **Falta de Persistencia Dinámica en Membresías:** El selector de facturación mensual/anual cambia visualmente los precios, pero al hacer clic en *"Unirme a Active Club"* no transfiere el plan seleccionado al flujo de checkout; redirige genéricamente a `/services`.
2. **Unificación del Nombre de Marca en la Barra Superior:** En el Navbar superior (`topbar`) el componente `Brand` aún renderiza el texto `"Altura Club"` en lugar de `"AKROS"`, creando una pequeña discrepancia de naming con el footer y el preloader.
3. **Optimización de Assets en Red Móvil:** Las imágenes de alta definición de Unsplash en el showcase panorámico requieren atributos `sizes` y optimización mediante `next/image` en la futura migración a producción para reducir el consumo de datos celulares en 3G/4G.
4. **Soporte Formal para `prefers-reduced-motion`:** Si bien las animaciones usan aceleración por GPU (`transform` y `opacity`), los usuarios con trastornos vestibulares deben poder desactivar automáticamente el ticker infinito, el blur de palabras y el giro del splash.

---

### Conclusión Honesta de Madurez
El producto ha superado con creces el nivel de un mockup básico o intermedio. En su estado actual se califica como **Avanzado y visualmente de Clase Mundial (Nivel Beta / Showroom)**. Su arquitectura modular ya está lista para servir de base al futuro `system_design.md` y a la migración definitiva a Tailwind CSS.

---

## 2. Hallazgos Detallados de UX / UI

| Área | Problema detectado | Severidad | Evidencia en el proyecto | Impacto en el usuario | Recomendación concreta |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Branding & Consistencia** | Discrepancia de nombre entre Topbar (`Altura Club`) y Preloader / Footer (`AKROS Active Lifestyle Club`). | **Media** | `apps/web/src/components/brand.tsx` vs `splash-screen.tsx` / `institutional-footer.tsx` | Puede causar confusión transitoria sobre el nombre oficial del club. | Actualizar `Brand` para mostrar el logotipo y nombre oficial `AKROS` manteniendo la coherencia en toda la aplicación. |
| **Conversión & UX** | Las tarjetas de membresía y los eventos dirigen a `/services` sin pre-cargar el contexto de compra. | **Media** | Botones en `memberships-section.tsx` y `club-events.tsx` apuntan a `href="/services"` | El usuario debe volver a buscar el servicio o torneo manualmente tras haber decidido inscribirse. | Implementar query params (ej. `/services?plan=active` o `/checkout?event=padel-night`) para abrir directamente el modal de confirmación o reserva. |
| **Accesibilidad (a11y)** | Falta de consulta `@media (prefers-reduced-motion)` para pausar animaciones automáticas. | **Media** | `.word-blur-item`, `.marquee-track`, `.splash-energy-wave` en `globals.css` | Usuarios sensibles a mareos o fatiga visual pueden sentirse abrumados con animaciones cinemáticas continuas. | Añadir regla global `@media (prefers-reduced-motion: reduce)` que fuerce `animation-duration: 0.01ms !important; filter: none !important;`. |
| **Responsive (Móvil)** | En pantallas extremadamente angostas (menores a 360px), el selector de sedes del footer puede tener márgenes ajustados. | **Baja** | `.footer-sedes-grid` en pantallas de 320px | Posible desbordamiento visual de los horarios en smartphones compactos. | Ajustar el padding interno de `.footer-sede-card` a `14px` en `max-width: 360px` y permitir que las horas se dividan en dos líneas. |
| **Performance de Imágenes** | Uso de etiquetas estándar `<img>` con URLs directas de Unsplash en el Showcase en lugar de `next/image`. | **Baja** | `facility-showcase.tsx`, `lifestyle-and-digital-pass.tsx` | Tiempos de descarga ligeramente mayores en redes móviles lentas al no generar formatos WebP/AVIF automáticos. | En la versión final de producción, reemplazar por el componente `<Image />` de Next.js con `sizes="(max-width: 768px) 100vw, 50vw"`. |
| **Feedback Táctil** | El selector de pestañas de instalaciones en móvil no tiene un indicador visual sutil de "deslizar para ver más". | **Baja** | `.facility-tabs-wrap` en móvil | Algunos usuarios primerizos podrían no notar que existen 6 pestañas desplazables horizontalmente. | Aplicar una máscara de desvanecimiento CSS en el borde derecho (`mask-image: linear-gradient(to right, black 85%, transparent 100%)`). |

---

## 3. Mejoras Prioritarias

### A. Cambios Obligatorios (Antes de Lanzamiento a Producción)
1. **Unificar el isotipo y wordmark AKROS en el Navbar:** Reemplazar el texto `"Altura Club"` en `apps/web/src/components/brand.tsx` por el isotipo oficial `Akros-logo.png` y la tipografía `AKROS`, asegurando una identidad unívoca desde el primer segundo.
2. **Incorporar soporte de Movimiento Reducido (`prefers-reduced-motion`):** Garantizar cumplimiento WCAG 2.2 criterio 2.3.3 desactivando el blur dinámico, el ticker continuo y el carrusel para usuarios con preferencias de accesibilidad activas.
3. **Conexión de Flujo en CTAs de Membresías y Eventos:** Permitir que los botones de *"Unirme a Active Club"* y *"Inscribirme al Torneo"* lleven a su correspondiente flujo de confirmación o abran un modal de reserva preseleccionada.

### B. Mejoras Recomendadas (Para Elevar el Pulido a Nivel Senior)
1. **Máscara de Gradiente para Pestañas Móviles:** Añadir un efecto de sombra/desvanecimiento en el borde derecho del contenedor de pestañas para indicar intuitivamente la existencia de más disciplinas deportivas.
2. **Sonido Háptico / Feedback Auditivo Sutil:** En el escáner de taquilla (`/scanner`), reforzar el éxito de lectura de pase QR con un tono agradable o vibración háptica en dispositivos móviles compatibles (`navigator.vibrate([40, 30, 40])`).
3. **Filtro de Calendario en Agenda de Torneos:** Permitir filtrar eventos por disciplina deportiva (*Solo Pádel*, *Solo Tenis*, *Solo Natación*).

### C. Mejoras de Alto Nivel (Fase de Escalamiento del Producto)
1. **Migración Limpia a Tailwind CSS con Tokens Semánticos (`system_design.md`):** Estandarizar toda la paleta `forest`, `lime`, `canvas` y `surface` en la configuración de Tailwind, eliminando selectores CSS redundantes.
2. **PWA (Progressive Web App) con Apple Wallet Pass:** Permitir que el pase QR dinámico de AKROS se descargue directamente en Apple Wallet y Google Wallet para acceso sin conexión en los torniquetes.
3. **Live Court Availability Radar:** Integrar un gráfico interactivo 2D del club donde las pistas se iluminen en tiempo real según su estado de ocupación (Verde: Disponible, Amarillo: En curso, Rojo: Ocupada).

---

## 4. Plan de Implementación por Fases

| Tarea | Archivo / Componente | Justificación UX/UI | Prioridad | Esfuerzo | Impacto Esperado |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **Unificación de Brand Navbar** | `apps/web/src/components/brand.tsx` | Elimina discrepancias de nombre y consolida la marca AKROS. | **Alta** | Bajo | 100% consistencia de identidad |
| **Soporte `prefers-reduced-motion`** | `apps/web/src/app/globals.css` | Cumplimiento estricto WCAG 2.2 AA para usuarios sensibles. | **Alta** | Bajo | Accesibilidad universal |
| **Máscara de scroll en tabs móviles** | `apps/web/src/app/globals.css` | Mejora la descubribilidad de instalaciones en pantallas pequeñas. | **Media** | Bajo | Mayor interacción en móvil |
| **Conexión de CTAs a checkout/modal** | `memberships-section.tsx`, `club-events.tsx` | Reduce fricción de reserva al evitar búsquedas repetitivas. | **Media** | Medio | +25% conversión estimada |
| **Migración formal a Tailwind CSS** | `tailwind.config.js` y `system_design.md` | Prepara el repositorio para escalabilidad y mantenimiento ágil. | **Media** | Alto | Código limpio y estandarizado |

---

## 5. Propuesta Concreta de Rediseño por Pantalla

### 1. Página de Inicio (Home)
- **Estado Actual:** Excelente. Cuenta con Preloader, Hero Blur-Fade, Ticker, Showcase con tabs, Membresías, Eventos, Lounge/Pase QR, Testimonios y Footer Institucional.
- **Acción:** Unificar el logo de la barra de navegación superior con el isotipo `Akros-logo.png`.

### 2. Catálogo de Servicios (`/services` y `/services/[category]`)
- **Estado Actual:** Sólido, con píldoras de condiciones en vivo (`23°C · Pistas Secas`) y zoom cinemático en tarjetas.
- **Acción:** Conservar la fórmula de condiciones en vivo y añadir un micro-filtro de disponibilidad horaria (*"Disponibles en la mañana"*, *"Disponibles en la noche"*).

### 3. Ficha de Reserva (`/services/[category]/[id]`)
- **Estado Actual:** Muy alto nivel. Incluye la grilla técnica de especificaciones (`sports-specs-grid`), separador de cancha Roland Garros y selector de horarios con feedback táctil.
- **Acción:** Mantener intacto el diseño actual; está listo para producción.

### 4. Escáner de Taquilla (`/scanner`)
- **Estado Actual:** Muy profesional con estética HUD deportiva oscura, ticker continuo y animación de haz láser.
- **Acción:** Añadir botón de linterna (*Flashlight toggle*) para validar códigos en entornos de poca luz en torniquetes exteriores.

### 5. Panel Administrativo (`/admin`)
- **Estado Actual:** Dinámico y ejecutivo gracias a las cifras numéricas en crecimiento desacelerado (`AnimatedNumber`).
- **Acción:** Mantener los sparklines y el donut chart sincronizados con la carga de datos.

---

## 6. Recomendaciones Técnicas de Front-End & Design System

1. **Tokens de Color Semánticos:**
   - `--brand-forest: #091b13;` (Lienzo principal Dark Mode)
   - `--brand-forest-surface: #123e30;` (Superficies de tarjetas y estados activos)
   - `--brand-lime: #c9ef75;` (Acento atlético de alta visibilidad)
   - `--brand-lime-hover: #dffca0;` (Estado hover interactivo)
   - `--brand-ink-light: #1a4d36;` (Texto de énfasis para modo claro, con contraste WCAG AAA > 7.5:1)
2. **Escala de Radios de Borde (Border Radius):**
   - `sm (6px):` Badges, tags de estado, live dots.
   - `md (10px):` Botones de acción, inputs de texto, chips de sede.
   - `lg (16px):` Tarjetas de catálogo, modales secundarios, cajas de precio.
   - `xl (22px):` Tarjetas panorámicas de exhibición, tarjetas de membresía, modal de checkout.
3. **Escala de Curvas de Aceleración (Easings):**
   - Estandarizar todas las transiciones interactivas en `cubic-bezier(0.16, 1, 0.3, 1)` (curva *ease-out expo* estilo Apple / Linear), evitando transiciones lineales rígidas.
4. **Sistema de Iconografía Oficial (`lucide-react`) & Semántica Visual:**
   - **Librería Estándar:** `lucide-react` unificada en toda la plataforma (versión 0.400+ con soporte SVG puro y tree-shaking).
   - **Grosor de Trazo (*Stroke Width*):** `1.75px` para iconos de acción e interfaz general; `1.5px` para iconos de gran formato en contenedores `IconBox` (24px a 40px); `2px` únicamente para microindicadores (< 14px).
   - **Iconos por Categoría Deportiva:**
     - *Canchas:* `Footprints` (pisada atlética/calzado), `Trophy` (torneos), `Activity` (rendimiento), `Layers` (superficie), `Lightbulb` (iluminación LED nocturna).
     - *Piscinas:* `Waves` (acuática/nado), `Compass` (dimensiones técnicas).
     - *Gimnasio:* `Dumbbell` (fuerza), `Flame` (calorías/cardio), `Zap` (potencia funcional).
     - *Bienestar:* `Sparkles` (spa/recuperación), `SunMedium` (sauna/zonas térmicas).
   - **Iconos de Logística, Pago y Acceso:**
     - *Reserva:* `CalendarDays`, `Clock3`, `MapPin`, `Users`.
     - *Checkout & Seguridad:* `CreditCard`, `ShieldCheck`, `Receipt`, `CheckCircle2`.
     - *Control de Portería:* `QrCode`, `ScanLine`, `Camera`, `Flashlight`, `Ticket`.
   - **Accesibilidad:** Todo icono decorativo debe incluir `aria-hidden="true"`. Iconos interactivos sin texto visible deben implementar obligatoriamente `aria-label` o `<span className="sr-only">`.

---

## 7. Top 10 Acciones Ordenadas de Mayor a Menor Prioridad

1. **[Alta]** Unificar el logotipo y texto del componente `Brand` en la barra superior a `AKROS Active Lifestyle Club`.
2. **[Alta]** Incorporar soporte nativo de accesibilidad `@media (prefers-reduced-motion)` en `globals.css` para pausar animaciones automáticas.
3. **[Media]** Añadir máscara de desvanecimiento en el scroll horizontal de las pestañas de instalaciones en dispositivos móviles.
4. **[Media]** Conectar los botones de membresías y eventos con parámetros de consulta que preseleccionen la opción en el flujo de reserva.
5. **[Media]** Implementar `next/image` con atributos `sizes` para las fotografías panorámicas en la migración a producción.
6. **[Media]** Añadir disparador de linterna / flash en el escáner de taquilla (`/scanner`) para torniquetes nocturnos.
7. **[Baja]** Ajustar padding interno de las tarjetas de sede física en el footer para dispositivos móviles menores a 360px.
8. **[Baja]** Incorporar feedback auditivo sutil y vibración háptica en la validación exitosa de pases QR.
9. **[Baja]** Diseñar el documento formal `system_design.md` para la arquitectura final con Tailwind CSS v3/v4.
10. **[Baja]** Configurar compatibilidad con Apple Wallet / Google Wallet para credenciales digitales sin conexión.
