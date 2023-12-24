import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import { ClassesContext } from "../../components/ClassesContext";
import { CoursesContext } from "../../components/CoursesContext";
import ClassCard from "./components/ClassCard";
import IMG from "./../../constants/ImgUrl";

function ClassesPage(props) {
  const { courseId } = useParams();
  const classes = useContext(ClassesContext);
  const courses = useContext(CoursesContext);
  const user = useContext(AuthContext);

  const availableClasses = useMemo(
    () => user ? classes.filter(c =>
      c.courseId === courseId
      && !c.students.some(s =>
        s.id === user?.uid)) :
      classes.filter(c =>
        c.courseId === courseId),
    [classes, courseId, user]
  )

  const getCourseName = (courses, courseId) => {
    // const courseProperty = []
    if (courses && courseId) {
      let course = courses.find((course) => course.id === courseId);
      // courseProperty.push(course.name);
      // courseProperty.push(course.time);
      // courseProperty.push(course.price);
      // courseProperty.push(course.object);
      // courseProperty.push(course.description);
      return course?.name;
    }
    return "";
  };

  const getCoursePrice = (courses, courseId) => {
    if (courses && courseId) {
      let course = courses.find((course) => course.id === courseId);
      return course?.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });;
    }
    return "";
  };

  const getCourseAddress = (courses, courseId) => {
    if (courses && courseId) {
      let course = courses.find((course) => course.id === courseId);
      return course?.address;
    }
    return "";
  };

  const getCourseDescription = (courses, courseId) => {
    if (courses && courseId) {
      let course = courses.find((course) => course.id === courseId);
      return course?.description;
    }
    return "";
  };

  // const getCourseObject = (courses, courseId) => {
  //   if (courses && courseId) {
  //     let course = courses.find((course) => course.id === courseId);
  //     return course?.object;
  //   }
  //   return "";
  // };

  const getCourseTime = (courses, courseId) => {
    if (courses && courseId) {
      let course = courses.find((course) => course.id === courseId);
      return course?.time;
    }
    return "";
  };

  const getCourseImgages = (courses, courseId) => {
    if (courses && courseId) {
      let course = courses.find((course) => course.id === courseId);
      return course?.images;
    }
    return "";
  };

  return (
    <div className="grid wide pd-b-80">
      <div className="title-big">
        <h2 className="btn-font">
          Information couses {getCourseName(courses, courseId)}{" "}
        </h2>
        <p></p>
      </div>
      <div
        className="description"
        style={{
          backgroundImage: `url(${IMG.banner3})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <div className="left">
          <img src={getCourseImgages(courses, courseId)} alt="img" />
        </div>
        <div className="right">
          <div className="course-img">
            <img className="img" src={IMG.check} alt={IMG.check} />
            <div className="text">
              <h3>Prices: {getCoursePrice(courses, courseId)} </h3>
            </div>
          </div>

          <div className="course-img">
            <img className="img" src={IMG.check} alt={IMG.check} />

            <div className="text">
              <h3>Address: {getCourseAddress(courses, courseId)}</h3>
            </div>
          </div>
          <div className="course-img">
            <img className="img" src={IMG.check} alt={IMG.check} />

            <div className="text">
              <h3>Time: {getCourseTime(courses, courseId)} month</h3>
            </div>
          </div>
          <div className="course-img">
            <img className="img" src={IMG.check} alt={IMG.check} />
            <div className="text">
              <h3>{getCourseDescription(courses, courseId)}</h3>
            </div>
          </div>
        </div>
      </div>
      <div
        className="title-big"
        style={{ margin: "auto", padding: "0", marginBottom: "50px" }}
      >
        <h2 className="btn-font">
          All class of couses {getCourseName(courses, courseId)}{" "}
        </h2>
        <p></p>
      </div>
      <div className="row">
        {availableClasses.map((item) => (
          <ClassCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default ClassesPage;
