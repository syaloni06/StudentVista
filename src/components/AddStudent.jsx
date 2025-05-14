import { useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
const AddStudent = ({ onAddStudent }) => {
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
    address: "",
    yearOfAdmission: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!newStudent.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!newStudent.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(newStudent.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!newStudent.course) {
      newErrors.course = "Course is required.";
    }

    if (!newStudent.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(newStudent.phone)) {
      newErrors.phone = "Phone must be a 10-digit number.";
    }

    if (!newStudent.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!newStudent.yearOfAdmission.trim()) {
      newErrors.yearOfAdmission = "Year of Admission is required.";
    } else if (
      !/^\d{4}$/.test(newStudent.yearOfAdmission) ||
      +newStudent.yearOfAdmission <= 2010 ||
      +newStudent.yearOfAdmission > currentYear
    ) {
      newErrors.yearOfAdmission = `Enter a valid year between 2010 and ${currentYear}.`;
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddStudent(newStudent);
    setNewStudent({
      name: "",
      email: "",
      course: "",
      phone: "",
      address: "",
      yearOfAdmission: "",
    });
    setErrors({});
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="mt-14 mb-4 bg-gradient-to-r from-sky-500 to-blue-800 text-white flex gap-2 px-4 py-2 rounded"
      >
        <BsPersonFillAdd className="text-lg self-center" />
        <p className="font-bold italic">Add Student</p>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold  bg-gradient-to-r from-sky-500 to-blue-800 italic text-transparent bg-clip-text mb-4">
                Add New Student
              </h2>

              <InputField
                label="Name"
                value={newStudent.name}
                onChange={(val) => setNewStudent({ ...newStudent, name: val })}
                error={errors.name}
              />

              <InputField
                label="Email"
                type="email"
                value={newStudent.email}
                onChange={(val) => setNewStudent({ ...newStudent, email: val })}
                error={errors.email}
              />

              <select
                className={`border-2 ${
                  errors.course ? "border-red-500" : "border-sky-500"
                } px-1 py-2 mb-4 text-gray-400 rounded shadow-sm focus:outline-none focus:ring w-full`}
                value={newStudent.course}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, course: e.target.value })
                }
              >
                <option value="">Select Course</option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
              </select>
              {errors.course && (
                <p className="text-red-500 text-sm mt-1">{errors.course}</p>
              )}

              <InputField
                label="Phone"
                value={newStudent.phone}
                onChange={(val) => setNewStudent({ ...newStudent, phone: val })}
                error={errors.phone}
              />

              <InputField
                label="Address"
                value={newStudent.address}
                onChange={(val) =>
                  setNewStudent({ ...newStudent, address: val })
                }
                error={errors.address}
              />

              <InputField
                label="Year of Admission"
                value={newStudent.yearOfAdmission}
                onChange={(val) =>
                  setNewStudent({ ...newStudent, yearOfAdmission: val })
                }
                error={errors.yearOfAdmission}
              />

              <button
                type="submit"
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              >
                Add Student
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const InputField = ({ label, value, onChange, error, type = "text" }) => (
  <div className="mb-3">
    <input
      type={type}
      placeholder={label}
      className={`w-full border p-2 rounded shadow-sm focus:outline-none focus:ring ${
        error ? "border-red-500" : "border-sky-500"
      }`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default AddStudent;
