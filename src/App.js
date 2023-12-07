import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import axios from 'axios';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(`${SERVER_URL}/todos`);
    setTodos(response.data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${SERVER_URL}/todos`, formData);
    setFormData({ title: '', description: '' });
    fetchTodos();
  };

  const handleEdit = async (id) => {
    // Implement edit functionality if needed
    console.log('Edit Todo with ID:', id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`localhost:5000/todos/${id}`);
    fetchTodos();
  };

  return (
    <Container className="mt-5">
      <Typography variant="h2" gutterBottom>
        React CRUD App
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Todo
        </Button>
      </form>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo._id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(todo._id)}>
                    Edit
                  </Button>{' '}
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(todo._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;