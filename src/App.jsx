import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Login from './Login'
import Register from './Register'

const API_PRODUCTS = 'https://electronix-system-92015dea387d.herokuapp.com/api/products'

function Products({ cart, setCart, searchTerm }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(API_PRODUCTS).then(res => setProducts(res.data))
  }, [])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  return (
    <div className="container py-5 text-white">
      <h1 className="mb-4">Productos</h1>
      <div className="row">
        {products
          .filter(product =>
            product.Name_Product.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(product => (
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
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    setCart(cart.filter(product => product.Id_Products !== id));
  };

  return (
    <div className="p-5 text-white bg-black min-vh-100">
      <button onClick={() => navigate('/products')} className="btn btn-secondary mb-4">Volver</button>
      <h1 className="text-2xl font-bold mb-4">Carrito</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="list-unstyled">
          {cart.map(product => (
            <li key={product.Id_Products} className="d-flex align-items-center justify-content-between border-bottom py-2">
              <div className="d-flex align-items-center gap-3">
                <img src={product.Url} alt={product.Name_Product} width="60" height="60" style={{ objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <h5 className="mb-1">{product.Name_Product}</h5>
                  <p className="mb-0 text-success">${parseInt(product.Price).toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(product.Id_Products)} className="btn btn-outline-danger btn-sm">Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Router>
      {user && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
          <div className="container-fluid">
            <Link to="/products" className="navbar-brand text-white text-decoration-none">
              Electronix System
            </Link>
            <div className="d-flex align-items-center gap-3">
              <input
                type="text"
                placeholder="Buscar..."
                className="form-control me-2"
                style={{ maxWidth: '200px' }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link to="/cart" className="nav-link text-white position-relative">
                <i className="bi bi-cart" style={{ fontSize: '1.5rem' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              </Link>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={user ? <Navigate to="/products" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={user ? <Products cart={cart} setCart={setCart} searchTerm={searchTerm} /> : <Navigate to="/" />} />
        <Route path="/cart" element={user ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
