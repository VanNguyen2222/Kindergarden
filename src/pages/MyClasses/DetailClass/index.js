import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from './hook';
import './DetailClassStyle.scss';
import { Edit, Lock, LockOpen } from '@material-ui/icons';

function DetailClass(props) {
    const { currentClass = {}, user = {}, memberList = [],
        handleLockHw, homework = [],
        documents = [], handleLockDoc } = useData();

    return (
        <div className='detailMain'>
            <div className='title-big'>
                <h2 className='btn-font'>{currentClass.name}</h2>
            </div>
            <div className='homeWorkList'>
                <label>Homework list</label>
                <div className='title'>
                    <div>Name</div>
                    <div>Total Question</div>
                    {user?.role === "teacher" &&
                        <div>Action</div>}
                </div>
                {homework.length > 0 ?
                    homework.map(homework => (
                        user?.role === "teacher" ?
                            <div
                                key={homework.id}
                                className="listHW"
                            >
                                <div className="itemHW"><h2>{homework.name}</h2></div>
                                <div className="itemHW"><h2>{homework.questions.length}</h2></div>
                                <div className="itemHW action">
                                    <Link
                                        style={{ textDecoration: "none", marginRight: "20px" }}
                                        to={user.role === "teacher" ?
                                            `hw/${homework.id}` :
                                            `hw/do/${homework.id}`}
                                    >
                                        <Edit style={{ fontSize: "30px" }} />
                                    </Link>
                                    <div className='lock'
                                        onClick={() => handleLockHw(homework.id, homework.isActive)}
                                    >
                                        {homework.isActive ?
                                            <LockOpen style={{ fontSize: "30px" }} /> :
                                            <Lock style={{ fontSize: "30px" }} />}
                                    </div>
                                </div>
                            </div> :
                            <Link
                                key={homework.id}
                                className="listHW"
                                to={`hw/do/${homework.id}`}
                            >
                                <div className="itemHW"><h2>{homework.name}</h2></div>
                                <div className="itemHW"><h2>{homework.questions.length}</h2></div>
                            </Link>
                    )) :
                    <h2>Exercises not added yet</h2>}
                {user && user.role === "teacher" &&
                    <Link to="hw/add"><button>Add Homework</button></Link>
                }
            </div>

            <div className='homeWorkList'>
                <label>Document List</label>
                <div className='title'>
                    <div>Name</div>
                    {user?.role === "teacher" &&
                        <div>Action</div>}
                </div>
                {documents?.length > 0 ? documents.map(document => (
                    user?.role === "teacher" ?
                        <div
                            key={document.id}
                            className="listHW"
                        >
                            <div className="itemHW"><h2>{document.name}</h2></div>
                            <div className="itemHW action">
                                <Link
                                    style={{ textDecoration: "none", marginRight: "20px" }}
                                    to={`doc/${document.id}`}
                                >
                                    <Edit style={{ fontSize: "30px" }} />
                                </Link>
                                <div className='lock'
                                    onClick={() => handleLockDoc(document.id, document.isActive)}
                                >
                                    {document.isActive ?
                                        <LockOpen style={{ fontSize: "30px" }} /> :
                                        <Lock style={{ fontSize: "30px" }} />}
                                </div>
                            </div>
                        </div> :
                        <Link
                            key={document.id}
                            className="listHW"
                            to={`doc/${document.id}`}
                        >
                            <div className="itemHW"><h2>{document.name}</h2></div>
                        </Link>
                )) : <h2>The document has not been added yet</h2>}
                {user && user.role === "teacher" &&
                    <Link to="doc/add"><button>Add Document</button></Link>
                }
            </div>

            {user && user.role === "teacher" &&
                <div className='studentList'>
                    <label>Students list</label>
                    <div className='member-info member-title'>
                        <div className='item'>Name</div>
                        <div className='item'>Email</div>
                    </div>
                    {memberList && memberList.map(member => (
                        <div className='member-info'>
                            <div className='item'>{member.name}</div>
                            <div className='item'>{member.email}</div>
                        </div>
                    ))}
                </div>}
        </div>
    );
}

export default DetailClass;