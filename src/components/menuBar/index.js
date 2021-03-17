/** @jsxImportSource @emotion/react */
import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/react";

const headerStyle = css({
  display: "flex",
  justifyContent: "space-evenly",
  position: "fixed",
  bottom: 25,
  width: "50%",
  left: "25%",
  padding: "10px 0px",
  borderRadius: "20px",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  backgroundColor: "white",
  zIndex: 1,
  "& a": {
    color: "#222224",
  },
  "& .active": {
    color: "#f00000",
  },
});

function menuBar() {
  return (
    <nav css={headerStyle}>
      <NavLink to="/list">
        <i className="material-icons nav__icon">dashboard</i>
      </NavLink>
      <NavLink to="/me">
        <i className="material-icons nav__icon">catching_pokemon</i>
      </NavLink>
    </nav>
  );
}

export default menuBar;
