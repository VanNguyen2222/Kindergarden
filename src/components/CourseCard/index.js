import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMG from "./../../constants/ImgUrl";
import { ClassesContext } from "../ClassesContext";
import "./CourseCard.scss";
function CourseCard(props) {
  const classes = useContext(ClassesContext);
  const [classCount, setClassCount] = useState(0);
  const { id, name, price, time, images, to } = props;
  const dong = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const newClass = classes.filter((classChild) => classChild.courseId === id);
    setClassCount(newClass.length)
  }, [classes, id]);

  return (
    <Link className="wrap-course" to={to}>
      <img className="course-img" src={images} alt={IMG.COURSE} />
      <div className="course-caption">
        <h3 className="btn-font">{name}</h3>
        {/* <p>{description}</p> */}
      </div>
      <div className="course-footer">
        <div className="item">
          <span className="color-blue btn-font">{time}m</span>
          <p>Time</p>
        </div>
        <div className="item">
          <span className="color-pink">
            {classCount}
          </span>
          <p>Classes</p>
        </div>
        <div className="item">
          <span className="color-yellow">Price</span>
          <p>{dong}</p>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
