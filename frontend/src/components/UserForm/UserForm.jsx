import { useState } from "react";
import "./UserForm.css";

const UserForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "user",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.name || !formData.email) {
      setError("Veuillez remplir les champs obligatoires.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);

      if (!initialData) {
        setSuccessMessage("Utilisateur créé !");
        setFormData({ name: "", email: "", role: "user" });

        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-form-container">
      <h3>
        {initialData ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
      </h3>

      {error && <div className="error-alert">{error}</div>}

      {successMessage && <div className="success-alert">{successMessage}</div>}

      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Rôle</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting
            ? "Envoi en cours..."
            : initialData
              ? "Mettre à jour"
              : "Créer l'utilisateur"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
