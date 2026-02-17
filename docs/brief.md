# Brief del Proyecto — morcuende.info

> **Estado:** COMPLETADO — Entrevista @Analyst finalizada
> **Fecha:** 2026-02-17
> **Versión:** 1.0

---

## 1. Visión General

Sitio web personal de Alfonso Morcuende. Combina contenido editorial (artículos, entrevistas, podcast), portfolio profesional (público y privado) y un sistema de diseño tokenizado. Bilingüe ES/EN.

**Stack:** HTML estático, SCSS (ITCSS + Atomic Design), Design Tokens (W3C DTCG → SCSS via Token Engine), Storybook (Living Style Guide), Tokens Studio (sincronía Figma ↔ código). Sin framework JS (salvo módulos específicos para auth y formulario).

---

## 2. Estructura e Idiomas

### 2.1 Estrategia de idiomas

- **Modelo:** Subdirectorios por idioma (`/es/`, `/en/`)
- **Archivos:** HTML independientes por idioma (favorece SEO)
- **Compartido:** Misma arquitectura SCSS y Design Tokens para ambos idiomas
- **Ejemplo de URLs:**
  - `/es/articulos/` → listado de artículos en español
  - `/en/articles/` → article listing in English
  - `/es/sobre-mi/casos/` → portfolio en español
  - `/en/about-me/cases/` → portfolio in English

### 2.2 Navegación principal (5 secciones de nivel superior)

| # | ES | EN | Descripción |
|---|----|----|-------------|
| 1 | Artículos | Articles | Contenido editorial escrito |
| 2 | Entrevistas | Interviews | Entrevistas realizadas o recibidas |
| 3 | Podcast | Podcast | Contenido en audio |
| 4 | Sobre mí | About Me | Portfolio público/privado + páginas personales |
| 5 | Contacto | Contact | Formulario de contacto |

- Acceso directo desde el nav, sin menú paraguas ni agrupación
- El nav actual (organism-nav) se adapta para incluir estas 5 secciones + selector de idioma

### 2.3 Home page (Landing)

- Página de portada independiente (no es ninguna de las 5 secciones)
- Funciona como escaparate: muestra destacados de las secciones
  - Último episodio de podcast
  - Resumen/highlight del portfolio
  - Artículos recientes
- Punto de entrada principal del sitio
- URLs: `/es/` (home ES), `/en/` (home EN)

---

## 3. Contenido Editorial

### 3.1 Formato y origen del contenido

- **Formato:** HTML plano, escrito manualmente
- **Sin SSG ni CMS:** No se usa generador de sitios estáticos ni headless CMS
- **Consistencia:** Garantizada mediante arquitectura de componentes SCSS estricta y Design Tokens

### 3.2 Jerarquía de componentes reutilizables

| Capa | Ámbito | Uso |
|------|--------|-----|
| **Componentes de Colección** | Global | Cards reutilizadas tanto en la Home (destacados) como en los listados de Artículos, Entrevistas y Podcast |
| **Componentes Editoriales** | Artículos + Entrevistas | Set compartido para cuerpo de texto, imágenes y destacados |
| **Componentes de About Me** | Solo About Me | Componentes exclusivos de la sección personal/portfolio |
| **Componentes de Design System** | Solo Design System | Componentes técnicos: muestrarios de tokens, documentación técnica |

### 3.3 Artículos

- Listado con cards (componentes de colección)
- Página individual con componentes editoriales (cuerpo de texto, imágenes, destacados)

### 3.4 Entrevistas

- Listado con cards (componentes de colección, mismo diseño que artículos)
- Página individual con componentes editoriales compartidos con artículos

### 3.5 Podcast

- **Plataforma:** Spotify (contenido servido via embed)
- **Player:** iframe de Spotify dentro de un contenedor responsive diseñado con tokens propios
- Listado con cards (componentes de colección)

---

## 4. About Me y Portfolio

### 4.1 Sub-páginas públicas de About Me

| Página | Contenido |
|--------|-----------|
| **Overview** | Habilidades core: Leadership, Strategy, Scale |
| **Casos** | 3 proyectos destacados sin NDA (portfolio público) |
| **Side Projects** | Listado de proyectos paralelos/personales |
| **Talks** | Listado con slides embebidas, nombre del evento y año |
| **Resumé** | CV completo y optimizado |

Todas las sub-páginas de About Me son **públicas**.

### 4.2 Portfolio Privado (sección separada)

- **Naturaleza:** Sección independiente con contenido confidencial de alto valor
- **Contenido:** Datos confidenciales, logros de gestión de equipos, dirección de diseño, métricas reales
- **Diferencia con Casos públicos:** Los casos públicos son proyectos sin NDA; el portfolio privado contiene información que no puede ser accesible sin autorización
- **Acceso:** Requiere contraseña temporal (ver mecanismo abajo)

### 4.3 Mecanismo de acceso privado — Google Sheets Auth

**Arquitectura:**

```
[Usuario] → introduce contraseña → [JS en el sitio]
                                        ↓
                              consulta Google Sheets API
                                        ↓
                            [Google Sheet = "Panel de Gestión"]
                            ┌──────────────┬────────────┐
                            │ Contraseña   │ Caducidad  │
                            ├──────────────┼────────────┤
                            │ abc123xyz    │ 2026-03-01 │
                            │ recruiter-Q1 │ 2026-02-24 │
                            └──────────────┴────────────┘
                                        ↓
                              ¿Existe y no ha expirado?
                              → Sí: desbloquea portfolio
                              → No: mensaje de error
```

- **Sistema:** Google Sheets como base de datos externa de contraseñas
- **Gestión:** Alfonso crea manualmente las contraseñas y su fecha de expiración (1 día, 1 semana, 1 mes, etc.)
- **Validación:** JavaScript en el cliente consulta Google Sheets API para verificar existencia y vigencia
- **Granularidad:** Contraseñas únicas y temporales; el control total reside en el Google Sheet
- **Panel de gestión:** El propio Google Sheet (sin necesidad de admin panel custom)

**Requisitos técnicos:**
- Lógica de fetch a Google Sheets API (vía Apps Script o API REST directa)
- Gestión del estado de sesión (sessionStorage/localStorage para mantener el acceso durante la visita)
- UI de login (input + botón + feedback de error/éxito)
- Protección del contenido privado (el HTML privado no debe ser accesible sin validación)

---

## 5. Contacto

### 5.1 Formulario funcional

- **Servicio:** Netlify Forms (alternativa: Formspree)
- **Prioridad:** Low-code, gratuito, mantenimiento nulo, sin backend propio
- **Campos:** Nombre, Email (validación de formato), Mensaje
- **Validación frontend:** Con estilos definidos por Design Tokens (estados de error, focus, éxito)
- **Post-envío:** Página/estado de éxito (success state) que mantiene la línea visual del sitio

---

## 6. Design System y Tokens

### 6.1 Token Engine (existente)

- **Fuente de verdad:** `tokens/*.json` (formato W3C DTCG)
- **Generación:** `node token-engine/build.js` → `scss/1-settings/*.scss`
- **Tokens disponibles:** dimensiones, colores, tipografía responsive (4 breakpoints), breakpoints, columns, gutters, motion (duration + easing), elevación (z-index), radius, stroke, ratios, icon sizes
- **Comando:** `npm run tokens` (regenerar), `npm run build` (tokens + SCSS)

### 6.2 Tokens Studio — Sincronía Figma ↔ Código

- **Herramienta:** Tokens Studio (plugin de Figma)
- **Flujo bidireccional:** Los mismos archivos `tokens/*.json` alimentan tanto Figma como el Token Engine
- **Objetivo:** Diseño y desarrollo comparten una única fuente de verdad; cambios en Figma se reflejan en código y viceversa

### 6.3 Storybook como Living Style Guide

- **Rol:** Herramienta central de desarrollo, visualización y documentación de componentes
- **Integración con tokens:** Consume los mismos Design Tokens (SCSS/JSON) que el sitio web, garantizando paridad visual entre la guía y producción
- **Flujo de desarrollo:**
  1. Diseño del componente (Figma, con Tokens Studio)
  2. Desarrollo aislado en Storybook (con tokens reales)
  3. Implementación en los archivos HTML planos del sitio
- **Acceso público:** La sección "Design System" dentro de About Me enlaza a esta living style guide
- **Audiencia:** Otros diseñadores/devs, potenciales clientes, recruiters — demuestra la capacidad técnica del sistema

### 6.4 Componentes nuevos necesarios

Los componentes se proporcionarán con especificaciones de Figma conforme avance la fase de desarrollo. Categorías identificadas:

| Categoría | Componentes esperados |
|-----------|----------------------|
| **Colección** | article-card, interview-card, podcast-card, featured-card (home) |
| **Editorial** | article-body, blockquote, inline-image, highlight-box |
| **Podcast** | spotify-embed-container |
| **About Me** | skill-card, project-card, talk-item, resume-section |
| **Design System** | token-swatch, color-palette, typography-specimen |
| **Auth** | login-form, password-input, access-feedback |
| **Contacto** | contact-form, form-input, form-textarea, success-state |
| **Layout** | page-header, section-divider, footer |

---

## 7. Mapa de páginas completo

```
/ (raíz)
├── /es/                              ← Home ES (landing)
│   ├── /es/articulos/                ← Listado artículos
│   │   └── /es/articulos/{slug}/     ← Artículo individual
│   ├── /es/entrevistas/              ← Listado entrevistas
│   │   └── /es/entrevistas/{slug}/   ← Entrevista individual
│   ├── /es/podcast/                  ← Listado episodios
│   │   └── /es/podcast/{slug}/       ← Episodio individual
│   ├── /es/sobre-mi/                 ← Overview (About Me)
│   │   ├── /es/sobre-mi/casos/       ← Portfolio público
│   │   ├── /es/sobre-mi/proyectos/   ← Side Projects
│   │   ├── /es/sobre-mi/charlas/     ← Talks
│   │   ├── /es/sobre-mi/cv/          ← Resumé
│   │   └── /es/sobre-mi/design-system/ ← Living Style Guide
│   ├── /es/portfolio-privado/        ← Login + contenido protegido
│   └── /es/contacto/                 ← Formulario
│
└── /en/                              ← Home EN (landing)
    ├── /en/articles/                 ← (espejo de /es/ en inglés)
    ├── /en/interviews/
    ├── /en/podcast/
    ├── /en/about-me/
    │   ├── /en/about-me/cases/
    │   ├── /en/about-me/projects/
    │   ├── /en/about-me/talks/
    │   ├── /en/about-me/resume/
    │   └── /en/about-me/design-system/
    ├── /en/private-portfolio/
    └── /en/contact/
```

---

## 8. Resumen de decisiones técnicas

| Decisión | Resolución |
|----------|------------|
| Formato de contenido | HTML manual, sin SSG ni CMS |
| Idiomas | Subdirectorios `/es/`, `/en/` con HTML independientes |
| Navegación | 5 secciones de nivel superior, sin agrupación |
| Auth portfolio privado | Google Sheets como DB de contraseñas temporales |
| Formulario de contacto | Netlify Forms (alt: Formspree) |
| Design tokens → código | Token Engine propio (JSON W3C DTCG → SCSS) |
| Design tokens → Figma | Tokens Studio (bidireccional) |
| Documentación componentes | Storybook (Living Style Guide pública) |
| Flujo de desarrollo | Figma → Storybook → HTML plano |
