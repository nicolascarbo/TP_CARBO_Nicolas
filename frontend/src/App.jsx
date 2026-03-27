import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import UserList from "./components/UserList/UserList";
import userService from "./services/userService";


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

  const handleDelete = async (userId) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      try {
        await userService.remove(userId);
        setUsers(users.filter((user) => user._id !== userId));
        setTotalCount((prev) => prev - 1);
      } catch (err) {
        alert("Erreur lors de la suppression", err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="app-container">
      <Navbar count={totalCount} />

      <main style={{ padding: "0 2rem" }}>
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
