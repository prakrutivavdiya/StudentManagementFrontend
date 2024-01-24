import React, { useState, useEffect } from 'react';
import StudentTable from './StudentTable';
import AddStudentPopup from './AddStudentPopup';

const StudentManagementApp = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/getAllStudents');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3001/getAllCourses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddButtonClick = () => {
    setIsAddPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsAddPopupOpen(false);
  };

  const handleStudentAdded = async (newStudent) => {
    try {
      const response = await fetch('http://localhost:3001/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: newStudent,
      });

      if (response.status === 200) {
        // Add the new student to the students list
        setStudents((prevStudents) => [...prevStudents, newStudent]);
        setIsAddPopupOpen(false);
      } else {
        console.error('Error adding student:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteStudent/${studentId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Delete the student from the list
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
      } else if (response.status === 404) {
        console.error('Student not found');
      } else {
        console.error('Error deleting student:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <button onClick={handleAddButtonClick}>Add New</button>
      <StudentTable students={students} onDeleteStudent={handleDeleteStudent} />
      {isAddPopupOpen && (
        <AddStudentPopup
          onClose={handlePopupClose}
          onStudentAdded={handleStudentAdded}
          courses={courses}
        />
      )}
    </div>
  );
};

export default StudentManagementApp;
