import { onValue, ref } from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export const StudentsContext = createContext();
function StudentsProvider({ children }) {
  const [students, setStudents] = useState(null);
  useEffect(() => {
    const studentsRef = ref(db, "students/");
    onValue(studentsRef, (snapshot) => {
      let students = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        const student = {
          uid: childKey,
          ...childData,
        };
        students.push(student);
      });
      setStudents(students);
    });
  }, []);
console.log(students,"student******");
  return (
    <StudentsContext.Provider value={students}>
      {children}
    </StudentsContext.Provider>
  );
}

export default StudentsProvider;
