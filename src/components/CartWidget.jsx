import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartWidget = () => {
  const { getTotalItems } = useCart()
  const total = getTotalItems()

  return (
    <Link to="/carrito" className="cart-widget" aria-label={`Carrito, ${total} productos`}>
      <span className="cart-icon">🛒</span>
      {total > 0 && <span className="cart-badge">{total}</span>}
    </Link>
  )
}

export default CartWidget
