import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const EditUserData = ({ open, handleClose, user, handleUpdateUser }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser)
        handleUpdateUser({ ...user, ...updatedUser });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserData;
