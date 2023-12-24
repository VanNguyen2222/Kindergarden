import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

const ClassesContext = createContext();
function ClassesProvider({ children }) {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const dbRef = ref(db, "classes");
    onValue(dbRef, (snapshot) => {
      let classes = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // let classes = []
        // if(childData.classes) {
        //     Object.keys(childData.classes).forEach(key => {
        //         classes.push(childData.classes[key])
        //     })
        // }
        let students = [];
        if (childData?.students) {
          Object.keys(childData.students).forEach((key) => {
            students.push({
              id: key,
              isActive: childData.students[key].isActive,
            });
          });
        }
        let homeworks = [];
        if (childData?.homeworks) {
          Object.keys(childData.homeworks).forEach((key) => {
            homeworks.push({
              id: key,
              ...childData.homeworks[key]
            });
          });
        }
        let documents = [];
        if (childData?.documents) {
          Object.keys(childData.documents).forEach((key) => {
            documents.push({
              id: key,
              ...childData.documents[key]
            });
          });
        }
        const cClass = {
          id: childKey,
          ...childData,
          students,
          homeworks,
          documents
        };
        if (cClass.isActive && !cClass.isDeleted)
          classes.push(cClass);
      });
      setClasses(classes);
    });
  }, []);
  return (
    <ClassesContext.Provider value={classes}>
      {children}
    </ClassesContext.Provider>
  );
}
export { ClassesContext };
export default ClassesProvider;
