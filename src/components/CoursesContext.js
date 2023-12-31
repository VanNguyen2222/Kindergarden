import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

const CoursesContext = createContext();
function CoursesProvider({ children }) {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    const dbRef = ref(db, "courses");
    onValue(dbRef, (snapshot) => {
      let courses = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        let classes = [];
        if (childData?.classes) {
          Object.keys(childData.classes).forEach((key) => {
            classes.push(childData.classes[key]);
          });
        }
        const course = {
          id: childKey,
          ...childData,
          classes,
        };
        if (course.isActive && !course.isDeleted)
          courses.push(course);
      });
      setCourses(courses);
    });
  }, []);
  return (
    <CoursesContext.Provider value={courses}>
      {children}
    </CoursesContext.Provider>
  );
}
export { CoursesContext };
export default CoursesProvider;
