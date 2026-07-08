const teamMembers = [
  {
    id: 1,
    nombre: 'Ana García',
    rol: 'CEO & Fundadora',
    bio: 'Apasionada por la tecnología con más de 15 años de experiencia liderando equipos en el sector tech.',
    avatar: 'https://i.pravatar.cc/100?img=47',
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez',
    rol: 'CTO',
    bio: 'Ingeniero de software especializado en arquitecturas escalables y soluciones cloud de alto rendimiento.',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 3,
    nombre: 'María López',
    rol: 'Directora de Diseño',
    bio: 'Diseñadora UX/UI enfocada en crear experiencias digitales intuitivas, accesibles y centradas en el usuario.',
    avatar: 'https://i.pravatar.cc/100?img=49',
  },
]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>⚡ TechStore</h3>
          <p>Tu tienda de tecnología de confianza desde 2015.</p>
          <p>Ofrecemos los mejores productos tech con garantía oficial y envío a todo el país.</p>
          <div className="footer-contact">
            <p>📍 Av. Corrientes 1234, Buenos Aires, Argentina</p>
            <p>📞 +54 11 4567-8900</p>
            <p>✉️ contacto@techstore.com.ar</p>
          </div>
        </div>

        <div className="footer-team">
          <h4>Nuestro Equipo</h4>
          <div className="team-cards">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <img src={member.avatar} alt={member.nombre} className="team-avatar" />
                <h5>{member.nombre}</h5>
                <span className="team-role">{member.rol}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 TechStore. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
