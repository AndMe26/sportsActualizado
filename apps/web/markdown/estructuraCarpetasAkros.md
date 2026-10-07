Estructura de Directorios del Repositorio (Tree)
sport-complex/
├── .github/
│   └── workflows/
│       ├── ci.yml                     # Verificación de lint, typecheck y contratos
│       └── deploy.yml                 # Build de Docker y despliegue continuo en VPS
├── docker/
│   ├── Dockerfile.web                 # Contenedor multi-stage optimizado para Next.js
│   ├── docker-compose.yml             # Orquestación del stack de producción en el VPS
│   └── Caddyfile                      # Proxy inverso Caddy con SSL automático
├── apps/
│   └── web/                           # Aplicación Fullstack Unificada Next.js
│       ├── public/
│       │   ├── images/                # Activos estáticos de instalaciones
│       │   └── branding/              # Isotipos y logotipos institucionales
│       ├── src/
│       │   ├── app/                   # App Router de Next.js
│       │   │   ├── (public)/          # Rutas públicas institucionales (SSG)
│       │   │   │   ├── layout.tsx     # Layout público institucional (Nav/Footer)
│       │   │   │   ├── page.tsx       # Landing Page de entrada y vitrina (RF-00)
│       │   │   │   └── legal/         # Reglamentos y condiciones estáticas
│       │   │   ├── (auth)/            # Autenticación y recuperación de cuentas
│       │   │   │   ├── login/
│       │   │   │   ├── register/
│       │   │   │   └── verify/        # Verificación con token temporal 15 min (RF-02)
│       │   │   ├── (customer)/        # Portal Privado del Cliente (SSR + CSR)
│       │   │   │   ├── portal/
│       │   │   │   │   ├── layout.tsx
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── book/      # Flujo de reserva y checkout Stripe (RF-08, RF-09)
│       │   │   │   │   ├── tickets/   # Billetera digital y descarga PDF (RF-10, RF-12)
│       │   │   │   │   └── membership/# Suscripciones recurrentes y 30% desc (RF-16)
│       │   │   ├── (staff)/           # Operaciones operativas del personal
│       │   │   │   ├── pos/           # Punto de Venta Cashless y PDF (RF-17)
│       │   │   │   └── scanner/       # Control de Acceso Móvil Puesto/Consulta (RF-13, RF-14)
│       │   │   ├── (admin)/           # Consola de Administración Central
│       │   │   │   ├── admin/
│       │   │   │   │   ├── dashboard/ # Analítica, afluencia y recaudación (RF-21)
│       │   │   │   │   ├── services/  # Configuración de categorías y aforos (RF-03, RF-04)
│       │   │   │   │   ├── employees/ # Gestión de personal y borrado lógico (RF-18)
│       │   │   │   │   └── incident/  # Inhabilitación y webhook n8n (RF-19)
│       │   │   ├── api/               # API Routes (Backend REST)
│       │   │   │   ├── auth/          # Callbacks OAuth y verificación
│       │   │   │   ├── bookings/      # Bloqueo temporal 15 min y confirmaciones
│       │   │   │   ├── payments/      # Webhook de Stripe y sesiones de pago
│       │   │   │   ├── access/        # Validación de lectura QR y consumo de tiquetes
│       │   │   │   ├── pdf/           # Endpoint para emisión de comprobante en PDF
│       │   │   │   └── webhooks/      # Receptores y disparadores (n8n, contingencia)
│       │   │   └── layout.tsx         # Layout raíz con proveedores globales
│       │   ├── middleware.ts          # Control RBAC y redirección perimetral de Landing
│       │   └── styles/
│       │       └── globals.css        # Configuración base de Tailwind CSS v4
│       ├── next.config.ts             # Configuración de Next.js (output: 'standalone')
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── core/                          # Reglas de negocio e integraciones de dominio
│   │   ├── src/
│   │   │   ├── domain/                # Modelos de dominio y tipos abstractos
│   │   │   ├── services/              # Orquestadores de lógica pura
│   │   │   │   ├── pricing.ts         # Cálculo tarifario y descuento del 30% (RN-08)
│   │   │   │   ├── availability.ts    # Ventana 15 días y multirreserva (RN-01, RN-07)
│   │   │   │   ├── pool-policy.ts     # Mantenimiento y festivos Nager.Date (RN-02)
│   │   │   │   └── access-control.ts  # Validación de servicio y vigencia horaria (RN-06)
│   │   │   ├── integrations/          # Conectores desacoplados para servicios externos
│   │   │   │   ├── nager-date.ts      # Cliente de festivos nacionales de Colombia
│   │   │   │   ├── stripe.ts          # Integración con pasarela 100% cashless
│   │   │   │   └── n8n.ts             # Cliente de eventos para flujos de contingencia
│   │   │   └── security/              # Generación de tokens y firmado HMAC de QR
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── db/                            # Capa de datos con Prisma ORM sobre Supabase
│   │   ├── prisma/
│   │   │   ├── schema.prisma          # Definición del esquema relacional
│   │   │   └── migrations/            # Historial de migraciones SQL versionadas
│   │   ├── src/
│   │   │   ├── client.ts              # Instancia singleton de Prisma Client
│   │   │   └── repositories/          # Consultas transaccionales y SELECT FOR UPDATE
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── ui/                            # Sistema de componentes compartidos (@sportcomplex/ui)
│   │   ├── src/
│   │   │   ├── components/            # Componentes base Shadcn (Button, Dialog, Card, etc.)
│   │   │   ├── templates/             # Plantillas de Simulación de Impresión PDF
│   │   │   │   └── ticket-receipt.tsx # Comprobante optimizado para exportación/impresión
│   │   │   └── lib/                   # Funciones utilitarias
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── validation/                    # Esquemas Zod y Contratos de Validación
│   │   ├── src/
│   │   │   ├── auth.schema.ts         # Validación de credenciales y activación
│   │   │   ├── booking.schema.ts      # Validación de solicitudes de reserva
│   │   │   ├── access.schema.ts       # Validación de lectura de QR y turnos
│   │   │   └── service.schema.ts      # Validación de parámetros del catálogo
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── config/                        # Configuraciones de compilación y linter
│       ├── eslint/
│       └── typescript/
├── .npmrc                             # Resolución determinista y bloqueo de dependencias
├── package.json                       # Raíz del Workspace
├── pnpm-lock.yaml                     # Archivo de bloqueo congelado
├── pnpm-workspace.yaml                # Declaración de miembros del Monorepo
├── README.md
└── turbo.json                         # Pipeline de orquestación de caché y compilación