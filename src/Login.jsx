import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_LOGIN = 'https://electronix-system-92015dea387d.herokuapp.com/api/users';

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(API_LOGIN);
      const users = res.data;

      const user = users.find(
        (u) => u.Email === email && u.Contraseña === password
      );

      if (user) {
        setUser(user);
        navigate('/products');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#000' }}
    >
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '400px', backgroundColor: '#111', color: '#fff' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control bg-dark text-white border-secondary"
              placeholder="correo@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control bg-dark text-white border-secondary"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 text-center" role="alert">
            {error}
          </div>
        )}

        <p className="text-center mt-4">
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => navigate('/register')}
            className="btn btn-link text-primary p-0"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
