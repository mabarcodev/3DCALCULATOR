# ADR-001: Base tecnica de 3D Calculador

## Estado

Aceptado.

## Contexto

3D Calculador es una aplicacion web sencilla publicada en Vercel. El objetivo actual no es convertirla en SaaS, sino dejar una base clara, rapida, mantenible e indexable.

## Decisiones

- Mantener Vite, React y TypeScript porque el proyecto ya esta construido con ese stack y no necesita backend.
- Mantener la logica critica en `src/lib/calc.ts` para separarla de la interfaz.
- Usar el runner nativo de Node para tests unitarios y coverage, evitando dependencias extra.
- Aceptar coma decimal y punto decimal para usuarios de Espana y mercados internacionales.
- Normalizar valores invalidos a cero para impedir resultados `NaN`, `Infinity` o importes negativos.
- Anadir contenido HTML real bajo la calculadora para mejorar SEO y utilidad del sitio.
- Usar canonical, robots y sitemap apuntando a `https://3dcalculador.vercel.app/` mientras no exista dominio propio.

## Consecuencias

- La app sigue siendo estatica, barata de desplegar y facil de mantener.
- La logica de precio se puede evolucionar sin tocar componentes visuales.
- Si se anade dominio propio, hay que actualizar canonical, Open Graph, robots y sitemap.
- Si la app crece hacia SaaS, convendra crear ADRs nuevos para autenticacion, persistencia, pagos y generacion de PDFs.
