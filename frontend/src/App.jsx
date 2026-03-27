import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';
import userService from './services/userService';

const App = () => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState('all');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFormSubmit = async (formData) => {
      if (selectedUser) {
        const response = await userService.update(selectedUser._id, formData);
        setUsers(users.map(u => u._id === selectedUser._id ? response.data.data : u));
        setSelectedUser(null);
      } else {
        const response = await userService.create(formData);
        setUsers(prev => [response.data.data, ...prev]);
        setTotalCount(prev => prev + 1);
      }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Supprimer ?")) {
      try {
        await userService.remove(userId);
        setUsers(users.filter(u => u._id !== userId));
        setTotalCount(prev => prev - 1);
      } catch (err) {
        alert("Erreur suppression", err);
      }
    }
  };

  const filteredUsers = filterRole === 'all' 
    ? users 
    : users.filter(user => user.role === filterRole);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  return (
    <div className="app-container">
      <Navbar count={totalCount} />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <UserForm 
          key={selectedUser?._id || 'new'} 
          onSubmit={handleFormSubmit} 
          initialData={selectedUser} 
        />

        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setFilterRole('all')}
            style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: filterRole === 'all' ? '#2c3e50' : '#ecf0f1', color: filterRole === 'all' ? 'white' : 'black', border: 'none', borderRadius: '4px' }}
          >
            Tous
          </button>
          <button
            type="button"
            onClick={() => setFilterRole('admin')}
            style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: filterRole === 'admin' ? '#2c3e50' : '#ecf0f1', color: filterRole === 'admin' ? 'white' : 'black', border: 'none', borderRadius: '4px' }}
          >
            Admin
          </button>
          <button 
            type="button"
            onClick={() => setFilterRole('user')}
            style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: filterRole === 'user' ? '#2c3e50' : '#ecf0f1', color: filterRole === 'user' ? 'white' : 'black', border: 'none', borderRadius: '4px' }}
          >
            User
          </button>
        </div>
        
        <UserList 
          users={filteredUsers} 
          loading={loading} 
          error={error} 
          onDelete={handleDelete}
          onEdit={setSelectedUser}
        />
      </main>
    </div>
  );
};

export default App;