import { updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";
import React, { useState } from "react";
import IMG from "../../../../constants/ImgUrl";
import { auth, db, storage } from "../../../../firebaseConfig";
import { ref as sRef } from "firebase/storage";
import "./InfoDetail.scss";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { useAlert } from "react-alert";
function InfoDetail({ user }) {
  const [displayName, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [isDisable, setIsDisable] = useState(true);
  const [checkEmail, setCheckEmail] = useState(!user?.email ? true : false);
  const alert = useAlert();
  // const [checkPhoneNumber, setCheckPhoneNumber] = useState(
  //   !user?.phoneNumber ? true : false
  // );
  const [photoURL, setPhotoURL] = useState(user?.photoURL || IMG.ava);

  const handleCancel = () => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email || "");
      setPhoneNumber(user?.phoneNumber || "");
      setIsDisable(true);
    }
  };
  let roleUser;
  user.role === "teacher" ? (roleUser = "teachers") : (roleUser = "students");
  const handleSave = () => {
    const updates = {};
    updates[`${roleUser}/${user.uid}/name`] = displayName;
    updates[`${roleUser}/${user.uid}/email`] = email;
    updates[`${roleUser}/${user.uid}/phoneNumber`] = phoneNumber;
    updates[`${roleUser}/${user.uid}/photoURL`] = photoURL;
    update(ref(db), updates)
    .then(()=>{
      alert.success("Update successful")
    })
    .catch(error => {
      alert.error("update failed")
    })
    setCheckEmail(email?.length === 0 ? true : false);
    // setCheckPhoneNumber(phoneNumber?.length === 0 ? true : false);

    updateProfile(auth.currentUser, {
      displayName,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    setIsDisable(true);
  };

  const handleImage = async (e) => {
    const imageRef = sRef(storage, `${roleUser}/${e.target.files[0].name}`);
    uploadBytes(imageRef, e.target.files[0])
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setPhotoURL(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setPhotoURL(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  console.log(user, "user");
  return (
    <div className="user-form">
      <img src={photoURL} alt={displayName} />
      {!isDisable && (
        <>
          <input type="file" id="input" onChange={handleImage}></input>
        </>
      )}
      <div className="group">
        <label className="title">Name</label>
        <input
          type="text"
          className="control"
          value={displayName}
          onChange={(e) => setName(e.target.value)}
          disabled={isDisable}
        />
      </div>
      <div className="group">
        <label className="title">Email</label>
        <input
          type="text"
          className="control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isDisable ? isDisable : !checkEmail}
          // disabled={isDisable}
        />
      </div>
      <div className="group">
        <label className="title">Phone Number</label>
        <input
          type="text"
          className="control"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          //  disabled={isDisable ? isDisable : !checkPhoneNumber}
           disabled={isDisable}
        />
      </div>
      <div className="group group-btn">
        {isDisable ? (
          <div
            className="button btn-font"
            onClick={() => {
              setIsDisable(false);
            }}
          >
            Edit
          </div>
        ) : (
          <>
            <div className="button btn-font" onClick={handleSave}>
              Save
            </div>
            <div
              className="button button--cancel btn-font"
              onClick={handleCancel}
            >
              Cancel
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoDetail;
