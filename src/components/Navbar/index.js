import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import IMG from "../../constants/ImgUrl";
import { AuthContext } from "../AuthContext";
import UserInfo from "../UserInfo";
import "./Navbar.scss";

function Navbar(props) {
  const navRef = useRef();
  const user = useContext(AuthContext);
  const [isRole, setIsRole] = useState(true);

  useEffect(() => {
    if (user) {
      const roleUser = user.role;
      roleUser === "teacher" ? setIsRole(false) : setIsRole(true)
    }
  }, [user])

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset >= 200) {
        navRef.current.classList.add("sticky");
      } else {
        navRef.current.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="grid wide">
        <div className="display-flex">
          <div className="logo">
            <img className="logo-img" src={IMG.LOGO} alt="logo" />
          </div>
          <div className="menu">
            <ul className="list">
              <li className="item">
                <NavLink className="item-btn btn-font" to="/">
                  Home
                </NavLink>
              </li>
              {user?.role !== "teacher" &&
                <>
                  <li className="item">
                    <NavLink className="item-btn btn-font" to="/courses">
                      Courses
                    </NavLink>
                  </li>
                  <li className="item">
                    {isRole ? (<NavLink className="item-btn btn-font" to="/about">
                      About
                    </NavLink>) : (<NavLink className="item-btn btn-font" to="/about">
                      My Class
                    </NavLink>)}
                  </li>
                  <li className="item">
                    {isRole ? (<NavLink className="item-btn btn-font" to="/contact">
                      Contact
                    </NavLink>) : (<NavLink className="item-btn btn-font" to="/schedule">
                      Schedule
                    </NavLink>)}
                  </li>
                </>}
              <li className="item">
                {user ? (
                  <UserInfo {...user} />
                ) : (
                  <NavLink
                    className="item-btn btn-font item-btn--login"
                    to="/login"
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
