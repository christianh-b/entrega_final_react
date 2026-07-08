import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart, getTotalPrice } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [procesando, setProcesando] = useState(false)
  const [compraExitosa, setCompraExitosa] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/carrito' } })
      return
    }
    setProcesando(true)
    setTimeout(() => {
      clearCart()
      setProcesando(false)
      setCompraExitosa(true)
    }, 1800)
  }

  if (compraExitosa) {
    return (
      <div className="checkout-success">
        <div className="success-check">
          <svg viewBox="0 0 52 52" className="success-check-svg">
            <circle className="success-check-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="success-check-mark" fill="none" d="M14 27l7 7 16-16" />
          </svg>
        </div>
        <h2>¡Compra realizada con éxito!</h2>
        <p>Gracias por tu compra, {user?.email}. Te enviamos el detalle por email.</p>
        <Link to="/productos" className="btn-go-home">Seguir comprando</Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Tu carrito está vacío</h2>
        <p>Todavía no agregaste ningún producto.</p>
        <Link to="/" className="btn-go-home">Ver productos</Link>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h2>Mi Carrito</h2>

      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
            <div className="cart-item-info">
              <h4>{item.nombre}</h4>
              <p>Precio unitario: ${item.precio.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
              <div className="quantity-controls cart-qty">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="qty-btn"
                  disabled={item.quantity <= 1}
                  aria-label="Restar unidad"
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="qty-btn"
                  disabled={item.quantity >= item.stock}
                  aria-label="Sumar unidad"
                >
                  +
                </button>
              </div>
              <p className="cart-item-subtotal">
                Subtotal: ${(item.precio * item.quantity).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="btn-remove"
              aria-label={`Eliminar ${item.nombre}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${getTotalPrice().toLocaleString('es-AR', { minimumFractionDigits: 2 })}</h3>
        {!user && (
          <p className="checkout-hint">🔒 Necesitás iniciar sesión para finalizar la compra.</p>
        )}
        <div className="cart-actions">
          <button onClick={clearCart} className="btn-clear" disabled={procesando}>
            Vaciar carrito
          </button>
          <button onClick={handleCheckout} className="btn-checkout" disabled={procesando}>
            {procesando ? 'Procesando...' : 'Finalizar compra'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
