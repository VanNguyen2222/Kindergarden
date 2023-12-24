import React, { useContext, useEffect } from "react";
import CourseCard from "../../components/CourseCard";
import { CoursesContext } from "../../components/CoursesContext";
import SlideReponsive from "../../components/SlideReponsive";
import TeacherCard from "../../components/TeacherCard";
import { TeachersContext } from "../../components/TeachersContext";
import Banner from "./components/Banner";
import AboutPage from "../AboutPage";
import "./HomePage.scss";
import { AuthContext } from "../../components/AuthContext";

function HomePage(props) {
  const courses = useContext(CoursesContext);
  const teachers = useContext(TeachersContext);
  const user = useContext(AuthContext);
  useEffect(() => {

  },[user])
  return (
    <>
      <Banner />
      <AboutPage />
      {(!user || user?.role === "student") &&
        <div className="grid wide">
          <div className="title-big">
            <h2 className="btn-font">Courses we offer</h2>
            <p></p>
          </div>
          {courses ? (
            <SlideReponsive number={Object.keys(courses).length}>
              {courses
                .filter((courses) => courses.isActive === true)
                .map((course) => {
                  return (
                    <div key={course.id} style={{ padding: "10px" }}>
                      <CourseCard {...course} to={`courses/${course.id}`} />
                    </div>
                  );
                })}
            </SlideReponsive>
          ) : (
            ""
          )}
        </div>}
      <div className="grid wide">
        <div className="title-big">
          <h2 className="btn-font">Expert Teachers</h2>
          <p></p>
        </div>
        {teachers ? (
          <SlideReponsive number={Object.keys(teachers).length}>
            {teachers
              .filter(
                (teachers) =>
                  teachers.isActive === true && teachers.photoURL !== undefined
              )
              .map((teacher) => {
                // if (teacher.isActive)
                return (
                  <div key={teacher.id} style={{ padding: "10px" }}>
                    <TeacherCard {...teacher} />
                  </div>
                );
                // return ''
              })}
          </SlideReponsive>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default HomePage;
