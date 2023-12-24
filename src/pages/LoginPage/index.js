import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import "./LoginPage.scss";
const provider = new FacebookAuthProvider();

function LoginPage(props) {
  const nagivate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isCheckInput, setIsCheckInput] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [checkLogin, setCheckLogin] = useState(false);

  const alert = useAlert();
  const handleFbLogin = async () => {
    const data = await signInWithPopup(auth, provider);
    const { _tokenResponse, user, providerId } = data;
    if (_tokenResponse?.isNewUser) {
      set(ref(db, "users/" + user.uid), {
        name: user.displayName,
        email: user.email ? user.email : "",
        photoURL: user.photoURL,
        providerId,
        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
        isActive: false,
        role: "student",
      });
    }
    nagivate("/");
  };

  const handleToggleIsLogin = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
  };

  const handleCreateByEmail = () => {
    if (isCheckInput) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          alert.success("Logged in successfully");
          const user = userCredential.user;
          set(ref(db, "students/" + user.uid), {
            name,
            email,
            photoURL: "",
            providerId: user.providerId,
            phoneNumber,
            isActive: false,
            role: "student",
          });
          updateProfile(user, {
            displayName: name,
          })
            .then(() => {})
            .catch((error) => {
              console.log("Update profile when login failed");
            });
          setCheckLogin(false);
          nagivate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert.error("Login failed");
          setCheckLogin(true);
          // ..
        });
    }
  };

  const handleLoginNormal = () => {
    if (isCheckInput) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          alert.success("Logged in successfully");
          nagivate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert.error("Login failed");
          console.log(errorMessage, errorCode);
          setCheckLogin(true);
        });
    }
  };

  useEffect(() => {
    if (isLogin) {
      email.length === 0 && password.length === 0
        ? setIsCheckInput(false)
        : setIsCheckInput(true);
    } else {
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      phoneNumber.length === 0
        ? setIsCheckInput(false)
        : setIsCheckInput(true);
    }
  }, [name, email, password, phoneNumber, isLogin]);
  return (
    <div className="grid wide">
      <div className="login-form">
        <h2 className="btn-font">
          {isLogin ? "Login to website" : "Create New Account"}
        </h2>
        {isLogin ? (
          <>
            <input
              className="control"
              type="email"
              placeholder="Email/tel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="control"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isCheckInput ? (
              <label className="label-alert">
                Please enter complete information*
              </label>
            ) : checkLogin ? (
              <label>Username or password is incorrect* </label>
            ) : (
              ""
            )}

            <div
              className="control button btn-font"
              onClick={handleLoginNormal}
            >
              Login
            </div>
          </>
        ) : (
          <>
            <input
              className="control"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="control"
              type="email"
              placeholder="Email"
              value={email}
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="control"
              type="tel"
              placeholder="Tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className="control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isCheckInput ? (
              <label className="label-alert">
                Please enter complete information*
              </label>
            ) : checkLogin ? (
              <label> Email is invalid or already in use* </label>
            ) : (
              ""
            )}
            <div
              className="control button btn-font"
              onClick={handleCreateByEmail}
            >
              Create
            </div>
          </>
        )}
        <div className="control button btn-font" onClick={handleFbLogin}>
          Login with Facebook
        </div>

        <div className="control button btn-font" onClick={handleToggleIsLogin}>
          {isLogin ? "Create new account" : "Back to Login"}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
