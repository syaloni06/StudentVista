import { PiStudentFill } from "react-icons/pi";
import { IoLogoVimeo } from "react-icons/io";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({ courseFilter, setCourseFilter }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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

  return (
    <div className="flex justify-between items-center bg-white text-sky-600 shadow-lg top-0 fixed w-full z-50 h-16 px-4 sm:px-8">
      {/* Logo and Name */}
      <Link
          to="/" className="flex items-center text-2xl lg:text-3xl font-bold italic">
        <PiStudentFill className="text-4xl text-sky-600 rounded-full border-2 p-1 border-sky-600" />
        <span className="hidden sm:inline ml-1">
          Student
          <IoLogoVimeo className="hidden sm:inline self-center" />
          ista
        </span>
      </Link>

      {/* Controls: Filter and Login */}
      <div className="flex items-center space-x-4">
        {/* Course Filter Dropdown */}
        <select
          className="border border-sky-400 text-sky-700 px-3 py-1 rounded shadow-sm focus:outline-none focus:ring"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          <option value="Math">Math</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
        </select>

        {/* Login Button */}
        {!isLoggedIn && (
          <button
            className="bg-sky-600 text-white px-4 py-1 rounded hover:bg-sky-700 transition duration-200"
            onClick={handleLogin}
          >
            Login to Add Student 
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
