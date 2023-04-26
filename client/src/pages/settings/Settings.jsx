import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.ProfilePicture = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
      try {
        await axios.put(
          "http://localhost:5000/api/users/" + user._id,
          updatedUser
        );
      } catch (err) {}
    }
    console.log(updatedUser);
  };
  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <span className="settings-title-update">Update Account Details</span>
          <span className="settings-title-delete">Delete Account</span>
        </div>
        <form className="settings-form" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settings-propic">
            <img src={user.ProfilePicture} alt="" />
            <label htmlFor="file-input">
              <i className="settings-propic-icon fa-solid fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="settings-submit" type="submit">
            Update
          </button>

          <span
            style={{ color: "teal", textAlign: "center", marginTop: "20px" }}
          >
            Profile Updated
          </span>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
