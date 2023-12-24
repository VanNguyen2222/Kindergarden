import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import CoursesProvider from "./components/CoursesContext";
import ClassesProvider from "./components/ClassesContext";
import AuthProvider from "./components/AuthContext";
import TeachersProvider from "./components/TeachersContext";
import StudentsProvider from "./components/StudentsContext";
import AlerTemplate from "./Alert";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "100px 50px",
  transition: transitions.FADE,
};

ReactDOM.render(
  <AlertProvider template={AlerTemplate} {...options}>
    <React.StrictMode>
      <BrowserRouter>
        <CoursesProvider>
          <ClassesProvider>
            <TeachersProvider>
              <StudentsProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </StudentsProvider>
            </TeachersProvider>
          </ClassesProvider>
        </CoursesProvider>
      </BrowserRouter>
    </React.StrictMode>
  </AlertProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
