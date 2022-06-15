import React, { useState } from "react";

const Nav: React.FC = () => {
  const [change, setChange] = useState<boolean>(false);
  const url = "http://localhost:3000/login";
  const mainurl = "http://localhost:3000";

  const Tooltip = () => {
    if (change === true) {
      return (
        <div className="tooltip_contain">
          <a className="tooltip_nav" href={mainurl}>
            Strona głowna
          </a>
          <a className="tooltip_nav" href={url}>
            Logowanie
          </a>
          <a className="tooltip_nav" href="http://localhost:3000/calendary">
            Terminy
          </a>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const handleClick = () => {
    if (change === false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };
  return (
    <>
      <nav>
        <div className="contain">
          <div className="nav_text">
            <a href="https://beauty-app-pl.herokuapp.com/">Be beauty</a>
            <label form="check">
              <input type="checkbox" id="check" onChange={handleClick} />
              <span className="span"></span>
              <span className="span"></span>
              <span className="span"></span>
            </label>
          </div>
          <Tooltip />
        </div>
      </nav>
    </>
  );
};

export default Nav;
