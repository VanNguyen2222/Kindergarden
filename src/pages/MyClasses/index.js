import React from "react";
import "./MyClass.scss";
import { Link } from "react-router-dom";
import { useData } from "./hook";

function MyClasses(props) {
  const { myClasses } = useData();
  return (
    <div className="grid wide pd-b-80">
      <div className="title-big">
        <h2 className="btn-font">My Classes</h2>
      </div>
      {!myClasses.length && (
        <p className="my-class__description">There are no classes</p>
      )}

      {!!myClasses.filter((c) => !c.isFinished).length && (
        <>
          <h3>Current classes</h3>
          <div className="classes">
            {myClasses
              .filter((c) => !c.isFinished)
              .map((myClass) => (
                <Link
                  key={myClass.id}
                  to={myClass.id}
                  className="my-class-card"
                >
                  <div className="name">{myClass.name}</div>
                </Link>
              ))}
          </div>
        </>
      )}
      {!!myClasses.filter((c) => c.isFinished).length && (
        <>
          <h3 style={{ marginTop: "30px" }}>The classes is done</h3>
          <div className="classes">
            {myClasses
              .filter((c) => c.isFinished)
              .map((myClass) => (
                <Link
                  key={myClass.id}
                  to={myClass.id}
                  className="my-class-card"
                >
                  <div className="name">{myClass.name}</div>
                </Link>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyClasses;
