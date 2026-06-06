# Changelog

## 1.1.0 - 2026-06-06

### Changed

- Mejora de SEO base con title, meta description, canonical, Open Graph y Twitter Card.
- Se anaden `robots.txt`, `sitemap.xml` y `og-image.png`.
- Se mejora la semantica HTML con `main`, `header`, `section`, `footer`, `h2` y labels accesibles.
- Se anade contenido HTML indexable explicando como se calcula el precio de una impresion 3D.
- Se sanea la codificacion de textos y simbolos visibles.
- Se aceptan valores con coma decimal y punto decimal.
- Se protegen los calculos contra `NaN`, `Infinity`, valores negativos y campos invalidos.
- Se anaden headers basicos de seguridad en Vercel.

### Added

- Tests unitarios con el runner nativo de Node.
- Coverage de la logica critica de calculo.
- ADR de arquitectura para documentar decisiones principales.

### Notes

- La imagen explicativa del README se mantiene en `docs/screenshot.png`.
- La carpeta local no contiene `.git`, por lo que no se han creado commits desde este entorno.
