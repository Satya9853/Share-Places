import { NavLink } from "react-router-dom";

import Style from "./Navlinks.module.css";

const Navlinks = () => {
  return (
    <ul className={Style["nav-links"]}>
      <li>
        <NavLink to="/" exact={true} activeClassName={Style.active}>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places" activeClassName={Style.active}>
          MY PLACES
        </NavLink>
      </li>
      <li>
        <NavLink to="/places/new" activeClassName={Style.active}>
          ADD PLACES
        </NavLink>
      </li>
      <li>
        <NavLink to="/auth" activeClassName={Style.active}>
          AUTHENTICATE
        </NavLink>
      </li>
    </ul>
  );
};

export default Navlinks;
