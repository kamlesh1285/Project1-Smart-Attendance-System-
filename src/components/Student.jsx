import { useState, useEffect } from "react";

function Student() {

  // Load Data from Local Storage

  const [students, setStudents] = useState(() => {

    const savedStudents =
      localStorage.getItem("students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : [];
  });

  // States

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [contact, setContact] = useState("");

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [searchedStudent,
    setSearchedStudent] = useState(null);

  // Save Data

  useEffect(() => {

    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );

  }, [students]);

  // Add or Update Student

  const addStudent = () => {

    if (
      name === "" ||
      course === "" ||
      contact === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    // Update Student

    if (editingId !== null) {

      const updatedStudents =
        students.map((student) =>

          student.id === editingId

            ? {
                ...student,
                name,
                course,
                contact
              }

            : student
        );

      setStudents(updatedStudents);

      setEditingId(null);

    }

    // Add Student

    else {

      const newStudent = {

        id: Date.now(),

        name,
        course,
        contact,

        present: false,

        attendance:
          Math.floor(Math.random() * 41) + 60
      };

      setStudents([
        ...students,
        newStudent
      ]);
    }

    // Clear Inputs

    setName("");
    setCourse("");
    setContact("");
  };

  // Edit Student

  const editStudent = (student) => {

    setName(student.name);

    setCourse(student.course);

    setContact(student.contact);

    setEditingId(student.id);
  };

  // Delete Student

  const deleteStudent = (id) => {

    const updatedStudents =
      students.filter(
        (student) =>
          student.id !== id
      );

    setStudents(updatedStudents);
  };

  // Toggle Attendance

  const toggleAttendance = (id) => {

    const updatedStudents =
      students.map((student) =>

        student.id === id

          ? {
              ...student,
              present: !student.present
            }

          : student
      );

    setStudents(updatedStudents);
  };

  // Search Student

  const handleSearch = () => {

    const foundStudent =
      students.find(

        (student) =>

          student.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          student.id
            .toString()
            .includes(search)
      );

    setSearchedStudent(foundStudent);

    if (!foundStudent) {
      alert("Student Not Found");
    }
  };

  return (

    <div className="student-container">

      {/* Header */}

      <div className="header">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="College Logo"
          className="college-logo"
        />

        <div>

          <h1>
            ABC Institute of Technology
          </h1>

          <p>
            Smart Attendance Management System
          </p>

        </div>

      </div>

      {/* Management Panel */}

      <h2 className="management-title">

        Management Panel

      </h2>

      <div className="form">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Enter Course"
          value={course}
          onChange={(e) =>
            setCourse(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Enter Contact"
          value={contact}
          onChange={(e) =>
            setContact(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={addStudent}
        >

          {
            editingId !== null
              ? "Update Student"
              : "Add Student"
          }

        </button>

      </div>

      {/* Student Search */}

      <h2 className="search-title">

        Student Search Dashboard

      </h2>

      <div className="search-container">

        <input
          type="text"
          placeholder="Search by Name or ID"
          className="search-box"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

      {/* Student Dashboard */}

      {
        searchedStudent && (

          <div className="student-dashboard">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Student"
              className="student-image"
            />

            <h2>
              {searchedStudent.name}
            </h2>

            <p>

              <strong>ID:</strong>{" "}

              {
                searchedStudent.id
                  .toString()
                  .slice(-4)
              }

            </p>

            <p>

              <strong>Course:</strong>{" "}

              {searchedStudent.course}

            </p>

            <p>

              <strong>Contact:</strong>{" "}

              {searchedStudent.contact}

            </p>

            <p>

              <strong>College:</strong>{" "}

              ABC Institute of Technology

            </p>

            <p>

              <strong>Attendance:</strong>{" "}

              {
                searchedStudent.attendance
              }%

            </p>

            <p
              className={
                searchedStudent.present
                  ? "present"
                  : "absent"
              }
            >

              {
                searchedStudent.present
                  ? "Present"
                  : "Absent"
              }

            </p>

          </div>
        )
      }

      {/* Management Table */}

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Course</th>

            <th>Contact</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {
            students.map((student) => (

              <tr key={student.id}>

                <td>

                  {
                    student.id
                      .toString()
                      .slice(-4)
                  }

                </td>

                <td>
                  {student.name}
                </td>

                <td>
                  {student.course}
                </td>

                <td>
                  {student.contact}
                </td>

                <td>

                  {
                    student.present
                      ? "Present"
                      : "Absent"
                  }

                </td>

                <td>

                  <button
                    onClick={() =>
                      toggleAttendance(
                        student.id
                      )
                    }
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() =>
                      editStudent(student)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteStudent(
                        student.id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default Student;


