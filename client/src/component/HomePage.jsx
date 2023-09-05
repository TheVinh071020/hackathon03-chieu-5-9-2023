import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function HomePage() {
  // Boostrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => setShowEdit(true);

  // Tạo state để lưu tất cả user
  const [users, setUsers] = useState([]);

  // Map user
  const listUsers = () => {
    axios
      .get(`http://localhost:3000/api/v1/users/`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(users);

  // ADD

  const [newUser, setNewUser] = useState({
    name: "",
    decription: "",
  });
  // Lấy giá trị input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewUser((inputUser) => ({
      ...inputUser,
      [name]: value,
    }));
    console.log(newUser);
  };

  // SK click add
  const handleAddUser = (e) => {
    axios
      .post(`http://localhost:3000/api/v1/users/`, newUser)
      .then((res) => {
        listUsers();
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/api/v1/users/${id}`)
      .then((res) => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.student_id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Edit
  const [editUser, setEditUser] = useState({
    student_id: null,
    name: "",
    decription: "",
  });
  console.log(editUser);

  const handleEdit = (user) => {
    setEditUser({
      student_id: user.student_id,
      name: user.name,
      decription: user.decription,
    });
    handleShowEdit();
  };

  const handleUpdateUser = () => {
    axios
      .patch(
        `http://localhost:3000/api/v1/users/${editUser.student_id}`,
        editUser
      )
      .then((res) => {
        console.log(res.data);
        listUsers();
        handleCloseEdit();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Student List</h1>
      </div>
      <div className="btn-add">
        <Button onClick={handleShow} variant="success">
          Add Student
        </Button>
      </div>
      <div className="tables">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Decription</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.decription}</td>
                <td>
                  <th>
                    <Button onClick={() => handleEdit(user)} variant="info">
                      Update
                    </Button>
                  </th>
                  <th>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.student_id)}
                    >
                      Delete
                    </Button>
                  </th>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add */}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          <Form>
            <h1>Create Student</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleInput}
                name="name"
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Decription</Form.Label>
              <Form.Control
                onChange={handleInput}
                name="decription"
                type="text"
                placeholder="Decription"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add Student
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT */}
      <Modal show={showEdit} onHide={handleCloseEdit} animation={false}>
        <Modal.Body>
          <Form>
            <h1>Edit Student</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Decription</Form.Label>
              <Form.Control
                type="text"
                name="decription"
                placeholder="Decription"
                value={editUser.decription}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    decription: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Update Student
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomePage;
