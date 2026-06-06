const MONO = "'JetBrains Mono', ui-monospace, monospace"

export function SeoContent() {
  return (
    <section className="seo-content" aria-labelledby="seo-title">
      <h2 id="seo-title">Cómo calcular el precio de una impresión 3D</h2>
      <p>
        Para poner precio a una pieza impresa en 3D conviene sumar todos los costes reales del trabajo:
        material consumido, desperdicio, tiempo de máquina, mano de obra y margen de beneficio.
        Esta calculadora usa esos datos para estimar un precio final claro y fácil de justificar.
      </p>

      <div className="seo-grid">
        <article>
          <h3>Material y desperdicio</h3>
          <p>
            El coste de material parte del precio por kilo de la bobina o resina y del peso de la pieza.
            Añadir un porcentaje de desperdicio ayuda a cubrir soportes, purgas, recortes y posibles fallos.
          </p>
        </article>

        <article>
          <h3>Máquina y electricidad</h3>
          <p>
            El tiempo de impresión también tiene coste. La tarifa por hora puede incluir electricidad,
            desgaste, mantenimiento, boquillas, cama, resina, FEP y amortización de la impresora.
          </p>
        </article>

        <article>
          <h3>Mano de obra</h3>
          <p>
            Preparar archivos, retirar soportes, lijar, limpiar, curar, embalar y atender al cliente
            requiere tiempo. Incluirlo evita vender trabajos por debajo de su coste real.
          </p>
        </article>

        <article>
          <h3>Margen de beneficio</h3>
          <p>
            El margen permite que el presupuesto sea sostenible. No solo cubre el coste directo:
            también deja espacio para impuestos, comisiones, errores y crecimiento del negocio.
          </p>
        </article>
      </div>

      <p style={{ fontFamily: MONO, fontSize: 11, color: '#737373', letterSpacing: '0.05em' }}>
        Fórmula: precio final = material + desperdicio + máquina + mano de obra + margen.
      </p>
    </section>
  )
}
