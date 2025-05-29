import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'

import axios from 'axios'
import './index.css'

import Login from './Login'
import Register from './Register'

const API_PRODUCTS = 'https://electronix-system-92015dea387d.herokuapp.com/api/products'

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(API_PRODUCTS).then(res => setProducts(res.data))
  }, [])

  const addToCart = (product) => {
    setCart([...cart, product])
    console.log('Producto agregado:', product)
    console.log('Carrito actual:', [...cart, product])
  }

  return (
    <div className="container py-5 text-white">
      <h1 className="mb-4">Productos</h1>
      <div className="row">
        {products.map(product => (
          <div key={product.Id_Products} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 bg-dark text-white shadow">
              <img src={product.Url} className="card-img-top" alt={product.Name_Product} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.Name_Product}</h5>
                <p className="card-text">{product.Description}</p>
                <p className="card-text fw-bold text-success">
                  ${parseInt(product.Price).toLocaleString()}
                </p>
                <a
                  href={product.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-auto mb-2"
                >
                  Ver producto
                </a>
                <button onClick={() => addToCart(product)} className="btn btn-success">
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function Cart({ cart, setCart }) {
  const removeFromCart = (id) => {
    setCart(cart.filter(product => product.Id_Products !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrito</h1>
      {cart.length === 0 ? <p>El carrito está vacío.</p> : (
        <ul>
          {cart.map(product => (
            <li key={product.Id_Products} className="flex justify-between items-center mb-2 border-b pb-2">
              <div>
                <h2 className="font-semibold">{product.Name_Product}</h2>
                <p>${parseInt(product.Price).toLocaleString()}</p>
              </div>
              <button onClick={() => removeFromCart(product.Id_Products)} className="text-red-500">Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

    return (
    <Router>

      {/* Navbar */}
    {user && (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <div className="container-fluid">
      <span className="navbar-brand">Electronix</span>
      <div className="d-flex gap-3">
        <Link to="/products" className="nav-link text-white">Productos</Link>
        <Link to="/cart" className="nav-link text-white">Carrito ({cart.length})</Link>
      </div>
    </div>
  </nav>
)}


      {/* Rutas */}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/products" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={user ? <Products cart={cart} setCart={setCart} /> : <Navigate to="/" />} />
        <Route path="/cart" element={user ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/" />} />
      </Routes>
     
    </Router>
  )
}


export default App
