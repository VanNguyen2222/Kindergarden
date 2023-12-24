import { useParams } from "react-router-dom"
import { useEffect, useState, useContext, useMemo } from "react";
import { ClassesContext } from "../../../components/ClassesContext";
import { AuthContext } from "../../../components/AuthContext";
import { StudentsContext } from "../../../components/StudentsContext";
import { ref, update } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { useAlert } from "react-alert";

export const useData = () => {
    const user = useContext(AuthContext);
    const { classId } = useParams();
    const classes = useContext(ClassesContext);
    const students = useContext(StudentsContext);
    const [currentClass, setCurrentClass] = useState({});

    console.log(currentClass)

    const alert = useAlert();

    const handleLockHw = (hwId, isActive) => {
        const updates = {};
        updates['/classes/' + currentClass.id + '/homeworks/' + hwId + '/isActive'] = !isActive;
        update(ref(db), updates)
            .then(() => alert.success(`${isActive ? "lock" : "unlock"} homework successful`))
            .catch(error => alert.error(`${isActive ? "lock" : "unlock"} homework failed`))
    }

    const handleLockDoc = (docId, isActive) => {
        const updates = {};
        updates['/classes/' + currentClass.id + '/documents/' + docId + '/isActive'] = !isActive;
        update(ref(db), updates)
            .then(() => alert.success(`${isActive ? "lock" : "unlock"} document successful`))
            .catch(error => alert.error(`${isActive ? "lock" : "unlock"} document failed`))
    }

    const memberList = useMemo(
        () => students?.filter(student =>
            currentClass?.students?.some(member =>
                member.id === student.uid))
        , [students, currentClass])

    const homework = useMemo(
        () => user?.role === "student" ? currentClass?.homeworks?.filter(hw => hw.isActive) : currentClass?.homeworks
        , [currentClass, user])

    const documents = useMemo(
        () => user?.role === "student" ? currentClass?.documents?.filter(doc => doc.isActive) : currentClass?.documents
        , [currentClass, user])

    useEffect(() => {
        if (classId && classes) {
            setCurrentClass(
                classes.find(cClass => cClass.id === classId)
            )
        }
    }, [classId, classes])
    return {
        currentClass,
        user,
        memberList,
        handleLockHw,
        handleLockDoc,
        homework,
        documents
    }
}