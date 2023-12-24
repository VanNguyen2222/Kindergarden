import React, { useState, useEffect } from 'react';
import './EditStyle.scss';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useAlert } from 'react-alert';

const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function AddQuestion(props) {
    const { setIsOpenModal, handleAddQuestion, editingQuestion } = props
    const [name, setName] = useState("");
    const [options, setOptions] = useState(
        [{ id: uid(), text: "", isCorrect: false },
        { id: uid(), text: "", isCorrect: false }]
    );
    const alert = useAlert();

    useEffect(() => {
        if (editingQuestion) {
            console.log(editingQuestion)
            setName(editingQuestion.name)
            setOptions(editingQuestion.options)
        }
    }, [editingQuestion])

    const handleChangeAnswer = (e, id) => {
        const text = e.target.value;
        const newOptions = options.map(option => {
            if (option.id === id)
                return {
                    ...option,
                    text: text
                }
            return { ...option }
        });
        setOptions(newOptions);
    }

    const handleSetCorrect = id => {
        const newOptions = options.map((option) => {
            return {
                ...option,
                isCorrect: option.id === id ? true : false,
            }
        })
        setOptions(newOptions);
    }
    const handleAddOption = (e) => {
        e.preventDefault()
        setOptions([...options, { id: uid(), text: "", isCorrect: false }])
    }

    const handleSubmit = e => {
        e.preventDefault();
        const lastOptions = options.filter(option => option.text.trim().length > 0)
        const correct = options.find(option => option.isCorrect)
        if (!correct) {
            alert.error("You must choose one correct answer");
            return
        }
        if (lastOptions.length < 2) {
            alert.error("You must input 2 or more answers");
            return
        }

        let isMatching = false

        lastOptions.forEach(option => {
            let check = 0;
            lastOptions.forEach(o2 => {
                if (o2.text === option.text) check++
            })
            if (check >= 2) {
                isMatching = true
            }
        })

        if(isMatching) {
            alert.error("Have 2 or more matching option");
            return
        }

        let question = {
            id: `id${(new Date()).getTime()}`,
            name: name,
            options: lastOptions
        }

        if (editingQuestion) {
            question.id = editingQuestion.id
        }

        const type = editingQuestion ? "EDIT" : "ADD"

        handleAddQuestion(question, type)
        setIsOpenModal(false);
    }

    return (
        <div className='modal'>
            <form className="create-question-modal" onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Input question" required />
                {options.map((option, index) => {
                    return (
                        <div key={option.id}>
                            <div onClick={() => handleSetCorrect(option.id)} style={{ display: "inline-block" }}>
                                {option.isCorrect ? <FiberManualRecordIcon style={{ color: "#00FFAB", fontSize: '20px' }}></FiberManualRecordIcon> :
                                    <FiberManualRecordIcon style={{ color: "white", fontSize: '20px' }}></FiberManualRecordIcon>}
                                {/* <FiberManualRecordIcon style={{ fontSize:'20px' ,color: option.isCorrect ? "#00FFAB" : "white" }}/> */}
                            </div>
                            <input type="text" placeholder={`answer ${index + 1}`}
                                value={option.text}
                                onChange={(e) => handleChangeAnswer(e, option.id)}
                                required={index < 2 ? true : false}
                            />
                        </div>
                    )
                })}
                <button type="submit">Save</button>
                <button onClick={handleAddOption}>Add option</button>
                <button onClick={() => setIsOpenModal(false)}>Cancel</button>
            </form>
        </div>
    );
}

export default AddQuestion;