import { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email) {
      setError('Veuillez remplir les champs obligatoires (Nom et Email).');
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '', role: 'user' });
    } catch (err) {
      setError('Une erreur est survenue lors de la création.', err);
    }
  };

  return (
    <div className="user-form-container">
      <h3>Ajouter un utilisateur</h3>
      {error && <div className="error-alert">{error}</div>}
      
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Jean Dupont"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jean@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Rôle</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Créer l'utilisateur
        </button>
      </form>
    </div>
  );
};

export default UserForm;