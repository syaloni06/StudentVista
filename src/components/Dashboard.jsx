import React, { useState, useEffect } from "react";
import { auth, provider } from "../utils/firebase"; 
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getMockStudents } from "../utils/MockStudentData";
import StudentDetails from "./StudentDetails";

const mock = new MockAdapter(axios, { delayResponse: 1000 });
mock.onGet("/api/students").reply(200, getMockStudents());

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    axios.get("/api/students").then((res) => setStudents(res.data));

    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const { name, email, course } = newStudent;
    if (!name || !email || !course || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please fill in all fields with a valid email.");
      return;
    }
    setStudents([...students, { id: students.length + 1, ...newStudent }]);
    setNewStudent({ name: "", email: "", course: "" });
  };

  const filteredStudents = courseFilter
    ? students.filter((s) => s.course === courseFilter)
    : students;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      {!isLoggedIn && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
          onClick={handleLogin}
        >
          Login with Google to Add Student
        </button>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Filter by Course:</label>
        <select
          className="border px-2 py-1 rounded"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
        </select>
      </div>

      <ul className="space-y-2 mb-6">
        {filteredStudents.map((student) => (
          <li
            key={student.id}
            className="border p-4 rounded shadow-sm flex justify-between items-center cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-gray-600">{student.email}</p>
              <p className="text-sm">Course: {student.course}</p>
            </div>
          </li>
        ))}
        <StudentDetails student={selectedStudent} />
      </ul>

      {isLoggedIn && (
        <form className="space-y-4" onSubmit={handleAddStudent}>
          <h2 className="text-xl font-semibold">Add New Student</h2>
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Course"
            className="w-full border p-2 rounded"
            value={newStudent.course}
            onChange={(e) =>
              setNewStudent({ ...newStudent, course: e.target.value })
            }
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Add Student
          </button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
