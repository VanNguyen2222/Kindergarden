import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { TeachersContext } from "./TeachersContext";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const teachers = useContext(TeachersContext);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      console.log(user, "user");
      if (user) {
        const teacherEmail = teachers.map((teacher) => teacher.email);
        let dbRef;
        if (teacherEmail.includes(user.email)) {
          dbRef = ref(db, "teachers/" + user.uid);
        } else {
          dbRef = ref(db, "students/" + user.uid);
        }
        onValue(
          dbRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setUser({
                uid: user.uid,
                ...data,
                displayName: data.name,
              });
            } else {
              const { displayName, email, photoURL, phoneNumber, uid } = user;
              setUser({
                uid,
                displayName,
                photoURL,
                email,
                phoneNumber,
              });
            }
          },
          {
            onlyOnce: true,
          }
        );
      } else setUser(null);
    });
    return () => {
      unsubcribe();
    };
  }, [teachers]);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
