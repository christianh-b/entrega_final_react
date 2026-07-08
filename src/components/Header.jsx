import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CartWidget from './CartWidget'

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const cerrarMenu = () => setMenuAbierto(false)

  const handleLogout = async () => {
    await logout()
    cerrarMenu()
    navigate('/')
  }

  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={cerrarMenu}>
          <span className="logo-icon">⚡</span>
          TechStore
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuAbierto((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
        >
          {menuAbierto ? '✕' : '☰'}
        </button>

        <nav className={`nav ${menuAbierto ? 'nav-open' : ''}`}>
          <NavLink to="/" end className={linkClass} onClick={cerrarMenu}>
            Inicio
          </NavLink>
          <NavLink to="/productos" className={linkClass} onClick={cerrarMenu}>
            Productos
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={linkClass} onClick={cerrarMenu}>
              Dashboard
            </NavLink>
          )}

          <div className="nav-auth">
            {user ? (
              <>
                <span className="nav-user">{user.email}</span>
                <button className="btn-logout" onClick={handleLogout}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass} onClick={cerrarMenu}>
                  Ingresar
                </NavLink>
                <NavLink to="/registro" className="btn-register" onClick={cerrarMenu}>
                  Registrarse
                </NavLink>
              </>
            )}
          </div>
        </nav>

        <CartWidget />
      </div>
    </header>
  )
}

export default Header
