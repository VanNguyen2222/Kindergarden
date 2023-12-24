import React from 'react';
import { useData } from './hook';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';
import "./DoHomework.scss"

function DoHomework(props) {
    const { currentHw, handles, states } = useData();
    const { choosedAnswers, isFinish, score } = states;
    const { handleChooseAnswer, handleFinish } = handles;

    return (
        <div className='container'>
            {!isFinish ?
                <div className='qs-list'>
                    {currentHw && currentHw.questions.map((q, index) => (
                        <Test
                            onOptionSelect={handleChooseAnswer}
                            style={{ margin: "24px 12px", width: "50%" }}
                        >
                            <QuestionGroup questionNumber={q.id} style={{ width: "100%" }}>
                                <Question style={{ fontWeight: "bold" }}>
                                    {`Question ${index + 1}. ${q.name}`}
                                </Question>
                                {q.options.map(o => (
                                    <Option style={{ option: { width: "100%", wordWrap: "break-word" } }} key={o.id} value={o.id}>{o.text}</Option>
                                ))}
                            </QuestionGroup>
                        </Test>
                    ))}
                    <div className='qs-btn btn-font' onClick={handleFinish} style={{ width: "100px" }}>FINISH</div>
                </div> :
                <>
                    <div className='score btn-font'>Your score: {score}</div>
                    <div className='answer-list'>
                        {currentHw && currentHw.questions.map((q, index) => (
                            <div
                                className={`answer-item ${choosedAnswers
                                    .find(answer => answer.questionId === q.id).optionId
                                    === q.options.find(o => o.isCorrect).id ?
                                    "answer-item--true" : "answer-item--false"
                                    }`}
                                key={q.id}
                            >
                                <div className='answer-name'>{`Câu ${index + 1}. ${q.name}`}</div>
                                <div className='option-list'>
                                    {q.options.map(o => (
                                        <div
                                            className={`option-item ${choosedAnswers
                                                .find(answer => answer.questionId === q.id).optionId === o.id ?
                                                "option-item--choosed" : ""}`}
                                            key={o.id}
                                            style={{
                                                color: choosedAnswers
                                                    .find(answer => answer.questionId === q.id).optionId === o.id ?
                                                    o.isCorrect ? "green" : "red" :
                                                    o.isCorrect ? "green" : "unset",
                                            }}
                                        >
                                            <div
                                                className='circle'
                                                style={{
                                                    backgroundColor: choosedAnswers
                                                        .find(answer => answer.questionId === q.id).optionId === o.id ?
                                                        o.isCorrect ? "#00c985" : "#ec0b43" :
                                                        o.isCorrect ? "#00c985" : "unset",
                                                }}></div>
                                            {o.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div >
    );
}

export default DoHomework;