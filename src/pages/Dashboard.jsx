import { useState, useEffect } from 'react'
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
} from '../firebase/products'

const emptyForm = {
  nombre: '',
  precio: '',
  descripcion: '',
  categoria: '',
  imagen: '',
  stock: '',
}

const Dashboard = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  const loadProducts = async () => {
    const data = await getProducts()
    setProductos(data)
    setLoading(false)
  }

  useEffect(() => {
    getProducts().then((data) => {
      setProductos(data)
      setLoading(false)
    })
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    if (editId) {
      await updateProduct(editId, form)
    } else {
      await addProduct(form)
    }
    resetForm()
    await loadProducts()
    setSaving(false)
  }

  const handleEdit = (producto) => {
    setEditId(producto.id)
    setForm({
      nombre: producto.nombre ?? '',
      precio: producto.precio ?? '',
      descripcion: producto.descripcion ?? '',
      categoria: producto.categoria ?? '',
      imagen: producto.imagen ?? '',
      stock: producto.stock ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return
    await deleteProduct(id)
    await loadProducts()
  }

  const handleSeed = async () => {
    setSeeding(true)
    await seedProducts()
    await loadProducts()
    setSeeding(false)
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Panel de administración</h2>

      <form onSubmit={handleSubmit} className="dashboard-form">
        <h3>{editId ? 'Editar producto' : 'Agregar producto'}</h3>
        <div className="form-grid">
          <label>
            <span>Nombre</span>
            <input name="nombre" value={form.nombre} onChange={handleChange} required />
          </label>
          <label>
            <span>Precio</span>
            <input
              name="precio"
              type="number"
              step="0.01"
              min="0"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Categoría</span>
            <input name="categoria" value={form.categoria} onChange={handleChange} required />
          </label>
          <label>
            <span>Stock</span>
            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-full">
            <span>Imagen (URL)</span>
            <input name="imagen" value={form.imagen} onChange={handleChange} required />
          </label>
          <label className="form-full">
            <span>Descripción</span>
            <textarea
              name="descripcion"
              rows="3"
              value={form.descripcion}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-auth" disabled={saving}>
            {saving ? 'Guardando...' : editId ? 'Guardar cambios' : 'Agregar producto'}
          </button>
          {editId && (
            <button type="button" className="btn-clear" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="dashboard-list-header">
        <h3>Productos ({productos.length})</h3>
        {!loading && productos.length === 0 && (
          <button className="btn-checkout" onClick={handleSeed} disabled={seeding}>
            {seeding ? 'Cargando...' : 'Cargar datos de ejemplo'}
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading">Cargando productos...</div>
      ) : (
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="td-product">
                      <img src={p.imagen} alt={p.nombre} />
                      <span>{p.nombre}</span>
                    </div>
                  </td>
                  <td>{p.categoria}</td>
                  <td>${Number(p.precio).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                  <td>{p.stock}</td>
                  <td>
                    <div className="td-actions">
                      <button className="btn-edit" onClick={() => handleEdit(p)}>
                        Editar
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Dashboard
