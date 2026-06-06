# 3D Calculador

> Calcula el precio justo de tus impresiones 3D. Sin backend. Sin tracking. Sin registros.

![3D CALC screenshot](./docs/screenshot.png)

## Que Es

Una calculadora web para makers y negocios de impresion 3D que necesitan poner precio a sus trabajos sin adivinar.

Introduces tus costes reales: material, peso, tiempo de maquina, mano de obra, desperdicio y margen. La app calcula el precio final y muestra un desglose claro de cada partida. Todo ocurre en el navegador.

```txt
Precio final = material + desperdicio + maquina + mano de obra + margen
```

## Demo

[3dcalculador.vercel.app](https://3dcalculador.vercel.app/)

## Caracteristicas

- Presets rapidos para PLA, PETG, ABS y resina.
- Desglose visual de material, desperdicio, maquina y mano de obra.
- Precio final animado que se actualiza en tiempo real.
- Selector de divisa EUR/USD.
- Interfaz en espanol e ingles.
- Validacion de entradas para evitar `NaN`, `Infinity` y valores negativos.
- Soporte para coma decimal y punto decimal.
- SEO basico: title, description, canonical, Open Graph, robots y sitemap.
- Headers basicos de seguridad en Vercel.

## Uso Local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Scripts

```bash
npm run dev
npm run build
npm test
npm run test:coverage
npm run preview
```

Los tests usan el runner nativo de Node para no anadir dependencias extra a una app pequena.

## Estructura

```txt
src/
  components/   Componentes visuales de la calculadora
  hooks/        Hooks de interfaz
  lib/          Logica de calculo, formatos, traducciones y acentos
test/           Tests unitarios de la logica critica
public/         favicon, robots, sitemap y assets publicos
docs/           Imagen explicativa del proyecto
```

## Testing

La logica critica esta cubierta con tests unitarios:

- Formula principal de precio.
- Desglose de costes.
- Sanitizacion de valores invalidos.
- Parseo de coma decimal y punto decimal.
- Formato de importes.

Ejecuta:

```bash
npm run test:coverage
```

## Deploy

El proyecto incluye `vercel.json` preconfigurado.

```bash
vercel
```

Tambien puedes conectar el repo en [vercel.com/new](https://vercel.com/new). Cada push a la rama configurada puede desplegar automaticamente.

Si en el futuro usas dominio propio, actualiza:

- `index.html`: canonical y Open Graph URL.
- `public/robots.txt`: URL del sitemap.
- `public/sitemap.xml`: URL publica principal.

## Stack

React 18, TypeScript, Vite y CSS.

Sin backend, sin base de datos y sin librerias de UI.

---

Hecho con cariño ❤️ - [MabarcoDev](https://www.mabarcodev.com).
