import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from './config'
import seedData from '../data/productos.json'

const productosRef = collection(db, 'productos')

const normalize = (data) => ({
  nombre: data.nombre,
  descripcion: data.descripcion,
  categoria: data.categoria,
  imagen: data.imagen,
  precio: Number(data.precio),
  stock: Number(data.stock),
})

export const getProducts = async () => {
  const snapshot = await getDocs(productosRef)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export const getProduct = async (id) => {
  const snap = await getDoc(doc(db, 'productos', id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export const addProduct = async (data) => {
  const ref = await addDoc(productosRef, normalize(data))
  return ref.id
}

export const updateProduct = async (id, data) => {
  await updateDoc(doc(db, 'productos', id), normalize(data))
}

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, 'productos', id))
}

export const seedProducts = async () => {
  await Promise.all(seedData.map((p) => addDoc(productosRef, normalize(p))))
}
