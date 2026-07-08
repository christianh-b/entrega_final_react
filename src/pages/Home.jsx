import { Link } from 'react-router-dom'

const features = [
  { icon: '🚀', titulo: 'Envío Express', desc: 'Recibí tu pedido en 24 hs en todo el país.' },
  { icon: '🔒', titulo: 'Pago Seguro', desc: 'Transacciones protegidas con cifrado SSL.' },
  { icon: '✅', titulo: 'Garantía Oficial', desc: '12 meses de garantía en todos nuestros productos.' },
  { icon: '🎧', titulo: 'Soporte 24/7', desc: 'Nuestro equipo está disponible para ayudarte siempre.' },
]

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            La tecnología que necesitás,<br />
            <span className="hero-highlight">al mejor precio</span>
          </h1>
          <p className="hero-subtitle">
            Laptops, smartphones, wearables y más. Todo con garantía oficial y envío a todo el país.
          </p>
          <div className="hero-actions">
            <Link to="/productos" className="btn-hero-primary">
              Ver catálogo
            </Link>
            <Link to="/carrito" className="btn-hero-secondary">
              Mi carrito
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-badge">⚡</div>
        </div>
      </section>

      <section className="features">
        <h2 className="features-title">¿Por qué elegirnos?</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.titulo}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>¿Listo para explorar?</h2>
        <p>Descubrí nuestra selección de productos con las últimas tecnologías del mercado.</p>
        <Link to="/productos" className="btn-hero-primary">
          Ir al catálogo →
        </Link>
      </section>
    </div>
  )
}

export default Home
