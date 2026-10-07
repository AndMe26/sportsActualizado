1. Qué podemos extraer de cada referencia
🎾 1. Lacoste — Roland Garros (members-play.lacoste.com)
Inspiración: Tradición de club campestre, canchas de polvo de ladrillo/pasto sintético y elegancia deportiva francesa.

Líneas de Cancha como Divisores Estructurales:
Idea visual: En lugar de usar divisores grises genéricos (border-top: 1px solid #e5e7eb), podemos usar líneas blancas o verde tiza muy finas (1px) que emulen el trazado perimetral de una cancha de tenis o pádel.
Dónde aplicarlo: En la ficha de detalle de servicio (/services/[category]/[id]) y en el fondo del pase digital (/confirmation).
Sport Card Flip & Reveal:
Idea interactiva: Al pasar el cursor sobre la tarjeta de una cancha en /services/canchas, la tarjeta puede realizar una micro-rotación en 3D (perspective: 1000px) o deslizar una capa inferior que revela las especificaciones técnicas: Tipo de suelo (Polvo de ladrillo / Sintético techado), Iluminación LED, Rebote oficial, Capacidad.
Paleta Cromática Idéntica:
Lacoste combina el verde bosque oscuro (#0c3323), el blanco tiza y el acento lima de las pelotas de tenis (#c9ef75). Valida que la dirección de color de Altura Club es 100% acertada en el sector deportivo de lujo.
⚡ 2. The Grind (thegrind.nl)
Inspiración: Brutalismo atlético boutique, alta energía y disciplina moderna.

Marquee / Ticker Cinético en Movimiento Infinito:
Idea visual: Una franja delgada de texto en mayúsculas que se desliza horizontalmente de forma continua (infinite marquee).
Texto sugerido: TORNEO DE PÁDEL NOCTURNO · ZONA HÚMEDA DISPONIBLE · RESERVA CANCHA 2 · EXPERIENCIA EXCLUSIVA EL POBLADO ·.
Dónde aplicarlo: Justo debajo del hero principal de la home (/) o en la parte superior del módulo de escáner en taquilla (/scanner).
Números de Métricas en Gran Escala (Display Impact):
Idea visual: Las cifras principales (tiempo restante de reserva, puntuación, ocupación del 76%) usan tipografía muy grande (text-4xl o text-5xl), peso 800 y una pequeña píldora flotante con la unidad (COP, %, MIN).
Dónde aplicarlo: En las tarjetas métricas del admin (/admin) y en el contador de próxima cita del cliente (/dashboard).
Bordes con Shimmer / Resplandor al Hover:
Idea visual: Al hacer hover sobre una tarjeta de membresía o servicio, el borde no solo cambia de color, sino que un gradiente luminoso lima recorre el perímetro sutilmente.
🌊 3. Wave Run Media (waverunmedia.com)
Inspiración: Microinteracciones fluidas, profundidad cinemática y suavidad de estudio creativo.

Botones con Efecto Magnético y Presión Táctil:
Idea interactiva: Al pasar el cursor cerca de los botones principales (Reservar ahora, Pagar y confirmar), el botón tiene una micro-atracción hacia el puntero y, al hacer click, se comprime suavemente (active:scale-[0.97] con transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)).
Parallax y Zoom Contenido en Fotografía:
Idea visual: Las fotos de las canchas y piscinas tienen un contenedor con overflow-hidden. Al entrar en viewport o hacer hover, la imagen escala de scale-100 a scale-105 con una transición lenta y lujosa (duration-700 ease-out).
Aparición Escalonada de Contenido (Staggered Fade-Up):
Idea visual: Al cargar /checkout o /confirmation, los elementos no aparecen de golpe; el resumen, el método de pago y el total emergen con 60ms de desfase entre cada uno (translate-y-4 opacity-0 $\rightarrow$ translate-y-0 opacity-100).
🏔️ 4. Alpine Guides (alpineguides.co.nz)
Inspiración: Sentido de "Altura", naturaleza campestre, meteorología y aventura estructurada.

Píldoras de Estado y Clima en Tiempo Real (Live Conditions):
Idea visual: En la barra superior o en el hero de las canchas de tenis al aire libre:
☀️ 23°C · Poblado
🎾 Pistas Secas · Juego Óptimo
💡 Iluminación Nocturna Activa
Por qué encaja: Conecta el software con el mundo físico del complejo deportivo al aire libre.
Ficha Técnica Modular con Iconografía Deportiva:
Idea visual: Bloques estructurados en cuadrícula limpia para cada espacio:
Superficie: Polvo de ladrillo.
Formato: Singles / Dobles.
Disponibilidad: Inmediata.
Equipamiento: Incluye raquetas de préstamo y bolas presurizadas.
2. Catálogo de Animaciones Concretas listas para Tailwind
Para cuando pasemos a producción y redactemos el system_design.md, estas son las animaciones que podemos declarar en la configuración de Tailwind:

ts
// tailwind.config.ts (Previsualización de arquitectura)
export default {
  theme: {
    extend: {
      keyframes: {
        // 1. Ticker infinito estilo The Grind
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // 2. Destello de borde estilo Roland Garros / Wave Run
        'border-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // 3. Pulso sutil para sensores y pases activos
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.96)' },
        },
        // 4. Entrada suave de modales y tarjetas
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'border-shimmer': 'border-shimmer 3s ease infinite',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fade-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    }
  }
}
3. Consideraciones para el futuro system_design.md con Tailwind CSS
Teniendo en cuenta que este proyecto sirve de prototipo/mockup y la versión de producción se construirá sobre Tailwind CSS:

Tokens de Color Semánticos:
Mapear la paleta de Altura Club a clases Tailwind (bg-brand-primary, bg-brand-accent, text-brand-forest, border-brand-border), permitiendo que el modo oscuro sea un simple modificador dark:bg-brand-canvasDark.
Componentes con CVA (Class Variance Authority):
Estandarizar botones, inputs, cards y badges utilizando cva y tailwind-merge (cn), asegurando que todos los efectos de hover y focus hereden las mismas curvas de aceleración (ease-out).
Optimización de Animaciones:
Priorizar animaciones basadas exclusivamente en propiedades GPU (transform y opacity) para garantizar 60 fps constantes en dispositivos móviles y lectores de escáner.
Modo Reducido de Movimiento (motion-safe y motion-reduce):
Incorporar soporte nativo de accesibilidad para pausar tickers o zooms si el usuario tiene activada la preferencia de movimiento reducido en su sistema operativo.

---

## 4. Pantalla de Carga Cinemática (Preloader / Splash) e Intro de Palabras (*The Grind*)

### A. Preloader de Entrada (Splash Screen)
- **Concepto Visual:** Al ingresar a la plataforma, se presenta una pantalla de bienvenida inmersiva sobre lienzo oscuro bosque (`#091b13`) con microtextura analógica de vinilo / arruga ténue.
- **Isotipo / Badge Central:**
  - Una tarjeta central con bordes redondeados (`rounded-2xl`) que contiene una ventana dinámica en bucle con destellos de video o gradientes fluidos esmeralda/lima.
  - El isotipo oficial de **AKROS** (`Akros-logo.png`) centrado con relieve volumétrico, retroiluminación esmeralda y destellos de energía deportiva.
  - Barra de progreso delgada de 2px en verde lima (`#c9ef75`) que avanza fluidamente del 0% al 100% en 1.2 segundos con opción de clic para omitir.
- **Transición de Salida (Reveal):** La pantalla de carga se desvanece suavemente hacia arriba (`translate-y-[-100%]` o `opacity-0 scale-[1.03]` con `duration-700 ease-out`), revelando el hero principal.
- **Persistencia Inteligente:** Se ejecuta una vez por sesión mediante `sessionStorage` para no entorpecer la navegación interna repetitiva.

### B. Efecto Word Blur-Fade en Tipografía (*The Grind*)
- **Concepto:** Las palabras de los titulares clave no aparecen como un bloque plano, sino que emergen palabra por palabra con un sutil desenfoque y desplazamiento vertical:
  - Estado inicial: `opacity: 0; filter: blur(10px); transform: translateY(18px);`
  - Estado final: `opacity: 1; filter: blur(0px); transform: translateY(0);`
  - Duración y desfase: `transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1)`, con un retraso escalonado de `80ms` entre cada palabra (`"Tu" -> "mejor" -> "versión" -> "empieza" -> "aquí"`).

---

## 5. Aparición Escalonada de Cards y Secciones al Scroll (*Wave Run & Alpine Guides*)

### A. Staggered Scroll Entrance (*Wave Run Media*)
- **Comportamiento:** A medida que el usuario hace scroll y una sección entra en el viewport (mediante `IntersectionObserver` o Framer Motion / CSS nativo):
  - El contenedor de la sección activa una clase `.is-visible`.
  - Las tarjetas hijas (cards de servicios, beneficios, testimonios) emergen en cascada con un desfase secuencial:
    - Tarjeta 1: `delay-0`
    - Tarjeta 2: `delay-100`
    - Tarjeta 3: `delay-200`
    - Tarjeta 4: `delay-300`
  - Efecto cinemático: Pasan de `translate-y-8 scale-[0.97] opacity-0` a `translate-y-0 scale-100 opacity-100`.

### B. Showcase Deslizable de Espacios Destacados (*Featured Trips - Alpine Guides*)
- **Estructura:** Formato de vitrina interactiva con tarjetas anchas que muestran una fotografía panorámica de alta resolución de la cancha, píldora de disponibilidad en tiempo real (*"2 turnos hoy"*), chips de características técnicas y botón de reserva directa.
- **Indicador de Progreso:** Barra de desplazamiento delgada en la base con acento lima neón que indica la posición dentro del catálogo.

---

## 6. Contador Animado de Métricas en Vista Admin (*Alpine Guides*)

### A. Rolling Numbers / Count-Up Effect
- **Concepto:** Al acceder al panel de administración (`/admin`), las cifras numéricas no aparecen estáticas:
  - Los ingresos totales crecen fluidamente desde `$0` hasta `$14.280.000 COP`.
  - El porcentaje de ocupación se incrementa de `0%` a `76%`.
  - El contador de reservas avanza de `0` a `142 reservas`.
- **Implementación Matemática:** Función de interpolación con curva desacelerada `easeOutExpo` en un intervalo de 1.4 segundos:
  ```ts
  const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  ```
- **Sincronización:** El gráfico donut de ocupación y los sparklines se animan en paralelo al crecimiento de las cifras.

---

## 7. Masterplan de Rediseño de la Home: Contenidos de Alto Valor

Para transformar la página de inicio en un portal de club privado de categoría internacional, se propone la siguiente arquitectura editorial de 9 secciones estratégicas:

1. **Preloader Cinemático de Bienvenida:** Splash screen con isotipo y destello de energía deportiva (1.2s en primera carga).
2. **Hero de Alto Impacto con Word Blur-Fade:** 
   - Titular cinemático desglosado en palabras flotantes.
   - Píldoras de condiciones en vivo: `☀️ 23°C · El Poblado` + `🎾 Pistas Secas · Juego Óptimo`.
   - CTAs duales: *"Reservar turno hoy"* (botón primario lima) y *"Membresías del Club"* (botón secundario con efecto magnético).
   - Prueba social con avatares de socios reales y rating 4.9/5.
3. **Athletic Kinetic Marquee (Ticker Infinito):** Cinta continua de noticias y estados del club (*Torneo nocturno, piscina climatizada, turnos hoy*).
4. **Showcase Interactivo de Instalaciones («El Complejo Deportivo»):**
   - Selector por pestañas: *Tenis Polvo de Ladrillo* | *Pádel Panorámico* | *Piscina Semiolímpica* | *Gimnasio Pro* | *Zona Wellness*.
   - Tarjetas panorámicas con zoom cinemático, ficha de especificaciones técnicas (superficie, iluminación, capacidad) y botón de reserva inmediata.
5. **Membresías & Planes de Acceso («Elige tu Experiencia»):**
   - Comparativa de 3 niveles:
     - **Pase Diario (Drop-in):** Para jugadores ocasionales sin cuota mensual.
     - **Membresía Active Club (Recomendada):** Acceso preferente, 15% de descuento en alquileres, reserva con 7 días de anticipación.
     - **Membresía Black / Pro:** Reserva prioritaria de 14 días, lockers privados, acceso ilimitado a zona húmeda y torneos exclusivos.
6. **Agenda de Torneos & Eventos Sociales («Vida en el Club»):**
   - Próximos eventos con fecha, hora y plazas restantes (e.g. *Torneo Relámpago de Pádel Viernes 7PM*, *Clínica de Tenis de Saque & Volea*, *Sunset Yoga & Wellness*).
   - Genera sentido de comunidad y pertenencia, superando el concepto de un mero software de alquiler.
7. **La Experiencia del Tercer Tiempo (Gastronomía & Lounge):**
   - Mención fotográfica al *Sports Bar & Café Saludable* (smoothies de proteína post-entreno, terraza social y coworking deportivo).
8. **Pase Digital en la Palma de tu Mano (Tecnología & Acceso):**
   - Mockup visual de smartphone mostrando el pase QR digital sin contacto, validado en los torniquetes de acceso con el escáner de taquilla.
9. **Testimonios de Atletas & Socios + Footer Institucional:**
   - Reseñas con nombre, deporte practicado y tiempo como socio.
   - Footer con horarios de apertura de ambas sedes (Poblado & Laureles), mapa de ubicación, contacto WhatsApp de conserjería y credenciales de seguridad.