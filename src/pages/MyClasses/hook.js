import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { ClassesContext } from '../../components/ClassesContext';

export const useData = () => {
    const user = useContext(AuthContext);
    const classes = useContext(ClassesContext);
    const [myClasses, setMyClasses] = useState([]);

    useEffect(() => {
        if (user && classes) {
            if (user.role === "teacher")
                setMyClasses(
                    classes.filter(cClass =>
                        cClass.teacherId === user.uid)
                );
            else
                setMyClasses(
                    classes.filter(cClass =>
                        cClass.students.find(student =>
                            student?.id === user?.uid &&
                            (student.isActive || cClass?.isFinished)))
                )
        }
    }, [user, classes])
    return {
        myClasses
    }
};