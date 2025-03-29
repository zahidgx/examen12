import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://3.137.174.238/users/${userId}`);
        const data = await response.json();
        if (data) {
          setUser(data);
        } else {
          console.error('Usuario no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        setError('Error al obtener el usuario');
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://3.137.174.238/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      alert('Usuario actualizado');
      navigate('/users');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setError('Error al actualizar el usuario');
    }
  };

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Editar Usuario</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nombre:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Apellido:
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Correo:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>Guardar cambios</button>
        </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '50px auto',
  },
  header: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '15px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#D32F2F', // Color rojito
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
    boxSizing: 'border-box',
  },
  buttonHover: {
    backgroundColor: '#FF5F5F', // Sombra más clara
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default EditUser;

