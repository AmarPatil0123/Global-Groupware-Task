import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EditUserData from "../components/EditUserData";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}api/users?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    handleClose();
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5 text-center">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th className="text-center">Avatar</th>
            <th className="text-center">First Name</th>
            <th className="text-center">Last Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="align-middle text-center">
                <img src={user.avatar} alt="Avatar" className="rounded-circle" width="50" />
              </td>
              <td className="align-middle text-center">{user.first_name}</td>
              <td className="align-middle text-center">{user.last_name}</td>
              <td className="align-middle text-center">
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-primary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {/* Edit User Dialog */}
      {selectedUser && (
        <EditUserData
          open={open}
          handleClose={handleClose}
          user={selectedUser}
          handleUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default Home;