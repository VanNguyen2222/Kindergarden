import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import { ClassesContext } from "../../../components/ClassesContext";
import { useAlert } from 'react-alert';

export const useData = () => {
    const location = useLocation();
    const classId = location.pathname.split("/")[2]
    const { homeworkId } = useParams()
    const classes = useContext(ClassesContext)
    const currentClass = useMemo(() => classes.find(cClass => cClass.id === classId), [classId, classes])
    const currentHw = useMemo(() => currentClass?.homeworks?.find(hw => hw.id === homeworkId), [currentClass, homeworkId])

    const alert = useAlert();

    const [choosedAnswers, setChoosedAnswers] = useState([])
    const [isFinish, setIsFinish] = useState(false)
    const [score, setScore] = useState("");

    const handleChooseAnswer = (seletedOption) => {
        const questionId = Object.keys(seletedOption)[0]
        const optionId = seletedOption[questionId]
        if (choosedAnswers.some(answer => answer.questionId === questionId))
            setChoosedAnswers(choosedAnswers.map(answer => {
                if (answer.questionId === questionId)
                    return {
                        questionId,
                        optionId
                    }
                return answer
            }))
        else setChoosedAnswers([...choosedAnswers, { questionId, optionId }])
    }

    const handleFinish = () => {
        if (choosedAnswers.length < currentHw.questions.length) {
            const listQuestions = []
            currentHw.questions.forEach((question, index) => {
                if (!choosedAnswers.some(answer => answer.questionId === question.id))
                    listQuestions.push(index)
            })
            // const message = listQuestions.map(q => `${q + 1}`).join(", ")
            alert.error("Please complete all questions")
            return
        }
        setIsFinish(true)
        alert.success("FINISH")
    }

    useEffect(() => {
        if (isFinish) {
            let score = 0;
            currentHw.questions.forEach(q => {
                if (choosedAnswers
                    .find(answer => answer.questionId === q.id).optionId
                    === q.options.find(o => o.isCorrect).id) score++;
            })
            setScore(score+"/"+currentHw.questions.length)
        }
    }, [isFinish, choosedAnswers, currentHw])

    return {
        currentHw,
        states: {
            choosedAnswers,
            isFinish,
            score
        },
        handles: {
            handleChooseAnswer,
            handleFinish
        }
    }
}