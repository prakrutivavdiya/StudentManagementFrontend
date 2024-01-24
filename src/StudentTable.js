import React from 'react';

const StudentTable = ({ students, onDeleteStudent }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date Of Birth</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => {let age=new Date().getFullYear()-new Date(student.DateOfBirth).getFullYear();
        return (
          <tr key={student.StudentId} >
            <td>{student.Name}</td>
            <td>{new Date(student.DateOfBirth).getDate()+"-"+(new Date(student.DateOfBirth).getMonth()+1)+"-"+new Date(student.DateOfBirth).getFullYear()}</td>
            <td style={{ color: age <= 10 ? 'red' : 'inherit' }}>{age}</td>
            <td>{student.Gender}</td>
            <td>
              <button onClick={() => onDeleteStudent(student.StudentId)}>Delete</button>
            </td>
          </tr>
        )
        }
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;
