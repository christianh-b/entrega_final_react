const Pagination = ({ paginaActual, totalPaginas, onChange }) => {
  if (totalPaginas <= 1) return null

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => onChange(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        ← Anterior
      </button>

      {paginas.map((n) => (
        <button
          key={n}
          className={`page-btn ${n === paginaActual ? 'active' : ''}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}

      <button
        className="page-btn"
        onClick={() => onChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente →
      </button>
    </div>
  )
}

export default Pagination
