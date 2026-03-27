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

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAll();
      setUsers(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = async (formData) => {
      const response = await userService.create(formData);
      const newUser = response.data.data;
      
      setUsers(prevUsers => [newUser, ...prevUsers]);
      setTotalCount(prevCount => prevCount + 1);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      try {
        await userService.remove(userId);
        setUsers(users.filter(user => user._id !== userId));
        setTotalCount(prev => prev - 1);
      } catch (err) {
        alert("Erreur lors de la suppression", err.response);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="app-container">
      <Navbar count={totalCount} />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <UserForm onSubmit={handleCreate} />
        
        <UserList 
          users={users} 
          loading={loading} 
          error={error} 
          onDelete={handleDelete} 
        />
      </main>
    </div>
  );
};

export default App;