import { useState } from "react";

const AddStudent = ({ onAddStudent }) => {
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
    address: "",
    yearOfAdmission: ""
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

    if (!newStudent.course.trim()) {
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
      yearOfAdmission: ""
    });
    setErrors({});
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="mt-14 mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Student
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
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
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

              <InputField
                label="Course"
                value={newStudent.course}
                onChange={(val) => setNewStudent({ ...newStudent, course: val })}
                error={errors.course}
              />

              <InputField
                label="Phone"
                value={newStudent.phone}
                onChange={(val) => setNewStudent({ ...newStudent, phone: val })}
                error={errors.phone}
              />

              <InputField
                label="Address"
                value={newStudent.address}
                onChange={(val) => setNewStudent({ ...newStudent, address: val })}
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
      className={`w-full border p-2 rounded ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default AddStudent;
