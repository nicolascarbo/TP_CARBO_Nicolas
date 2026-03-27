import UserCard from "../UserCard/UserCard"
import './UserList.css';

const UserList = ({ users, loading, error, onDelete }) => {
  if (loading) {
    return <div className="loader">Chargement des données...</div>;
  }

  if (error) {
    return <div className="error-message">Erreur : {error}</div>;
  }

  if (users.length === 0) {
    return <div className="status-message">Aucun utilisateur</div>;
  }

  return (
    <div className="user-list-container">
      <div className="user-grid">
        {users.map((user) => (
          <UserCard 
            key={user._id} 
            user={user} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;