import Axios from "axios";
import { useEffect, useState } from "react";

export const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await Axios.get("http://localhost:3008/api/user");
        setUsers(data.users);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  // Handle input changes
  const handleChange = (e, userId) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [userId]: { ...formData[userId], [name]: value },
    });
  };

  // Handle edit/save toggle
  const toggleEdit = (userId) => {
    if (editingRowId === userId) {
      // Save changes to the database
      Axios.put(`http://localhost:3008/api/user/${userId}`, formData[userId])
        .then((response) => {
          const updatedUser = response.data.updatedUser;
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user._id === userId ? updatedUser : user))
          );
          setEditingRowId(null); // Stop editing mode
        })
        .catch((err) => console.error(err));
    } else {
      // Enter edit mode
      setEditingRowId(userId);
    }
  };

  return (
    <>
      <h1>User Info</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
            <th>City</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {editingRowId === user._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={formData[user._id]?.name || user.name}
                      onChange={(e) => handleChange(e, user._id)}
                    />
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={formData[user._id]?.password || user.password}
                      onChange={(e) => handleChange(e, user._id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="city"
                      value={formData[user._id]?.city || user.city}
                      onChange={(e) => handleChange(e, user._id)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="DOB"
                      value={formData[user._id]?.DOB || user.DOB.split("T")[0]}
                      onChange={(e) => handleChange(e, user._id)}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.password}</td>
                  <td>{user.city}</td>
                  <td>{new Date(user.DOB).toLocaleDateString()}</td>
                </>
              )}
              <td>
                <button onClick={() => toggleEdit(user._id)}>
                  {editingRowId === user._id ? "SAVE" : "EDIT"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
