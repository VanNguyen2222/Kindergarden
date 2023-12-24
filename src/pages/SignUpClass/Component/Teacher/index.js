import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
import IMG from "../../../../constants/ImgUrl";
import { TeachersContext } from "../../../../components/TeachersContext";
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));
const Teacher = ({ teacherId }) => {
  const teacherContext = useContext(TeachersContext);
  const [newTeacher, setNewteacher] = useState("");
  const [isShowteacher, setIsShowteacher] = useState(false);
  const { photoURL, name } = newTeacher;
  useEffect(() => {
    const newTeacherById = teacherContext.find(
      (teach) => teach.id === teacherId
    );
    if (newTeacherById) {
      setNewteacher(newTeacherById);
      setIsShowteacher(false)
    } else {
      setNewteacher("");
      setIsShowteacher(true)

    }
  }, [teacherId, teacherContext]);
  console.log(newTeacher, "newteacher");
  return (
    <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "#c0596e59",
          padding: "50px",
          borderRadius: "90px",
        }}
      >
        <Grid item xs={1}></Grid>

      {!isShowteacher? (
        <>
          <Grid item xs={4} sx={{ margin: "auto" }}>
          <Avatar
            alt={name}
            sx={{ width: "300px", height: "300px" }}
            src={photoURL ? photoURL : IMG.ava}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            fontSize: "18px",
            flexDirection: "column",
            lineHeight: "2",
            fontWeight: "700",
            padding: "30px 0px",
          }}
        >
          <div style={{ fontSize: "30px", fontWeight: "900" }}>{name}</div>
          I’m {name}. I’m 28 years old and I’m single. I was born and grew up in Ha Noi, but I have been working in HCM City for 5 years. I graduated from Economic university and got 4 years experience in administration and human resource management. I’m active. I like work related to human beings. I’m rather serious and sensitive, I can quickly catch up psychology of other people. I often read newpapers and listen to music in my free time.
        </Grid></>
      ):<Grid item xs={10}  class="text-empty-teacher">The class has no teacher in attendance</Grid>}
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
};

export default Teacher;
