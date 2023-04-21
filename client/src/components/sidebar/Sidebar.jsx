import { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cats, setCats] = useState([]);

  const getCats = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCats(res.data);
  };
  useEffect(() => {
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">About Me</span>
        <img className="sidebar-img" src="./images/1.jpg" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quia
          exercitationem voluptate
        </p>
      </div>

      <div className="sidebar-item">
        <span className="sidebar-title">CATEGORIES</span>
        <ul className="sidebar-list">
          {cats.map((c) => (
            <Link className="link" to={`/?cat=${c.name}`}>
              <div key={c._id} className="sidebar-list-item">
                {c.name}
              </div>
            </Link>
          ))}
        </ul>
      </div>

      <div className="sidebar-item">
        <span className="sidebar-title">Follow Us</span>
        <div className="sidebar-social">
          <i className="sidebar-icon fab fa-facebook-square"></i>
          <i className="sidebar-icon fab fa-instagram-square"></i>
          <i className="sidebar-icon fab fa-twitter-square"></i>
          <i className="sidebar-icon fab fa-pinterest-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
