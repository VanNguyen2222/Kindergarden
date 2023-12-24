import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useContext, useEffect, useMemo, useState } from "react";
import CourseCard from "../../components/CourseCard";
import AutoComplete from "../../AutoComplete/AutoComplete";
import { CoursesContext } from "../../components/CoursesContext";
import "./CoursesPage.scss";
function CoursesPage(props) {
  const courses = useContext(CoursesContext);
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");
  const [ObjectName, setObjectName] = useState("All");
  const [ObjectList, setObjectList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const nameOptions = useMemo(
    () => courses?.map((course) => course.name),
    [courses]
  );

  const listObject = [
    "All",
    "From 3 - 6 age",
    "From 7 - 14 age",
    "From 15 - 18 age",
    "Over 18 age",
  ];
  const handleChangeObject = (event) => {
    const {
      target: { value },
    } = event;
    console.log(name);
    setObjectName(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    const objectItem = courses.filter((course) =>
      String(ObjectName) === "All"
        ? course
        : course.object.includes(String(ObjectName))
        ? course
        : ""
    );
    setObjectList([...objectItem]);
  }, [ObjectName, courses]);
  useEffect(() => {
    if (ObjectList) {
      let newCourses = [...ObjectList];
      if (inputName.length > 0) {
        newCourses = newCourses.filter((course) =>
          course.name.toUpperCase().includes(inputName.toUpperCase())
        );
      }
      setFilteredCourses([...newCourses]);
    } else setFilteredCourses([]);
  }, [ObjectList, inputName]);
  return (
    <div className="grid wide pd-b-80">
      <div className="title-big" style={{ paddingBottom: "50px" }}>
        <h2 className="btn-font">{ObjectName} Course</h2>
        <p></p>
      </div>
      <div className="filter">
        <span className="filter-title">Object:</span>
        <FormControl
          className="filter-object"
          variant="standard"
          sx={{ m: 5, w: 250 }}
        >
          <Select
            className="filter-object-select"
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={ObjectName}
            onChange={handleChangeObject}
            label="Age"
          >
            /
            {listObject.map((item, index) => (
              <MenuItem
                key={index}
                className="filter-object-select"
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <span className="filter-title">Search:</span>
        <AutoComplete
          options={nameOptions}
          getValue={setName}
          getInputValue={setInputName}
        />
      </div>
      <div className="row">
        {filteredCourses.map((course) => {
          if (course.isActive && !course.isDeleted)
            return (
              <div
                key={course.id}
                style={{ marginBottom: "30px", marginTop: "40px" }}
                className="col l-4 m-6 c-12"
              >
                <CourseCard {...course} to={`${course.id}`} />
              </div>
            );
          return "";
        })}
      </div>
    </div>
  );
}

export default CoursesPage;
