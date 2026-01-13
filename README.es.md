<div align="center">

**[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

<p>

# Panel de Z.AI Usage

Un panel moderno de Next.js para monitorear el uso de la API de Z.AI con análisis en tiempo real y soporte multilingüe.

</div>

## Características

- **📈 Seguimiento de Uso en Tiempo Real** - Monitorea llamadas a modelos, consumo de tokens y rendimiento de herramientas
- **📊 Análisis Visual** - Hermosos gráficos mostrando tendencias de uso a lo largo del tiempo
- **🔒 Seguro** - La API key se almacena solo en el localStorage del navegador
- **🌙 Modo Oscuro** - Diseño Material You con cambio automático de tema
- **🌍 Soporte Multilingüe** - Disponible en 7 idiomas
- **📱 Responsive** - Funciona perfectamente en escritorio, tablet y móvil
- **⚡ Rápido** - Construido con Next.js 16 y React 19 para rendimiento óptimo

## Captura de Pantalla

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/CNSeniorious000/zai-coding-plan-dashboard/main/.github/screenshots/screenshot-es-dark.webp">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/CNSeniorious000/zai-coding-plan-dashboard/main/.github/screenshots/screenshot-es-light.webp">
  <img alt="Captura de pantalla del Panel de Z.AI Usage" src="https://raw.githubusercontent.com/CNSeniorious000/zai-coding-plan-dashboard/main/.github/screenshots/screenshot-es-dark.webp">
</picture>

## Stack Tecnológico

| Tecnología          | Descripción                              |
| ------------------- | ---------------------------------------- |
| **Next.js 16**      | Framework React con App Router           |
| **React 19**        | React más reciente con Server Components |
| **TypeScript**      | Desarrollo con seguridad de tipos        |
| **Tailwind CSS v4** | Framework CSS utilitario-first           |
| **next-intl**       | Framework de internacionalización (i18n) |
| **Recharts**        | Librería de visualización de datos       |
| **Radix UI**        | Librería de componentes accesibles       |
| **Fumadocs**        | Sistema de documentación                 |

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/CNSeniorious000/zai-coding-plan-dashboard.git

# Navegar al proyecto
cd zai-coding-plan-dashboard

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

1. **Obtener Tu API Key**
   - Visita [Z.AI Platform](https://z.ai/manage-apikey/apikey-list)
   - Crea o copia tu API key
   - Formato：`32hexchars.16alphanumchars`

2. **Ingresar Tu API Key**
   - Pega tu API key en el panel
   - Haz clic en "Obtener" para cargar tus datos de uso

3. **Ver Tus Estadísticas**
   - Resumen de cuota con barras de progreso
   - Desglose de uso de tokens por modelo
   - Uso de herramientas con tasas de éxito/fallo
   - Gráficos visuales de tendencias

## Endpoints de API

El panel usa las APIs de monitoreo oficial de Z.AI：

| Endpoint                         | Descripción                              |
| -------------------------------- | ---------------------------------------- |
| `/api/monitor/usage/model-usage` | Estadísticas de uso de tokens por modelo |
| `/api/monitor/usage/tool-usage`  | Rendimiento de llamadas a herramientas   |
| `/api/monitor/usage/quota/limit` | Límites de cuota actuales                |

## Estructura del Proyecto

```
src/
├── app/
│   ├── [locale]/          # Rutas localizadas (en, zh-CN, ja, ko, es, fr, de)
│   │   ├── page.tsx       # Página principal del panel
│   │   └── docs/          # Páginas de documentación
│   └── api/
│       └── usage/          # Proxy API backend
├── components/
│   ├── Dashboard.tsx      # Componente principal del panel
│   ├── UsageCharts.tsx    # Visualización de datos
│   └── ui/              # Componentes UI reutilizables
├── i18n/                  # Configuración de internacionalización
├── lib/                   # Utilidades
└── messages/               # Archivos de traducción
```

## Idiomas Soportados

- 🇺🇸 [English](README.md)
- 🇨🇳 [简体中文](README.zh-CN.md)
- 🇯🇵 [日本語](README.ja.md)
- 🇰🇷 [한국어](README.ko.md)
- 🇪🇸 [Español](README.es.md)
- 🇫🇷 [Français](README.fr.md)
- 🇩🇪 [Deutsch](README.de.md)

## Documentación

La documentación completa está disponible en `/docs` en la aplicación.

## Seguridad

- **Almacenamiento de API Key**：Tu API key se almacena solo en el `localStorage` de tu navegador
- **Sin Almacenamiento en Servidor**：La aplicación no almacena o transmite tu key a ningún servidor excepto la API oficial de Z.AI
- **Solo Cliente**：Toda la recuperación de datos ocurre directamente desde tu navegador a Z.AI

## Contribuir

¡Las contribuciones son bienvenidas! Por favor, siéntete libre de enviar un Pull Request.

## Licencia

Este proyecto es privado.

---

<div align="center">

Hecho con ❤️ para la comunidad de Z.AI

**[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

</div>
