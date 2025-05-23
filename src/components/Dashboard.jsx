import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getMockStudents } from "../utils/MockStudentData";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AddStudent from "./AddStudent";
import { FaCircleArrowRight } from "react-icons/fa6";

const mock = new MockAdapter(axios, { delayResponse: 1000 });
mock.onGet("/api/students").reply(200, getMockStudents());

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/students").then((res) => setStudents(res.data));
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  const filteredStudents = courseFilter
    ? students.filter((s) => s.course === courseFilter)
    : students;

  return (
    <>
      <Header courseFilter={courseFilter} setCourseFilter={setCourseFilter} />
      <div className="p-6 pb-20 max-w-7xl mx-auto">
        {isLoggedIn && (
          <AddStudent
            onAddStudent={(student) =>
              setStudents((prev) => [
                ...prev,
                { id: prev.length + 1, ...student },
              ])
            }
          />
        )}

        <div className="overflow-x-auto rounded shadow border mt-16">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left text-lg italic font-semibold text-gray-700">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Course</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-blue-50 cursor-pointer text-base"
                >
                  <td className="p-3 border">{student.id}</td>
                  <td className="p-3 border">{student.name}</td>
                  <td className="p-3 border">{student.email}</td>
                  <td className="p-3 border">{student.course}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => navigate(`/studentdetails/${student.id}`)}
                      className="bg-gradient-to-r from-sky-500 to-blue-800 text-white font-bold flex text-lg italic w-full px-3 py-1 hover:bg-blue-600 gap-x-2 justify-center rounded-md "
                    >
                      <p>View</p>
                      <FaCircleArrowRight className="self-center" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
