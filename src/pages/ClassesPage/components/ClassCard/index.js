import React, { useContext, useMemo } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../components/AuthContext";
import { ClassesContext } from "../../../../components/ClassesContext";
import { TeachersContext } from "../../../../components/TeachersContext";
import "./ClassCard.scss";

function ClassCard(props) {
  const { id, name, start, end, teacherId } = props;
  const user = useContext(AuthContext);
  const teachers = useContext(TeachersContext);
  const classes = useContext(ClassesContext);

  const alert = useAlert()

  const joiningClass = useMemo(
    () => user && classes.find(c =>
      !c.isFinished &&
      c.students.some(s =>
        s.id === user.uid)),
    [classes, user]
  )

  const getTeacherName = (teacherId) => {
    if (teachers) {
      const teaacher = teachers.find((teacher) => teacher.id === teacherId);
      return teaacher?.name;
    }
  };
  return (
    <div className="class-wrap">
      <h3 className="class-name">{name}</h3>
      <div className="class-info">
        <p className="color-pink">
          Time start: <span>{start}</span>
        </p>
        <p className="color-yellow">
          Time end: <span>{end}</span>
        </p>
        <p className="color-blue-sky">
          Teacher: <span>{getTeacherName(teacherId)}</span>
        </p>
      </div>
      { user && joiningClass ?
        <div className="class-regis btn-font" 
          onClick={() => alert.error("you are joining class " + joiningClass.name)
        }>
          Join
        </div> :
        <Link className="class-regis btn-font" to={user ? id : "/login"} teacherId={teacherId}>
          Join
        </Link>
      }
      {/* <div className='class-regis btn-font'
                onClick={handleJoin}
            >
                Join
            </div> */}
    </div>
  );
}

export default ClassCard;
