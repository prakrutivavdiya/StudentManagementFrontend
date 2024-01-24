import React, { useState } from 'react';

const AddStudentPopup = ({ onClose, onStudentAdded, courses }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState('Male');
  const [selectedCourse, setSelectedCourse] = useState(courses[0].Course);
  const [error, setError] = useState('');

  const handleSave = async () => {
    // Client-side validation
    if (!name || !dateOfBirth || !gender || !selectedCourse) {
      setError('All fields are required');
      return;
    }

    const age = calculateAge(dateOfBirth);
    if (age <= 8) {
      setError('Student should be greater than 8 years old.');
      return;
    }

    const newStudent = { name, dateOfBirth, gender, courses: selectedCourse, age };

    try {
      const response = await fetch('http://localhost:3001/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (response.status === 200) {
        onStudentAdded(newStudent);
        onClose();
      } else {
        console.error('Error adding student:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const calculateAge = (dob) => {
    // Implement your logic to calculate age from date of birth
    // For simplicity, returning a constant value here
    return 10;
  };

  return (
    <div>
      <h2>Add Student</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Date Of Birth:</label>
      <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      <br />
      <label>Gender:</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br />
      <label>Courses:</label>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.Course}
          </option>
        ))}
      </select>
      <br />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default AddStudentPopup;
