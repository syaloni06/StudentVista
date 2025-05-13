import React, { useEffect, useState } from 'react';
import { auth, provider } from "../utils/firebase";
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const StudentDetails = ({ student }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };

  if (!student) {
    return <p className="text-gray-500">No student selected.</p>;
  }

  if (!isLoggedIn) {
    return (
      <div className="p-4 border rounded shadow">
        <p className="mb-2 font-medium">You must be logged in to view student details.</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-2">Student Details</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Course:</strong> {student.course}</p>
    </div>
  );
}

export default StudentDetails;
