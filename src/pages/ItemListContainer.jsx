import { useState, useEffect, useMemo } from 'react'
import Item from '../components/Item'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import { getProducts } from '../firebase/products'

const PRODUCTOS_POR_PAGINA = 6

const ItemListContainer = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProductos(data)
        setLoading(false)
      })
      .catch(() => {
        setError('No se pudo cargar el catálogo de productos.')
        setLoading(false)
      })
  }, [])

  // Filtrado por nombre o categoría (case-insensitive).
  const productosFiltrados = useMemo(() => {
    const term = busqueda.trim().toLowerCase()
    if (!term) return productos
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term)
    )
  }, [productos, busqueda])

  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA)

  const productosPagina = useMemo(() => {
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA
    return productosFiltrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA)
  }, [productosFiltrados, paginaActual])

  const handleBusqueda = (value) => {
    setBusqueda(value)
    setPaginaActual(1)
  }

  if (loading) {
    return <div className="loading">Cargando productos...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="catalog">
      <div className="catalog-header">
        <h2>Nuestros Productos</h2>
        <p>{productosFiltrados.length} productos disponibles</p>
      </div>

      <SearchBar value={busqueda} onChange={handleBusqueda} />

      {productosPagina.length === 0 ? (
        <div className="loading">No se encontraron productos.</div>
      ) : (
        <div className="product-grid">
          {productosPagina.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onChange={setPaginaActual}
      />
    </div>
  )
}

export default ItemListContainer
