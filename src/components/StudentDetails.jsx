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
      <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-20">
        <p className="mb-3 font-medium text-gray-700">
          You must be logged in to view student details.
        </p>
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-sky-500 to-blue-800 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    );
  }

  // Show details
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-4">
          <h2 className="text-4xl font-extrabold text-gray-800 border-b-2 pb-2 bg-gradient-to-r from-sky-500 to-blue-800 italic text-transparent bg-clip-text">
            Student Details
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {student.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {student.email}
            </p>
            <p>
              <span className="font-semibold">Course:</span> {student.course}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {student.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {student.address}
            </p>
            <p>
              <span className="font-semibold">Year of Admission:</span>{" "}
              {student.yearOfAdmission}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
