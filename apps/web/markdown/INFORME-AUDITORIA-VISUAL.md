# Informe de Auditoría Visual y de UI — Altura Club

**Fecha:** 2 de octubre de 2026  
**Auditor:** UI Designer Senior & Design System Architect  
**Producto:** Plataforma Web Deportiva y Wellness «Altura Club» (`@sportcomplex`)  
**Alcance:** Exclusivamente User Interface (UI), Estética Visual, Jerarquía, Consistencia, Percepción de Calidad y Diseño Responsive.

---

## 1. Diagnóstico Visual General

- **Calificación General de UI:** **7.8 / 10**
- **Nivel de Madurez Visual:** **Sólido (Intermedio-Avanzado)**
- **Estilo Visual Transmitido:** Club deportivo campestre y wellness contemporáneo de gama alta (inspirado en la exclusividad deportiva de El Poblado, Medellín). Combina la sobriedad botánica del verde bosque con la alta energía atlética del verde lima/chartreuse (pelota de tenis / fluorescente), complementado con tipografía sans-serif geométrica moderna (*Plus Jakarta Sans*).

### Elementos de Identidad a Conservar Indispensablemente
1. **La Dualidad Cromática Bosque / Lima:** El contraste icónico entre el verde profundo (`#123e30` / `#0f2b20`) y el lima enérgico (`#c9ef75` / `#d6f694`) otorga un carácter distintivo inmediato, diferenciando a Altura Club de las plataformas deportivas genéricas o azules corporativas.
2. **Texturas y Atmósfera Visual:** Los fondos radiales oscuros con gradientes sutiles y micro-mallas en el escáner y la tarjeta bancaria, así como el hero fotográfico con viñetas esmeralda.
3. **Tipografía Corporativa Plus Jakarta Sans:** Sus pesos geométricos (`600`, `700`, `800`) en mayúsculas con tracking (`letter-spacing: .08em` a `.12em`) para cejas (*eyebrows*) y encabezados le aportan un sello editorial atlético de gran nivel.
4. **Pase Digital y Tarjeta Visual:** Las metáforas físicas del tiquete con corte troquelado y muescas circulares laterales, el código QR nítido y la tarjeta de crédito visual con microtextura y chip dorado.

### Aspectos que Reducen la Percepción de Calidad
1. **Proliferación Anárquica de Border-Radius:** Coexisten sin escala sistemática bordes de `4px`, `6px`, `7px`, `8px`, `9px`, `10px`, `11px`, `12px`, `13px`, `15px`, `16px` y `20px`. Esta falta de escala de radio hace que cards adyacentes o modales se sientan construidos por diferentes diseñadores.
2. **Sombras Planas o Inconsistentes:** Varias secciones confían únicamente en bordes de `1px solid var(--line)` sin profundidad ambiental, lo que genera una apariencia ligeramente "recortada" o plana en monitores de alta gama (Retina / OLED).
3. **Micro-asimetrías y Densidad Apretada en Administración:** Las tarjetas de métricas en el panel de control poseen paddings verticales muy ajustados (`13px 13px 10px`), leyendas comprimidas y sparklines estáticas que lucen frágiles frente al resto de la aplicación.
4. **Falta de Texturas de Estado y Vacío Visual en Catálogo Principal:** En `/services`, las cuatro categorías principales son cards puramente vectoriales con fondo blanco/marfil; carecen del tratamiento fotográfico premium presente en el hero de la home o en las fichas individuales.
5. **Transiciones Secas en Componentes Interactivos:** Varios botones aplican `transform: translateY(-1px)` o `translateY(-3px)` con curvas de tiempo genéricas (`.18s`, `.2s`), mientras que otros no tienen transición alguna, generando una sensación táctil dispar.

### Diagnóstico de Madurez para Producción / Portafolio
La interfaz se encuentra en un estado **sólido para demostración comercial y fase beta avanzada**. Cuenta con una estética atractiva, diferenciada y coherente en su gran mayoría. Sin embargo, para calificar como un **producto digital de clase mundial para portafolio senior o producción masiva de lujo** (al nivel de *Linear, Equinox o Strava*), requiere un proceso de **refinamiento milimétrico de tokens de diseño**: estandarización de radios, escala de sombras ambientales de dos capas, sistema de espaciado estricto de base 4/8, y pulido de microinteracciones.

---

## 2. Fortalezas Visuales

| Elemento / Componente | Por qué funciona visualmente | Cómo conservarlo y escalarlo |
| :--- | :--- | :--- |
| **Hero Principal (`/`)** | La superposición fotográfica en viñeta profunda con gradiente de 3 capas (`rgba(8, 29, 21, .91)` a `.14%`) genera un contraste óptimo con el titular blanco y el acento lima en una sola palabra clave. El indicador pulsante (*live dot*) y el bloque de prueba social con avatares solapados aportan vitalidad inmediata. | Mantener la fórmula de viñeta fotográfica multicapa como plantilla base para todos los hero banners de categorías y páginas de aterrizaje. |
| **Tarjeta Visual de Pago (`/checkout`)** | La proporción áurea física (380x200), el degradado diagonal esmeralda carbón (`#133e30` a `#081a14`), el chip metálico dorado y el halo radial translúcido le otorgan un aspecto ultra-premium que infunde confianza financiera. | Convertir este componente en un patrón de visualización física para tarjetas de membresía, pases VIP y credenciales de acceso de empleados. |
| **Pase Digital Troquelado (`/confirmation`)** | El detalle de las muescas circulares laterales semicortadas (`ticket-separator > i`) imita la perforación de una entrada física tradicional de club, logrando una metáfora skeuomórfica sutil combinada con diseño plano moderno. | Mantener las muescas troqueladas en `/tickets` y en los comprobantes PDF descargables. |
| **Visor de Cámara Dark Mode (`/scanner`)** | La pantalla de escáner en `#101815` con marco de cuatro esquinas lima, textura cuadriculada en máscara alfa y rayo láser animado (`camera-scanline-active`) transmite sofisticación tecnológica de grado profesional. | Estandarizar la estética HUD deportiva oscura para herramientas de hardware, terminales POS y quioscos de autoservicio. |
| **Paleta Dual Dark Mode en Admin** | El fondo obsidian-forest (`#111815`) con superficies `#19221e` y bordes `#303c35` logra un contraste de descansada lectura (superior a 7:1) sin caer en el negro puro `#000000`, conservando la tonalidad natural del club. | Utilizar `--color-canvas: #111815` y `--color-surface: #19221e` como los tokens oficiales de Dark Mode en toda la suite. |

---

## 3. Problemas y Oportunidades de UI

| Área visual | Problema detectado | Severidad | Elemento, pantalla o componente afectado | Por qué afecta la percepción visual | Mejora concreta |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Jerarquía y Densidad** | Tarjetas de métricas en Admin apretadas verticalmente (`padding: 13px 13px 10px`). Los sparklines y valores se sienten apiñados. | **Alta** | `.metric-card` en `/admin` | Hace que el dashboard se perciba como una plantilla técnica comprimida y no como un cuadro de mando ejecutivo espacioso. | Aumentar padding a `20px`, separar el valor numérico (`28px`, `font-semibold`), y dar altura de `40px` al sparkline con gradiente de área. |
| **Consistencia de Radios** | Dispersión caótica de border-radius (`4px`, `6px`, `7px`, `8px`, `9px`, `11px`, `12px`, `13px`, `15px`, `20px`). | **Alta** | Botones, inputs, badges, cards, modales en todo el CSS | La falta de armonía en las esquinas rompe la cohesión del Design System y genera una sensación visual artesanal o fragmentada. | Restringir el sistema a 4 tokens estrictos: `sm: 6px` (badges), `md: 10px` (inputs/botones), `lg: 16px` (cards), `xl: 22px` (modales/hero). |
| **Profundidad y Elevación** | Dependencia casi exclusiva de bordes de `1px` con sombras excesivamente difusas (`rgba(22, 38, 29, .07)`). | **Media** | Cards de catálogo, tablas y paneles laterales | La interfaz se percibe demasiado plana (*flat*) en Light Mode; los contenedores no tienen presencia táctil ni separación limpia del lienzo. | Implementar sombra en dos niveles (sombra de contacto corta + sombra ambiental difusa con tinte bosque): `0 1px 2px rgba(18,62,48,.04), 0 8px 24px -4px rgba(18,62,48,.07)`. |
| **Consistencia de Botones** | Múltiples clases no unificadas (`.action-button`, `.camera-btn`, `.google-button`, `.hero-secondary`, `.day-choice`). | **Alta** | Módulos de reserva, autenticación y escáner | Diferentes alturas (`37px`, `44px`, `46px`, `48px`), diferentes grosores de texto (`600`, `650`, `750`, `800`) y diferentes hovers. | Migrar todos los botones al componente unificado `@sportcomplex/ui` `Button` con variantes estrictas (`brand`, `outline`, `ghost`, `secondary`). |
| **Atmósfera en Catálogo Principal** | Las 4 cards de servicios en `/services` son cajas de fondo liso con un icono de color pastel, luciendo desprovistas de emoción deportiva. | **Media** | `.category-card` en `/services` y Home | Desentona con el impacto fotográfico del hero banner; se siente abstracto y poco aspiracional para un club premium. | Incorporar fotografía de fondo con desenfoque suave o microtextura de cancha con gradiente oscuro al 25% y pill de disponibilidad luminosa. |
| **Microtipografía en Tablas** | Encabezados de tabla (`th`) con `font-size: 11px` o `12px` en tracking apretado y bajo contraste en modo claro. | **Media** | Tablas en `/admin/bookings`, `/admin/catalog`, etc. | Dificulta el escaneo rápido de datos para administradores durante jornadas operativas continuas. | Subir `th` a `12px`, `font-weight: 700`, `letter-spacing: .06em`, `text-transform: uppercase` con color `#4a5a50` (modo claro) y `#9aa9a0` (modo oscuro). |
| **Alineación de Topbar** | La barra superior en Admin mide `57px` mientras que la del cliente mide `76px`. En resoluciones intermedias (1024px-1280px), las acciones lucen desbalanceadas. | **Baja** | `.admin-topbar` en `/admin/*` | Discrepancia visual en la sensación de escala entre el portal del cliente y el portal administrativo. | Estandarizar la barra de administración en `64px` de altura, centrando verticalmente avatar, fecha y selector de tema. |
| **Navegación Móvil (Drawer)** | El menú desplegable móvil cae en bloque seco desde `top: 75px` con bordes rectos y sin backdrop blur sobre el contenido subyacente. | **Media** | `.mobile-nav` en `/` y `/services` | Se percibe como un dropdown antiguo en lugar de un overlay contemporáneo de aplicación móvil nativa. | Convertir en un drawer flotante con bordes inferiores redondeados (`16px`), `backdrop-filter: blur(16px)` y sombras envolventes. |
| **Estados Vacíos (*Empty States*)** | El contenedor `.dashboard-empty` usa borde punteado simple (`border: 1px dashed var(--line)`) con aspecto de wireframe. | **Media** | Panel de usuario `/dashboard` | Comunica descuido visual en lugar de una invitación elegante a reservar el primer turno. | Diseñar ilustración o composición geométrica tenue con botón CTA centrado y mensaje motivacional en tipografía editorial. |
| **Tratamiento de Badges** | Coexistencia de `.ticket-status`, `.reservation-status`, `.catalog-status` y el componente `Badge` con diferentes paddings y estilos de punto luminoso. | **Baja** | Módulos de administración, catálogo y tiquetes | Desalineación de píxeles y etiquetas que lucen desparejas al comparar pantallas. | Centralizar todos los badges en el componente `@sportcomplex/ui` `Badge` con tamaños fijos (`sm`, `md`) y variantes semánticas normadas. |

---

## 4. Propuesta de Evolución Visual

### Principios Visuales Rectores
1. **Lujo Deportivo Auténtico (*Country Club Modernity*):** La estética debe evocar césped recién cortado, tierra batida de tenis, agua cristalina y arquitectura contemporánea en piedra y cristal. No un gimnasio genérico ni un dashboard administrativo corporativo frío.
2. **Claridad y Aire (*Generous Breathing Room*):** Jerarquizar mediante espaciado generoso en lugar de acumulación de bordes y líneas divisorias.
3. **Profundidad Táctil Orgánica:** Reemplazar el aspecto plano con superficies ligeramente elevadas, sombras de contacto con matiz esmeralda y sutiles biseles de luz (`box-shadow: inset 0 1px 0 rgba(255,255,255,.08)`).
4. **Tipografía Jerárquica Rigurosa:** Utilizar una sola familia (*Plus Jakarta Sans*) explotando su versatilidad desde el titular display comprimido hasta etiquetas micro-espaciadas.

---

### Paleta de Color Refinada y Tokenizada

La paleta conserva exactamente la raíz identitaria de Altura Club pero la expande a un sistema tonal completo con propósitos funcionales específicos:

#### 1. Primario: Bosque Esmeralda (Marca, Navegación, Títulos, Estados Activos)
- `Primary-50`: `#f0f7f3` — Fondos de selección sutiles, hover en menús claros.
- `Primary-100`: `#dbeef1` — Contenedores de etiquetas y chips temáticos.
- `Primary-200`: `#b9ded3` — Bordes de tarjetas destacadas en modo claro.
- `Primary-300`: `#8ec4b3` — Acentos secundarios y líneas decorativas.
- `Primary-400`: `#5ea590` — Íconos secundarios y elementos gráficos.
- `Primary-500`: `#39856f` — Enlaces interactivos y badges deportivos.
- `Primary-600`: `#256a57` — Botones secundarios y textos con peso semántico.
- **`Primary-700`: `#1d5646`** — **Verde corporativo base (elementos de interfaz).**
- **`Primary-800`: `#123e30`** — **Identidad insignia de Altura Club (Topbars, Cards activas).**
- `Primary-900`: `#0b261e` — Canvas hero, encabezados de máxima jerarquía.
- `Primary-950`: `#061813` — Fondo oscuro profundo para escáner y terminales nocturnas.

#### 2. Acento: Lima Fluorescente / Athletic Chartreuse (Acciones Primarias, Feedback en Vivo)
- `Accent-100`: `#f5fce3` — Fondo de alerta de confirmación o beneficio.
- `Accent-200`: `#e9f9c0` — Fondo de badges VIP y tiquetes válidos.
- `Accent-300`: `#daf596` — Hover de botones lima en modo oscuro.
- **`Accent-400`: `#c9ef75`** — **Acento principal de acción (Botones CTA, Scanlines, Live Dots).**
- `Accent-500`: `#b3df53` — Hover de botón principal en modo claro.
- `Accent-600`: `#90ba35` — Bordes de foco para accesibilidad sobre fondo oscuro.
- `Accent-700`: `#6b8e24` — Texto de acento cuando se requiere contraste sobre blanco.

#### 3. Neutros y Superficies (Canvas, Paneles, Textos)
| Token | Modo Claro | Modo Oscuro | Uso UI |
| :--- | :--- | :--- | :--- |
| `Canvas` | `#f7f8f5` (Lino suave) | `#111815` (Obsidiana) | Fondo general de la aplicación. |
| `Surface` | `#ffffff` (Blanco puro) | `#18221d` (Grafito bosque) | Cards, contenedores, modales, barras. |
| `Surface-Soft` | `#f0f3ed` (Niebla marfil) | `#202d26` (Bosque elevado) | Fondos de inputs, chips inactivos, filas hover. |
| `Border` | `#e4e8e1` (Gris salvia) | `#2b3a31` (Borde nocturno) | Delimitador de tarjetas, inputs y tablas. |
| `Border-Focus` | `#1d6048` | `#c9ef75` | Anillo de enfoque de accesibilidad (Focus ring). |
| `Text-Title` | `#16241c` (Casi negro esmeralda) | `#f4f7f3` (Blanco hueso) | Títulos, precios y cifras numéricas. |
| `Text-Body` | `#334238` (Gris carbón) | `#d2ddd5` (Gris perla) | Párrafos, descripciones y textos largos. |
| `Text-Muted` | `#637368` (Salvia medio) | `#92a397` (Salvia nocturno) | Metadatos, etiquetas secundarias, timestamps. |

#### 4. Estados Semánticos
- **Success:** `#2e7d4d` (texto/borde) / `#edf7f0` (superficie clara) / `#173322` (superficie oscura).
- **Warning:** `#b07d1a` (texto/borde) / `#fdf9ec` (superficie clara) / `#332812` (superficie oscura).
- **Destructive:** `#c24339` (texto/borde) / `#faedeb` (superficie clara) / `#381c1a` (superficie oscura).
- **Info:** `#257494` (texto/borde) / `#edf6fa` (superficie clara) / `#142934` (superficie oscura).

---

### Escala Tipográfica Estandarizada (*Plus Jakarta Sans*)

| Nivel | Tamaño (Desktop) | Tamaño (Móvil) | Peso | Interlineado | Tracking | Aplicación |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Display** | 56px (`3.5rem`) | 38px (`2.375rem`) | 800 | 1.05 | `-0.05em` | Títulos principales de Hero Banner. |
| **H1** | 36px (`2.25rem`) | 28px (`1.75rem`) | 700 | 1.15 | `-0.04em` | Encabezados de páginas principales y confirmación. |
| **H2** | 26px (`1.625rem`) | 22px (`1.375rem`) | 700 | 1.25 | `-0.03em` | Títulos de sección, modales y tarjetas grandes. |
| **H3** | 18px (`1.125rem`) | 17px (`1.062rem`) | 650 | 1.35 | `-0.02em` | Títulos de tarjetas de servicios y métricas. |
| **H4** | 15px (`0.937rem`) | 15px (`0.937rem`) | 600 | 1.40 | `-0.01em` | Subtítulos de bloques y encabezados de listas. |
| **Body Large** | 16px (`1.0rem`) | 15px (`0.937rem`) | 400 / 500 | 1.60 | `0` | Párrafos introductorios y descripciones clave. |
| **Body Normal** | 14px (`0.875rem`) | 14px (`0.875rem`) | 400 / 500 | 1.55 | `0` | Textos generales, tablas y formularios. |
| **Body Small** | 13px (`0.812rem`) | 13px (`0.812rem`) | 450 | 1.50 | `0` | Descripciones secundarias y notas al pie. |
| **Label / Eyebrow**| 12px (`0.75rem`) | 11.5px (`0.718rem`)| 800 | 1.20 | `+0.10em`| Cejas en mayúsculas, tags y encabezados de tabla. |
| **Caption** | 12px (`0.75rem`) | 11.5px (`0.718rem`)| 500 | 1.35 | `+0.02em`| Sellos de tiempo, referencias y ayudas de input. |

---

### Sistema de Espaciado Modular (Base 4/8 px)
- `space-1` (4px): Micro-separaciones entre íconos y texto, o dentro de badges.
- `space-2` (8px): Gaps entre elementos compactos, franjas horarias y botones de grupo.
- `space-3` (12px): Espaciado interno en controles compactos, chips y tags.
- `space-4` (16px): Padding estándar para tarjetas secundarias, inputs y celdas de tabla.
- `space-5` (20px): Padding para tarjetas principales de dashboard y modales móviles.
- `space-6` (24px): Padding para modales de escritorio, espaciado entre secciones medianas.
- `space-8` (32px): Gaps de layout en grillas de catálogo y paneles laterales.
- `space-12` (48px): Separación entre bloques mayores de contenido.
- `space-16` (64px): Padding vertical de secciones en landing y banners principales.

---

### Reglas de Bordes, Radios y Sombras

#### Radios de Borde (*Border Radius*)
- `rounded-sm`: **6px** — Badges, botones de franjas horarias compactas, chips de selección.
- `rounded-md`: **10px** — Botones primarios, campos de entrada (`Input`), selects, dropdowns.
- `rounded-lg`: **16px** — Tarjetas de servicio, tarjetas de métricas, contenedores principales.
- `rounded-xl`: **22px** — Hero banners, modales de diálogo (`Dialog`/`Modal`), ticket card.
- `rounded-full`: **9999px** — Avatares, píldoras indicadoras de estado, botones circulares de ícono.

#### Sombras y Elevación (*Shadow System*)
- **Elevation 1 (Cards en reposo):**
  `box-shadow: 0 1px 2px rgba(18, 62, 48, 0.04), 0 4px 12px -2px rgba(18, 62, 48, 0.05);`
- **Elevation 2 (Hover en tarjetas / Dropdowns):**
  `box-shadow: 0 4px 8px -2px rgba(18, 62, 48, 0.06), 0 16px 32px -6px rgba(18, 62, 48, 0.10);`
- **Elevation 3 (Modales y Visores Flotantes):**
  `box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.15), 0 32px 64px -12px rgba(0, 0, 0, 0.25);`
- **Glow Accent (Elementos lima activos o en vivo):**
  `box-shadow: 0 0 0 3px rgba(201, 239, 117, 0.25), 0 4px 16px rgba(201, 239, 117, 0.35);`

---

## 5. Rediseño por Pantalla y Componente

### 5.1. Página de Inicio / Landing (`/`)
- **Estado Actual:** Hero fotográfico imponente con gradientes esmeralda. Las cuatro tarjetas de categoría inferiores son simples cajas con fondo claro e ícono. La sección de "¿Cómo funciona?" tiene conectores punteados correctos pero austeros.
- **Qué Mantener:** El hero banner con su fotografía de fondo, titular display, stack de avatares de prueba social y píldora flotante con *live-dot*.
- **Qué Simplificar / Reorganizar:** En la grilla de categorías (`.category-grid`), sustituir los fondos planos por una sutil microfotografía temática por deporte (tenis, pádel, piscina, gimnasio) oscurecida al 85% con un marco nítido que reacciona con zoom al hover.
- **Aspecto Propuesto:** Secciones divididas por ritmo visual (Hero oscuro $\rightarrow$ Catálogo claro con tarjetas ricas $\rightarrow$ Franja CTA verde esmeralda profundo).
- **Adaptación Responsive:** En móvil (375px), el grid pasa a 1 columna o carrusel horizontal con snap, y los avatares se alinean bajo el botón CTA principal.
- **Prioridad:** **Alta**.

---

### 5.2. Catálogo de Categorías (`/services` y `/services/[category]`)
- **Estado Actual:** Banner intermedio de 270px con badge flotante y grilla de canchas/espacios. En las cards individuales se muestran tags de "Disponible" o "No disponible".
- **Qué Mantener:** El banner temático y la estructura de tarjeta con foto superior y ficha técnica inferior.
- **Qué Simplificar / Reorganizar:** Las tarjetas inactivas (`.catalog-card-off`) tienen actualmente `opacity: .6` uniforme que las hace lucir rotas. Deben tener un badge sobrio "Próximamente" o "Mantenimiento" con overlay monocromático elegante.
- **Aspecto Propuesto:** Cards con relación de aspecto 16:10 para las fotos, precio destacado en `$XX.000 COP / hora` en tipografía semibold, y botón "Reservar turno" integrado directamente en la tarjeta al hacer hover en desktop.
- **Adaptación Responsive:** 3 columnas en desktop (>1100px), 2 columnas en tablet (768px-1024px), 1 columna fluida con padding lateral de 16px en móvil (<640px).
- **Prioridad:** **Alta**.

---

### 5.3. Detalle de Reserva y Selección de Horarios (`/services/[category]/[id]`)
- **Estado Actual:** Layout de dos columnas (60% calendario/horarios, 40% resumen pegajoso *sticky*). Los días de la semana son botones cuadrados y los horarios botones en grilla de 4 columnas.
- **Qué Mantener:** La disposición de dos columnas con el panel de resumen a la derecha y los badges de validación de servicio.
- **Qué Simplificar / Reorganizar:** Los botones de días (`.day-choice`) deben tener un estado de selección más refinado (reemplazar el fondo plano `#1d6048` por un borde activo de 2px en verde esmeralda y el día resaltado con un punto lima brillante inferior). Las franjas horarias deshabilitadas deben usar línea sutil y no tachado abrupto.
- **Aspecto Propuesto:** Interfaz inspirada en *Airbnb Experiences* o *Resy*: calendario tipo tira horizontal con scroll táctil suave, slots agrupados por mañana, tarde y noche, y panel resumen con desglose transparente de tarifa y políticas de cancelación.
- **Adaptación Responsive:** En móvil, el resumen se convierte en una barra flotante inferior fija (*bottom bar*) con precio a la izquierda y botón "Continuar" a la derecha, liberando la pantalla para elegir la hora cómodamente.
- **Prioridad:** **Crítica**.

---

### 5.4. Pasarela de Pago y Confirmación (`/checkout` y `/confirmation`)
- **Estado Actual:** Excelente avance con la tarjeta interactiva de crédito y selector multicanal. En confirmación, pase troquelado con código QR.
- **Qué Mantener:** La tarjeta visual interactiva con chip, el modal de procesamiento animado en 3 etapas y el pase digital troquelado.
- **Qué Simplificar / Reorganizar:** En `/checkout`, el selector de pestañas (Tarjeta, PSE, Nequi, Sede) debe tener íconos más refinados y una indicación de tiempo estimado de acreditación ("Inmediato", "En recepción"). En `/confirmation`, unificar el tamaño de los botones de acción ("Ir a mis tiquetes" y "Volver al inicio").
- **Aspecto Propuesto:** Experiencia de compra de nivel bancario suizo/fintech moderna: inputs con máscara dinámica de formato, micro-badge de seguridad SSL de 256 bits y comprobante imprimible con botón rápido de "Guardar en Apple Wallet / Google Wallet" (simulado visualmente).
- **Adaptación Responsive:** En móvil, la tarjeta bancaria visual se escala fluidamente a un ancho máximo de 320px manteniendo la tipografía monospace nítida.
- **Prioridad:** **Alta**.

---

### 5.5. Panel de Control del Cliente y Tiquetes (`/dashboard` y `/tickets`)
- **Estado Actual:** Bienvenida personalizada, tarjeta de próxima cita y grilla de accesos rápidos. En `/tickets`, lista de tiquetes con badge de estado.
- **Qué Mantener:** El avatar con iniciales, el badge de rol y el aislamiento de privacidad por cliente.
- **Qué Simplificar / Reorganizar:** En `/dashboard`, el bloque de próxima cita (`.dashboard-appointment`) tiene actualmente un gradiente verde claro que contrasta poco con el texto en modo claro. Debe transformarse en una card hero con fondo esmeralda sutil o borde perimetral acentuado.
- **Aspecto Propuesto:** Tarjetas de tiquete con código QR miniatura visible a la derecha, botón desplegable de "Ver detalles de acceso" y barra de estado de vigencia (*Vigente*, *Utilizado*, *Expirado*).
- **Adaptación Responsive:** Grilla de 2 columnas en desktop, 1 columna en móvil con espaciado vertical de 14px.
- **Prioridad:** **Media**.

---

### 5.6. Módulo Administrativo y Métricas (`/admin/*`)
- **Estado Actual:** Sidebar blanco (o grafito oscuro en dark mode), topbar con tema interactivo, 4 tarjetas métricas con sparklines, gráfico de barras, gráfico donut de ocupación y tabla de reservas.
- **Qué Mantener:** La distribución espacial general, el donut chart de ocupación y la persistencia de dark mode.
- **Qué Simplificar / Reorganizar:** 
  1. Aumentar el padding de las tarjetas de métricas (`.metric-card`) de 13px a 20px.
  2. Sustituir los sparklines de barras estáticas por un trazo vectorial suave con área sombreada.
  3. En la tabla de reservas, reemplazar los botones grises pequeños por un menú de acciones compacto o botones con tooltips visuales claros.
  4. En el modal de inspección (`.form-modal`), aumentar el tamaño del código QR a 140x140px centrado sobre un pedestal marfil/obsidiana.
- **Aspecto Propuesto:** Dashboard con estética *Stripe / Linear*: números grandes en tipografía semibold, gráficos con tooltips al hover que muestran cifras exactas, y tablas con zebra-striping tenue opcional y hover reactivo.
- **Adaptación Responsive:** En tablet (768px-1024px), el sidebar se colapsa a modo compacto con íconos o drawer lateral accesible mediante botón hamburguesa. En móvil, las tablas cuentan con desplazamiento horizontal suave y columnas clave fijas.
- **Prioridad:** **Crítica**.

---

### 5.7. Escáner de Acceso y POS (`/scanner` y `/pos`)
- **Estado Actual:** El escáner cuenta con visor de cámara WebRTC en vivo, marco de esquinas lima y audio feedback. El POS tiene split screen de catálogo y orden.
- **Qué Mantener:** El visor tecnológico dark mode en el escáner, los chimes de audio sintetizados y la tarjeta interactiva de resultados con badge `VÁLIDO` / `YA USADO`.
- **Qué Simplificar / Reorganizar:** En el escáner, organizar la barra inferior de controles de cámara en un grupo integrado (Cámara on/off + Selector lente + Toggle sonido) con estética de barra de herramientas flotante (*floating dock*). En `/pos`, pulir el resumen del carrito con separadores de línea punteada y botón de cobro verde esmeralda prominente.
- **Aspecto Propuesto:** Terminal de taquilla de grado industrial táctil: botones grandes de 48px con retroalimentación háptica/visual inmediata.
- **Adaptación Responsive:** Visor maximizado en móvil manteniendo accesibles los botones manuales sin scroll forzado.
- **Prioridad:** **Alta**.

---

## 6. Plan de Implementación UI

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PLAN DE EVOLUCIÓN VISUAL (UI)                         │
├──────────────────┬──────────────────┬──────────────────┬────────────────────┤
│     FASE 1       │     FASE 2       │     FASE 3       │      FASE 4        │
│   Quick Wins &   │ Estandarización  │  Rediseño de     │   Consolidación    │
│  Micro-Alineación│  de Componentes  │ Pantallas Clave  │   Design System    │
│  (Tokens y CSS)  │  y Elevaciones   │ (Hero, Catálogo) │ (Figma & Tokens)   │
└──────────────────┴──────────────────┴──────────────────┴────────────────────┘
```

### Fase 1: Ajustes Rápidos de Alto Impacto Visual (Quick Wins)
- **Tarea 1.1: Estandarización de Border-Radius en CSS**
  - *Cambio Visual:* Reemplazar los valores dispersos (`7px`, `9px`, `11px`, `13px`) por las variables `--radius-sm: 6px`, `--radius-md: 10px`, `--radius-lg: 16px`, `--radius-xl: 22px`.
  - *Archivo:* `apps/web/src/app/globals.css`.
  - *Prioridad:* Crítica | *Esfuerzo:* Bajo | *Impacto:* Alto.
  - *Dependencia:* Ninguna.

- **Tarea 1.2: Implementación de la Escala de Sombras Ambientales**
  - *Cambio Visual:* Sustituir la sombra plana única `--shadow` por el sistema de dos capas `--shadow-card` y `--shadow-float` con matiz esmeralda.
  - *Archivo:* `apps/web/src/app/globals.css`.
  - *Prioridad:* Alta | *Esfuerzo:* Bajo | *Impacto:* Alto.
  - *Dependencia:* Ninguna.

- **Tarea 1.3: Pulido de Paddings en Métricas de Administración**
  - *Cambio Visual:* Incrementar padding de `.metric-card` a 20px y espaciar los indicadores numéricos respecto a los sparklines.
  - *Archivo:* `apps/web/src/app/globals.css` (`.metric-card`).
  - *Prioridad:* Alta | *Esfuerzo:* Bajo | *Impacto:* Alto.
  - *Dependencia:* Ninguna.

---

### Fase 2: Consistencia de Componentes y Elevación
- **Tarea 2.1: Homogeneización de Botones Interactivos**
  - *Cambio Visual:* Migrar clases manuales (`.action-button`, `.camera-btn`, `.google-button`) a variantes canónicas del componente `@sportcomplex/ui` `Button` con altura mínima de 44px o 48px y transiciones `ease-out`.
  - *Archivos:* `packages/ui/src/components/button.tsx`, vistas de `checkout`, `login`, `scanner`.
  - *Prioridad:* Alta | *Esfuerzo:* Medio | *Impacto:* Alto.
  - *Dependencia:* Fase 1 (radios y sombras).

- **Tarea 2.2: Rediseño del Drawer de Navegación Móvil**
  - *Cambio Visual:* Aplicar esquinas redondeadas inferiores (`16px`), `backdrop-filter: blur(16px)` y espaciado generoso entre enlaces en `.mobile-nav`.
  - *Archivo:* `apps/web/src/app/globals.css` (`.mobile-nav`).
  - *Prioridad:* Media | *Esfuerzo:* Bajo | *Impacto:* Medio.
  - *Dependencia:* Ninguna.

- **Tarea 2.3: Unificación de Badges y Etiquetas de Estado**
  - *Cambio Visual:* Reemplazar `.ticket-status`, `.reservation-status` y `.catalog-status` por el componente `Badge` con variantes normadas (`success`, `warning`, `destructive`, `outline`).
  - *Archivos:* `packages/ui/src/components/badge.tsx`, vistas administrativas y de cliente.
  - *Prioridad:* Media | *Esfuerzo:* Medio | *Impacto:* Medio.
  - *Dependencia:* Ninguna.

---

### Fase 3: Mejora de Layouts y Pantallas Principales
- **Tarea 3.1: Enriquecimiento Visual de Cards de Catálogo**
  - *Cambio Visual:* Incorporar fotografías temáticas de fondo para las 4 categorías principales en `/services`, con filtro oscuro al 40% y tipografía blanca de alto contraste.
  - *Archivos:* `apps/web/src/app/(customer)/services/page.tsx`, `globals.css`.
  - *Prioridad:* Alta | *Esfuerzo:* Medio | *Impacto:* Muy Alto.
  - *Dependencia:* Assets de imagen deportiva.

- **Tarea 3.2: Barra Flotante Inferior en Móvil para Detalle de Reserva**
  - *Cambio Visual:* En pantallas <640px, convertir el resumen de reserva en un *sticky bottom sheet* con precio y botón de confirmación directo.
  - *Archivo:* `apps/web/src/app/(customer)/services/[category]/[id]/page.tsx`.
  - *Prioridad:* Crítica | *Esfuerzo:* Medio | *Impacto:* Alto.
  - *Dependencia:* Ninguna.

- **Tarea 3.3: Reorganización del Toolbar de Cámara en Taquilla**
  - *Cambio Visual:* Agrupar los controles de escáner en un dock flotante oscuro con acentos lima integrados (`.camera-controls-bar`).
  - *Archivo:* `apps/web/src/app/(staff)/scanner/page.tsx`.
  - *Prioridad:* Media | *Esfuerzo:* Bajo | *Impacto:* Medio.
  - *Dependencia:* Ninguna.

---

### Fase 4: Consolidación y Documentación del Design System
- **Tarea 4.1: Centralización de Tokens CSS en Variables Semánticas Únicas**
  - *Cambio Visual:* Asegurar que ningún componente utilice valores hexadecimales *hardcodeados*; todo color, radio o sombra debe apuntar a tokens semánticos `--color-*`, `--radius-*`, `--shadow-*`.
  - *Archivos:* `apps/web/src/app/globals.css`, `packages/ui`.
  - *Prioridad:* Media | *Esfuerzo:* Alto | *Impacto:* Alto (mantenibilidad a largo plazo).
  - *Dependencia:* Fases 1, 2 y 3.

- **Tarea 4.2: Catálogo de Componentes Interactivo (Storybook / Demo UI)**
  - *Cambio Visual:* Documentación de todos los estados (hover, active, focus, disabled, loading, selected) de botones, inputs, cards y badges para garantizar consistencia en desarrollos futuros.
  - *Prioridad:* Baja | *Esfuerzo:* Medio | *Impacto:* Medio.
  - *Dependencia:* Fase 4.1.

---

## 7. Top 10 Mejoras Prioritarias

1. **Estandarizar el sistema de radios de borde a 4 tokens estrictos (`6px`, `10px`, `16px`, `22px`):** Erradica la dispersión actual de 10 valores distintos y otorga cohesión arquitectónica inmediata.
2. **Implementar sombras ambientales de dos niveles con tinte bosque (`#123e30`):** Elimina la sensación plana en modo claro y aporta una profundidad táctil moderna y orgánica.
3. **Optimizar la densidad y espaciado de las tarjetas métricas en el panel administrativo:** Subir padding a `20px` y separar las cifras para un aspecto ejecutivo tipo *Stripe / Linear*.
4. **Incorporar imágenes fotográficas de fondo con viñeta esmeralda en las 4 cards principales de `/services`:** Transforma un catálogo abstracto en una experiencia aspiracional de club campestre.
5. **Implementar barra fija inferior (*sticky bottom bar*) para reservas en móvil:** Facilita la elección de turnos en pantallas pequeñas sin obligar al usuario a desplazarse continuamente hasta el final de la página.
6. **Unificar todos los botones de la plataforma bajo el componente `@sportcomplex/ui` `Button`:** Homogeniza alturas (mínimo 44px), paddings, pesos tipográficos y microinteracciones de hover/press.
7. **Refinar el drawer de navegación móvil (`.mobile-nav`) con esquinas redondeadas y `backdrop-filter: blur(16px)`:** Transmite sensación de aplicación nativa moderna en dispositivos móviles.
8. **Estandarizar la altura y centrado de la barra superior administrativa (`.admin-topbar`) en 64px:** Armoniza la proporción de encabezados entre la experiencia de cliente y la de staff/administración.
9. **Centralizar los badges y chips de estado en el componente `@sportcomplex/ui` `Badge`:** Elimina estilos dispersos y estandariza los indicadores luminosos de estado (*live dots*).
10. **Refinar el estado vacío (*empty state*) en `/dashboard` con ilustración geométrica tenue y CTA inspiracional:** Convierte un contenedor con borde punteado de aspecto preliminar en una invitación cordial a disfrutar de las instalaciones del club.

---

*Fin del informe de auditoría visual.*
