import { NavLink } from "react-router-dom";

import Style from "./Navlinks.module.css";

const Navlinks = (props) => {
  return (
    <ul className={Style["nav-links"]}>
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default Navlinks;
