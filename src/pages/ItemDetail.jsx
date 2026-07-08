import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProduct } from '../firebase/products'

const ItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    getProduct(id)
      .then(found => {
        if (!found) throw new Error('Producto no encontrado.')
        setProduct(found)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleQuantityChange = (e) => {
    const val = Number(e.target.value)
    if (val >= 1 && val <= (product?.stock ?? 99)) {
      setQuantity(val)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  if (loading) return <div className="loading">Cargando producto...</div>
  if (error) return (
    <div className="detail-error">
      <p>{error}</p>
      <button onClick={() => navigate('/productos')} className="btn-back">
        ← Volver al catálogo
      </button>
    </div>
  )

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="btn-back">
        ← Volver
      </button>

      <div className="detail-card">
        <div className="detail-image-wrapper">
          <img src={product.imagen} alt={product.nombre} className="detail-image" />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.categoria}</span>
          <h1 className="detail-name">{product.nombre}</h1>
          <p className="detail-description">{product.descripcion}</p>

          <div className="detail-meta">
            <span className={`detail-stock ${product.stock > 5 ? 'in-stock' : 'low-stock'}`}>
              {product.stock > 0
                ? `${product.stock} unidades disponibles`
                : 'Sin stock'}
            </span>
          </div>

          <div className="detail-price">
            ${product.precio.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </div>

          <div className="detail-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Cantidad</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="qty-btn"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="qty-input"
                />
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="qty-btn"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`btn-add-detail ${added ? 'btn-added' : ''}`}
              disabled={product.stock === 0}
            >
              {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
            </button>
          </div>

          {added && (
            <div className="added-notice">
              ¡Producto agregado! <button onClick={() => navigate('/carrito')} className="link-cart">Ver carrito →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
