import React from 'react';
import AddQuestion from './components/AddQuestion';
import { useData } from './hook';
import './HomeWork.scss';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Homework(props) {
    const { states, handles } = useData();
    const { homeworkName, isOpenModal, questions, editingQuestion } = states;
    const { setHomeworkName,
        setIsOpenModal,
        handleAddQuestion,
        handleEditQuestion,
        handleOpenModal,
        handleSubmitHw,
        handleDeleteQuestion } = handles;
    return (
        <div className='homeWorkMain'>
            <form action='' onSubmit={handleSubmitHw}>
                <label>Homework name</label>
                <input className='name' 
                value={homeworkName} 
                onChange={e => setHomeworkName(e.target.value)} 
                required
                />
                <button type='submit'>SUBMIT</button>
            </form>
            {questions.map((question, index) => (
                <div className='edit'>
                    <div className='editHeader'>
                        <div style={{float: 'left'}}><h5>Question {index+1}</h5></div>
                        <div style={{float: 'right'}}>
                            <button onClick={() => { handleEditQuestion(question) }}>
                                <EditIcon style={{fontSize: '20px'}}/>
                            </button>
                            <button onClick={() => { handleDeleteQuestion(question) }}>
                                <DeleteForeverIcon style={{fontSize: '20px'}}/>
                            </button>
                        </div>
                    </div>     
                    <div>{question.name}</div>
                    {question.options.map(option => (
                        <div className='answer'>
                            <FiberManualRecordIcon style={{ fontSize:'20px' ,color: option.isCorrect ? "green" : "red" }}/>{option.text}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleOpenModal}>Add question</button>
            {isOpenModal &&
                (<AddQuestion
                    setIsOpenModal={setIsOpenModal}
                    handleAddQuestion={handleAddQuestion}
                    editingQuestion={editingQuestion}
                />)
            }
        </div>
    );
}

export default Homework;