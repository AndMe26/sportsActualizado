Aunque esto es un mockup, quiero que realices una auditoría integral, estricta y profunda del proyecto actual. Analiza directamente el código, la estructura de componentes, las pantallas, los flujos de navegación, los estilos, los assets y cualquier elemento disponible en el repositorio. De esta manera cuando el proyecto pase a ser un producto real, tendremos una base sólida para seguir mejorando.

No quiero una evaluación superficial ni comentarios genéricos. Quiero que actúes como una combinación de:

- UX Researcher senior
- UI Designer senior
- Product Designer
- Front-end developer especializado en interfaces
- Experto en accesibilidad web (WCAG)
- Especialista en responsive design
- Revisor de calidad para productos digitales profesionales

Tu objetivo es determinar con criterio crítico qué tan sólido está actualmente el proyecto a nivel de UX/UI, qué problemas tiene, qué oportunidades existen y qué cambios deben priorizarse para llevarlo a un nivel profesional.

## Contexto y enfoque

Antes de dar recomendaciones, inspecciona el proyecto completo y comprende:

- El objetivo probable del producto o aplicación
- El tipo de usuario al que parece estar dirigido
- Las tareas principales que un usuario debería poder completar
- La estructura de navegación actual
- La jerarquía de pantallas, secciones y componentes
- El sistema visual existente: colores, tipografías, espaciados, iconos, botones, tarjetas, formularios, tablas, modales, estados de carga, etc.
- La experiencia en desktop, tablet y móvil, según el código y los estilos disponibles
- La calidad de implementación de la interfaz desde el punto de vista técnico y visual

Si falta contexto funcional o de negocio, indícalo claramente, pero realiza igualmente la evaluación basándote en las mejores prácticas de diseño de productos digitales.

## Áreas obligatorias de análisis

Evalúa cada área de forma independiente y con profundidad:

### 1. UX y usabilidad

Analiza:

- Claridad de la propuesta de valor y del propósito de cada pantalla
- Facilidad para entender qué puede hacer el usuario
- Jerarquía de acciones principales y secundarias
- Flujos de navegación y posibles puntos de confusión
- Cantidad de pasos necesarios para completar acciones importantes
- Consistencia entre pantallas y componentes
- Claridad de textos, etiquetas, botones, mensajes y llamadas a la acción
- Prevención de errores y recuperación ante errores
- Estados vacíos, estados de carga, estados de éxito, errores y casos límite
- Feedback visual tras acciones del usuario
- Formularios: orden, validación, ayudas, placeholders, errores y confirmaciones
- Posibles fricciones, ambigüedades o decisiones que aumenten la carga cognitiva
- Aplicación de heurísticas de Nielsen
- Percepción de confianza, claridad y control por parte del usuario

### 2. UI y diseño visual

Analiza:

- Jerarquía visual
- Composición de cada pantalla
- Uso de espacios en blanco
- Alineación y distribución de elementos
- Escala tipográfica, pesos, tamaños, interlineado y legibilidad
- Paleta de colores, contraste y coherencia semántica
- Uso de bordes, sombras, fondos y elevación visual
- Diseño de botones, inputs, tarjetas, tablas, badges, tabs, dropdowns, modales y otros componentes
- Consistencia de iconos y elementos gráficos
- Diferenciación clara entre elementos interactivos y decorativos
- Densidad visual: detectar pantallas sobrecargadas, vacías o desequilibradas
- Calidad percibida: identificar elementos que hagan que la interfaz parezca amateur, inconsistente o poco pulida
- Existencia o ausencia de un sistema de diseño consistente

### 3. Responsive design

Evalúa específicamente el comportamiento en:

- Móvil: aproximadamente 320 px a 480 px
- Tablet: aproximadamente 768 px a 1024 px
- Desktop: 1280 px en adelante

Busca problemas como:

- Overflow horizontal
- Textos cortados o difíciles de leer
- Botones demasiado pequeños o difíciles de tocar
- Componentes que no se adapten al ancho disponible
- Grids que se rompan o tengan demasiadas columnas
- Tablas que no funcionen en móvil
- Navegación poco usable en pantallas pequeñas
- Modales, menús, formularios o paneles laterales con mala adaptación
- Falta de prioridades de contenido en móvil
- Breakpoints incoherentes o estilos duplicados innecesariamente

Indica cómo debería comportarse cada tipo de componente importante según el tamaño de pantalla.

### 4. Accesibilidad

Evalúa el proyecto tomando como referencia WCAG 2.2 nivel AA cuando sea posible.

Revisa:

- Contraste de color en texto, botones, iconos y estados
- Tamaño y legibilidad del texto
- Navegación completa con teclado
- Focus visible y consistente
- Orden lógico de tabulación
- Uso correcto de HTML semántico
- Uso adecuado de headings y jerarquía de encabezados
- Labels reales para campos de formulario
- Mensajes de error comprensibles y asociados a los inputs correctos
- Uso de ARIA únicamente cuando sea necesario y de forma correcta
- Textos alternativos para imágenes relevantes
- Botones o enlaces sin nombre accesible
- Elementos interactivos demasiado pequeños
- Información que dependa únicamente del color
- Animaciones excesivas o sin consideración por `prefers-reduced-motion`
- Compatibilidad con lectores de pantalla, cuando pueda inferirse desde el código

### 5. Calidad de implementación de UI

Revisa la calidad del código relacionado con la interfaz:

- Reutilización de componentes
- Componentes demasiado grandes, difíciles de mantener o con responsabilidades mezcladas
- Estilos repetidos o inconsistentes
- Valores hardcodeados repetidos de colores, tamaños, márgenes, radios o sombras
- Falta de tokens de diseño o variables reutilizables
- Estructura de carpetas y nomenclatura de componentes
- Manejo de variantes de componentes
- Uso correcto de estados `hover`, `focus`, `active`, `disabled`, `loading`, `error` y `empty`
- Posibles problemas de rendimiento visual o renderizados innecesarios
- Dependencias de UI que estén mal utilizadas o puedan simplificarse
- Oportunidades para crear o mejorar un design system escalable

## Formato obligatorio de respuesta

Organiza tu respuesta exactamente con esta estructura:

### 1. Resumen ejecutivo

Incluye:

- Una calificación general de UX/UI de 1 a 10
- Una calificación individual para UX, UI, accesibilidad, responsive design y consistencia
- Qué está bien resuelto actualmente
- Los riesgos o problemas más graves
- Una conclusión honesta sobre si el producto se siente básico, intermedio, avanzado o listo para producción profesional

### 2. Hallazgos detallados

Crea una tabla con estas columnas:

| Área | Problema detectado | Severidad | Evidencia en el proyecto | Impacto en el usuario | Recomendación concreta |
|------|-------------------|-----------|--------------------------|-----------------------|------------------------|

Usa estos niveles de severidad:

- Crítico: bloquea tareas, perjudica seriamente la accesibilidad o genera una experiencia deficiente
- Alto: afecta notablemente la comprensión, la confianza, la conversión o el uso recurrente
- Medio: reduce calidad, consistencia o comodidad, pero no bloquea una tarea
- Bajo: mejora de pulido, estética o mantenibilidad

No inventes problemas. Si no puedes comprobar algo desde el repositorio, indícalo como una hipótesis o una validación pendiente.

### 3. Mejoras prioritarias

Divide las mejoras en tres grupos:

#### Cambios obligatorios

Incluye los problemas críticos y altos que deberían corregirse antes de considerar el proyecto listo para producción.

#### Mejoras recomendadas

Incluye cambios que elevarían notablemente la calidad de UX/UI, aunque no bloqueen el uso actual.

#### Mejoras de alto nivel

Incluye propuestas para llevar el producto a un nivel más profesional, escalable y competitivo, por ejemplo:

- Sistema de diseño
- Tokens visuales
- Biblioteca de componentes
- Guía de estilos
- Mejoras en onboarding
- Microinteracciones
- Personalización
- Métricas de producto
- Pruebas de usabilidad
- Pruebas de accesibilidad
- Optimización de performance percibida

### 4. Plan de implementación

Propón un plan priorizado en fases:

- Fase 1: quick wins de alto impacto y bajo esfuerzo
- Fase 2: correcciones estructurales necesarias
- Fase 3: mejoras visuales y de experiencia avanzadas
- Fase 4: escalabilidad, sistema de diseño y mantenimiento

Para cada tarea incluye:

- Qué se debe cambiar
- En qué pantalla, componente o archivo aplica, si puedes identificarlo
- Por qué es importante
- Prioridad: crítica, alta, media o baja
- Esfuerzo estimado: bajo, medio o alto
- Impacto esperado en UX/UI

### 5. Propuesta concreta de rediseño

Después del diagnóstico, propone mejoras visuales y estructurales específicas.

Para cada pantalla o componente importante:

- Describe cómo debería verse y comportarse
- Indica qué debe eliminarse, simplificarse, reorganizarse o añadirse
- Propón una jerarquía visual clara
- Sugiere textos o CTAs mejores si los actuales son ambiguos
- Define estados necesarios: default, hover, focus, active, disabled, loading, empty, success y error cuando apliquen
- Explica cómo debería adaptarse a móvil, tablet y desktop

### 6. Recomendaciones técnicas

Propón cambios concretos de implementación relacionados con UX/UI, tales como:

- Componentes reutilizables que conviene crear
- Tokens de color, espaciado, tipografía, sombras y border radius
- Convenciones de naming
- Organización de estilos
- Mejoras en accesibilidad semántica
- Estrategia de breakpoints
- Validación de formularios
- Librerías útiles solo si realmente aportan valor al stack existente

## Reglas de evaluación

- Sé exigente, directo y específico.
- No suavices las críticas para ser amable.
- No des recomendaciones genéricas como “mejorar los colores” o “hacerlo más moderno” sin explicar exactamente qué está mal y cómo corregirlo.
- Vincula cada recomendación con un elemento, pantalla, componente, patrón o archivo concreto siempre que sea posible.
- Prioriza problemas reales sobre cambios puramente decorativos.
- Distingue claramente entre problemas comprobados, hipótesis y mejoras opcionales.
- Considera tanto la experiencia de usuarios finales como la mantenibilidad para el equipo de desarrollo.
- Si detectas algo bien implementado, explícalo brevemente y señala cómo mantener esa calidad al escalar el proyecto.
- Da ejemplos de implementación o estructura de componentes cuando aporten valor.
- Al final, crea una lista final ordenada con las 10 acciones más importantes a realizar, de mayor a menor prioridad.