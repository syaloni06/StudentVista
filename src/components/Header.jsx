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
    <div className="flex justify-between items-center bg-white shadow-lg top-0 fixed w-full z-50 h-16 px-4 sm:px-8">
      {/* Logo and Name */}
      <Link
        to="/"
        className="flex items-center text-2xl lg:text-3xl font-bold italic"
      >
        <PiStudentFill className="text-4xl text-sky-600 rounded-full border-2 p-1 border-sky-600" />
        <span className="hidden sm:flex ml-1">
          <p className="bg-gradient-to-r flex from-sky-500 to-blue-600 text-transparent bg-clip-text">
            Student
          </p>
          <IoLogoVimeo className="hidden sm:inline self-end text-4xl text-blue-700" />
          <p className="bg-gradient-to-r flex from-blue-700 to-blue-800 text-transparent bg-clip-text">
            ista
          </p>
        </span>
      </Link>

      {/* Controls: Filter and Login */}
      <div className="flex items-center space-x-4">
        {/* Course Filter Dropdown */}
        {location.pathname === "/" && (
        <select
          className="border-2 border-sky-500 text-blue-700 font-bold px-1 sm:px-3 sm:py-1 text-sm sm:text-base rounded shadow-sm focus:outline-none focus:ring"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          <option value="Math">Math</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
        </select>
      )}

        {/* Login Button */}
        {!isLoggedIn && (
          <button
            className="bg-gradient-to-r from-sky-500 to-blue-800 text-white px-1 sm:px-4 py-1 rounded transition duration-200 text-sm sm:text-base font-bold"
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
