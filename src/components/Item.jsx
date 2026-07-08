import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Item = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="item-card">
      <Link to={`/producto/${product.id}`} className="item-image-wrapper">
        <img src={product.imagen} alt={product.nombre} className="item-image" />
      </Link>
      <div className="item-body">
        <Link to={`/producto/${product.id}`}>
          <h3 className="item-name">{product.nombre}</h3>
        </Link>
        <p className="item-description">{product.descripcion}</p>
        <div className="item-footer">
          <span className="item-price">
            ${product.precio.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </span>
          <div className="item-actions">
            <button
              onClick={() => addToCart(product, 1)}
              className="btn-add-cart"
            >
              <svg
                className="btn-cart-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 4h2l2.6 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 7H6" />
              </svg>
              Agregar al carrito
            </button>
            <Link to={`/producto/${product.id}`} className="btn-detail">
              Ver detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
