import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import GlobalStyles from "./components/GlobalStyles";
import HeaderInfo from "./components/HeaderInfo";
import Navbar from "./components/Navbar";
import ScrollButton from "./components/ScrollButton";
import AboutPage from "./pages/AboutPage";
import ClassesPage from "./pages/ClassesPage";
import ContactPage from "./pages/ContactPage";
import CoursesPage from "./pages/CoursesPage";
import HomePage from "./pages/HomePage";
import InfoUserPage from "./pages/InfoUserPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyClasses from "./pages/MyClasses";
import DetailClass from "./pages/MyClasses/DetailClass";
import Homework from "./pages/MyClasses/Homework";
import Schedule from "./pages/Schedule";
import SignUpClass from "./pages/SignUpClass";
import DoHomework from "./pages/MyClasses/DoHomework";
import Document from "./pages/MyClasses/Document";

function App() {
  return (
    <GlobalStyles>
      <div className="App">
        <HeaderInfo />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/myclass" element={<MyClasses />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/courses/*" element={<CoursesPage />}>
            <Route path=":courseId" element={<ClassesPage />} />
          </Route>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login/" element={<LoginPage />} />

          <Route path="/profile" element={<InfoUserPage />} />
          <Route path="/my-classes/*" element={<MyClasses />}>
            <Route path=":classId" element={<DetailClass />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/courses/:courseId" element={<ClassesPage />} />
          <Route path="/courses/:courseId/:classId" element={<SignUpClass />} />
          <Route path="/my-classes/:classId" element={<DetailClass />} />
          <Route path="/my-classes/:classId/hw/add" element={<Homework />} />
          <Route path="/my-classes/:classId/doc/add" element={<Document />} />
          <Route
            path="/my-classes/:classId/doc/:documentId"
            element={<Document />}
          />
          <Route
            path="/my-classes/:classId/hw/:homeworkId"
            element={<Homework />}
          />
          <Route
            path="/my-classes/:classId/hw/do/:homeworkId"
            element={<DoHomework />}
          />
        </Routes>

        <Footer />
        <ScrollButton />
      </div>
    </GlobalStyles>
  );
}

export default App;
