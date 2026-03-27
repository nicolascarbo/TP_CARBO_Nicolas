import './UserCard.css';

const UserCard = ({ user, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const roleClass = user.role === 'admin' ? 'role-badge role-admin' : 'role-badge role-user';

  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-email">{user.email}</p>
        <span className={roleClass}>
          {user.role || 'user'}
        </span>
      </div>

      <div className="user-card-footer">
        <p className="user-date">Membre depuis le : {formatDate(user.createdAt)}</p>
        <button 
          type="button"
          className="delete-btn" 
          onClick={() => onDelete(user._id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default UserCard;