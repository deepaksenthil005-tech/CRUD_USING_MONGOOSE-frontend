import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    department_id: "",
    emp_name: "",
    email: "",
    age: "",
    gender: "",
    department: "",
    salary: "",
  });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/employee_details";

  const fetchEmployees = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setEditId(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setFormData({
      department_id: "",
      emp_name: "",
      email: "",
      age: "",
      gender: "",
      department: "",
      salary: "",
    });

    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setEditId(emp._id);
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            name="department_id"
            type="number"
            placeholder="Department ID"
            value={formData.department_id}
            onChange={handleChange}
            required
          />

          <input
            name="emp_name"
            placeholder="Employee Name"
            value={formData.emp_name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          <button className="primary-btn">
            {editId ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td data-label="Department ID">{emp.department_id}</td>
                <td data-label="Employee Name">{emp.emp_name}</td>
                <td data-label="Email">{emp.email}</td>
                <td data-label="Age">{emp.age}</td>
                <td data-label="Gender">{emp.gender}</td>
                <td data-label="Department">{emp.department}</td>
                <td data-label="Salary">{emp.salary}</td>
                <td data-label="Action">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
