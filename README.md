# Back2Street — Tasador IA

Herramienta interna para tasar ropa de segunda mano con IA visual.

## Estructura
```
back2street/
├── server.js          # Servidor Node.js (proxy seguro a la API de Anthropic)
├── package.json       # Dependencias
└── public/
    └── index.html     # Interfaz web completa del tasador
```

## Cómo desplegarlo en Railway (gratis, 10 minutos)

### Paso 1 — Sube el código a GitHub
1. Ve a github.com y crea una cuenta si no tienes
2. Crea un repositorio nuevo llamado `back2street-tasador`
3. Sube los archivos: `server.js`, `package.json` y la carpeta `public/`

### Paso 2 — Despliega en Railway
1. Ve a railway.app y regístrate con tu cuenta de GitHub
2. Pulsa "New Project" → "Deploy from GitHub repo"
3. Selecciona el repositorio `back2street-tasador`
4. Railway detectará automáticamente que es Node.js y lo desplegará

### Paso 3 — Añade tu API key de Anthropic
1. En Railway, entra en tu proyecto → pestaña "Variables"
2. Añade la variable: `ANTHROPIC_API_KEY` = tu key de console.anthropic.com
3. Railway reiniciará el servidor automáticamente

### Paso 4 — Accede a tu web
Railway te da una URL pública tipo `back2street-tasador.up.railway.app`
¡Ya puedes usar el tasador desde cualquier dispositivo!

## Alternativa: Render.com (también gratis)
1. Ve a render.com → "New Web Service"
2. Conecta con GitHub → selecciona el repositorio
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Añade la variable de entorno `ANTHROPIC_API_KEY`

## Uso local (para probar en tu ordenador)
```bash
# Instala Node.js desde nodejs.org si no lo tienes
npm install
ANTHROPIC_API_KEY=sk-ant-tu-key node server.js
# Abre http://localhost:3000 en tu navegador
```

## Funcionalidades incluidas
- Tasación automática por fotos con IA (Claude Vision)
- Filtro de marcas originales — rechaza sin marca o no aceptadas
- Detección de falsificaciones por IA
- Historial de tasaciones con resumen económico
- Exportación a PDF individual por prenda
- Exportación a Excel del historial completo
- Envío por email de informes individuales y resumen del lote
- Gestión de lista de marcas aceptadas (personalizable)
- Objetivo de margen del 65% con semáforo visual

## Seguridad
La API key de Anthropic se guarda como variable de entorno en el servidor.
Nunca está expuesta en el navegador del cliente.
