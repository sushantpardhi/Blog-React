import { Link } from "react-router-dom";
import "./topbar.css";
import { Context } from "../../context/Context";
import { useContext } from "react";

const Topbar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="topbar">
      {/* Left */}
      <div className="top-left">
        <h3 className="top-logo">
          <Link className="link" to="/">
            BLOGGY
          </Link>
        </h3>
      </div>
      {/* Center */}
      <div className="top-center">
        <ul className="top-list">
          <li className="top-list-item">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="top-list-item">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="top-list-item">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="top-list-item">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="top-list-item" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      {/* Right */}
      <div className="top-right">
        {user ? (
          <Link className="link" to="/settings">
            <img className="top-img" src={user.ProfilePicture} alt="" />
          </Link>
        ) : (
          <ul className="top-list">
            <li className="top-list-item">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="top-list-item">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
        <i className="search-icon fas fa-search"></i>
      </div>
    </div>
  );
};

export default Topbar;
