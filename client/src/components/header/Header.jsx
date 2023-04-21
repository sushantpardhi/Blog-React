import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-titles">
        <span className="header-title-sm">React & Node</span>
        <span className="header-title-lg">Bloggy</span>
      </div>
      <img src="./images/1.jpg" alt="" className="header-img" />
    </div>
  );
};

export default Header;
