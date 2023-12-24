import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import { ClassesContext } from "../../components/ClassesContext";
import { CoursesContext } from "../../components/CoursesContext";
import { push, ref, set } from "firebase/database";
import { db } from "../../firebaseConfig";
import IMG from "../../constants/ImgUrl";
import Assignments from "./Component/Assignments";
import Comment from "./Component/Comment";
import FormCondition from "../../AutoComplete/FormCondition";
import Document from "./Component/Document";
import Teacher from "./Component/Teacher";
import "./SignUpClass.scss";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));
const listTabs = ["Document", "Assignments", "Comment", "Teacher"];
const SignUpClass = (props) => {
  const alert = useAlert();
  const navigate=useNavigate();
  const { courseId, classId } = useParams();
  const classes = useContext(ClassesContext);
  const courses = useContext(CoursesContext);
  const user = useContext(AuthContext);
  const [newClass, setNewClass] = useState("");
  const [payMethod, setPayMethods] = useState("");
  const [newUser, setNewUser] = useState("");
  const [priceCourse, setPriceCourse] = useState("");
  const [tabs, setTabs] = React.useState(0);
  const { id, detailTime, name, start, end, documents, teacherId, homeworks } =
    newClass;
  const { uid, displayName, email, phoneNumber } = newUser;
  const dateCur = new Date();
  // const getMonth = dateCur.getMonth() + 1;
  // const newDate =
  //   dateCur.getDate() +
  //   "-" +
  //   (getMonth >= 10 ? getMonth : "0" + getMonth) +
  //   "-" +
  //   dateCur.getFullYear();
  // const newTime = " " + dateCur.getHours() + ":" + dateCur.getSeconds();
  const handleChangeTabs = (event, newValue) => {
    setTabs(newValue);
  };
  useEffect(() => {
    user ? setNewUser(user) : setNewUser("");
  }, [user]);
  useEffect(() => {
    const newClassById = classes.find((classItem) => classItem.id === classId);
    if (newClassById) {
      setNewClass(newClassById);
    }
  }, [classes, classId]);
  useEffect(() => {
    const newCourseById = courses.find(
      (coursesItem) => coursesItem.id === courseId
    );
    if (newCourseById) {
      setPriceCourse(newCourseById.price);
    }
  }, [courses, courseId]);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const handleSubmit = (e) => {
    setIsOpenConfirm(true);
  };
  const handleOke = () => {
    if (payMethod) {
      setIsOpenConfirm(false);
      const paymentRef = ref(db, "payments/");
      push(paymentRef, {
        studentId: uid,
        classId: id,
        isPayed: false,
        methodPay: payMethod,
        //time: newDate.concat(newTime)
        time: dateCur.toLocaleString(),
      });
      set(ref(db, `classes/${id}/students/${user.uid}`), {
        isActive: false,
      });
      alert.success("You have successfully submitted your payment request!");
      navigate(-1)
    } else {
      alert.error("Please select payment method");
    }
  };
  const handleClose = () => {
    setIsOpenConfirm(false);
  };
  const handlePay = (payMethods) => {
    setPayMethods(payMethods);
  };
  console.log(newClass.students,"newClass");
  return (
    <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
      <div className="title-big">
        <h2 className="btn-font">Information class {name}</h2>
        <p></p>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Grid
            container
            sx={{
              backgroundImage: `url(${IMG.banner4})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              height: "400px",
              borderRadius: "20px",
            }}
          >
            <Grid item xs={7}>
              <div className="right">
                <div className="course-icon">
                  <GroupAddIcon className="img"></GroupAddIcon>
                  <div className="text">
                    <h3> {newClass.students?newClass.students.length:"0"} Studying </h3>
                  </div>
                </div>
                <div className="course-img">
                  <img className="img" src={IMG.check} alt={IMG.check} />
                  <div className="text">
                    <h3>Start day : {start}</h3>
                  </div>
                </div>

                <div className="course-img">
                  <img className="img" src={IMG.check} alt={IMG.check} />

                  <div className="text">
                    <h3>End day : {end}</h3>
                  </div>
                </div>
                <div className="course-img">
                  <img className="img" src={IMG.check} alt={IMG.check} />

                  <div className="text">
                    <h3 style={{ width: "80px" }}>Time : </h3>
                    <div className="text-time">
                      {detailTime &&
                        detailTime.map((time, index) => (
                          <div key={index} className="text-time-detail">
                            <label>{time.dayOfWeed} </label>
                            <label>{time.startTime}</label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={5}>
              <form className="form">
                <label className="form-title">
                  {priceCourse.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}{" "}
                </label>
                <input
                  disabled
                  className="form-input"
                  value={displayName}
                  type="text"
                ></input>
                <input
                  disabled
                  className="form-input"
                  value={email}
                  type="email"
                ></input>
                <input
                  disabled
                  className="form-input"
                  value={phoneNumber}
                  type="tel"
                ></input>
                <Button onClick={(e) => handleSubmit(e)} className="form-btn">
                  ĐĂNG KÝ
                </Button>
              </form>
              <FormCondition
                priceCourse={priceCourse}
                nameClass={name}
                open={isOpenConfirm}
                handleOke={handleOke}
                handleClose={handleClose}
                handlePay={handlePay}
              ></FormCondition>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabs}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTabs}
                  aria-label="lab API tabs example"
                  centered
                >
                  {listTabs.map((item, index) => (
                    <Tab
                      value={index}
                      sx={{
                        fontSize: "20px",
                        pt: "50px",
                        m: "0px 40px",
                        fontWeight: "800",
                      }}
                      key={index}
                      label={item}
                    />
                  ))}
                </TabList>
              </Box>
              {listTabs.map((item, index) => (
                <TabPanel
                  value={index}
                  sx={{ fontSize: "20px", pt: "50px", m: "0px 40px" }}
                  key={index}
                  label={item}
                >
                  {index === 0 && <Document  priceCourse={priceCourse}
                nameClass={name} documents={documents}></Document>}
                  {index === 1 && (
                    <Assignments homeworks={homeworks}></Assignments>
                  )}
                  {index === 2 && <Comment {...newUser}></Comment>}
                  {index === 3 && <Teacher teacherId={teacherId}></Teacher>}
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
};

export default SignUpClass;
