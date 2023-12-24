import { useState, useContext, useMemo, useEffect } from "react";
import { push, ref, update } from 'firebase/database';
import { db } from "../../../firebaseConfig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ClassesContext } from "../../../components/ClassesContext";
import { useAlert } from 'react-alert';

export const useData = () => {
    const [homeworkName, setHomeworkName] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null)
    const location = useLocation();
    const classId = location.pathname.split("/")[2]
    const alert = useAlert();
    const navigate = useNavigate()


    const { homeworkId } = useParams()

    const classes = useContext(ClassesContext)

    const currentClass = useMemo(() => classes.find(cClass => cClass.id === classId), [classId, classes])
    const currentHw = useMemo(() => currentClass?.homeworks?.find(hw => hw.id === homeworkId), [currentClass, homeworkId])
    const isAdd = useMemo(() => !homeworkId, [homeworkId])

    useEffect(() => {
        if (!isAdd)
            if (currentHw) {
                setHomeworkName(currentHw.name)
                setQuestions(currentHw.questions)
            }
    }, [isAdd, currentHw])

    const handleOpenModal = () => {
        setIsOpenModal(true)
        setEditingQuestion(null)
    }

    const handleEditQuestion = (question) => {
        setIsOpenModal(true)
        console.log(question)
        setEditingQuestion(question)
    }

    const handleDeleteQuestion = question => {
        const newQuestions = questions.filter(cQuestion => cQuestion.id !== question.id)
        setQuestions(newQuestions)
    }

    const handleAddQuestion = (question, type) => {
        console.log(type)
        if (type === "ADD")
            setQuestions([...questions, question])
        else {
            console.log(question)
            let newQuestions = [...questions]
            newQuestions = newQuestions.map(nQuestion => {
                if (nQuestion.id === question.id) {
                    return { ...question }
                }
                return nQuestion;
            })
            console.log(newQuestions)
            setQuestions(newQuestions)
        }
    }

    const handleSubmitHw = (e) => {
        e.preventDefault()
        if (homeworkName.trim().length <= 0) {
            alert.error("Please input homework name!")
            return
        }
        if (questions.length <= 0) {
            alert.error("Please add 1 or more question!")
            return
        }
        if (isAdd) {
            const refHw = ref(db, 'classes/' + classId + '/homeworks')
            push(refHw, {
                name: homeworkName,
                questions: questions,
                isActive: true
            }).then(() => {
                alert.success("Add homework successful!")
            }).catch(error => alert.eror("Add homework failed!"))
            navigate(-1)
        } else {
            const updates = {};

            updates['/classes/' + classId + '/homeworks/' + homeworkId + '/name'] = homeworkName;
            updates['/classes/' + classId + '/homeworks/' + homeworkId + '/questions'] = questions;

            update(ref(db), updates)
                .then(() => {
                    alert.success("Update homework successful!")
                })
                .catch((error) => {
                    alert.error("Update homework failed!")
                })
            // const refHw = ref(db, 'classes/' + classId + '/homework/' + homeworkId)
            // set(refHw, {
            //     name: homeworkName,
            //     questions: questions
            // });
            navigate(-1)
        }
    }

    return {
        states: {
            homeworkName,
            isOpenModal,
            questions,
            editingQuestion
        },
        handles: {
            setHomeworkName,
            setIsOpenModal,
            handleAddQuestion,
            handleEditQuestion,
            handleOpenModal,
            handleSubmitHw,
            handleDeleteQuestion
        }
    }
}