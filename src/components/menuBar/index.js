/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
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
  backgroundColor: "white"
});

function menuBar() {
  return (
    <nav css={headerStyle}>
      <Link to="/list">
        <i class="material-icons nav__icon">dashboard</i>
      </Link>
      <Link to="/me">
        <i class="material-icons nav__icon">catching_pokemon</i>
      </Link>
    </nav>
  );
}

export default menuBar
