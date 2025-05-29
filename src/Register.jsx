import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    Name: '',
    Last_Name: '',
    Phone: '',
    Direccion: '',
    Email: '',
    Contraseña: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://electronix-system-92015dea387d.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
       try {
       const data = await response.json();
       console.log('Usuario registrado:', data);
       } catch (jsonError) {
       console.log('Usuario registrado, pero la respuesta no era JSON.'); }
      
        setMessage('¡Usuario registrado exitosamente!');
        setFormData({
          Name: '',
          Last_Name: '',
          Phone: '',
          Direccion: '',
          Email: '',
          Contraseña: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Error al registrar usuario:', errorData);
        setMessage('Hubo un error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage('Error de red. Intenta de nuevo.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#000' }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '380px', backgroundColor: '#111', color: '#fff', borderRadius: '12px' }}>
        <h2 className="text-center mb-4">Registro de Usuario</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="Last_Name"
              value={formData.Last_Name}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              placeholder="Ingresa tu apellido"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              placeholder="Ingresa tu número"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              name="Direccion"
              value={formData.Direccion}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              placeholder="Ingresa tu dirección"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="Contraseña"
              value={formData.Contraseña}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              placeholder="Crea una contraseña"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Registrarse
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3 text-center" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
