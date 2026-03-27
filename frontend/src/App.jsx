import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import userService from "./services/userService";

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

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <Navbar count={totalCount} />

      <main style={{ padding: "0 2rem" }}>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default App;
