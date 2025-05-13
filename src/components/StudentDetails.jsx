import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch student data by ID
  useEffect(() => {
    axios.get("/api/students").then((res) => {
      const found = res.data.find((s) => s.id === parseInt(id));
      setStudent(found);
    });
  }, [id]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  // No student found
  if (!student) {
    return <p className="p-4 text-gray-500">Loading student details...</p>;
  }

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-6">
        <p className="mb-3 font-medium text-gray-700">
          You must be logged in to view student details.
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    );
  }

  // Show details
  return (
    <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Student Details</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Course:</strong> {student.course}</p>
    </div>
  );
};

export default StudentDetails;
