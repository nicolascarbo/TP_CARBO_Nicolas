import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import userService from "./services/userService";
import UserCard from "./components/UserCard/UserCard";

const App = () => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <Navbar count={totalCount} />
      <main style={{ padding: "2rem" }}>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {users.map((user) => (
              <UserCard key={user._id} user={user} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
