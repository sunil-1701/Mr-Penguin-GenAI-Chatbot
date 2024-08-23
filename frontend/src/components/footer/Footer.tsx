import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          padding: 20,
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 50,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center" }}>
          {" "}
          Get the source code{" "}
          <span>
            {" "}
            <Link
              className="nav-link"
              to={"https://github.com/sunil-1701/Mr-Penguin"}
            ></Link>{" "}
          </span>
        </p>
      </div>
    </footer>
  );
};
