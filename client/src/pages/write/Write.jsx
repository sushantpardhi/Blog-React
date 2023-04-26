import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newpost = {
      username: user.username,
      title,
      categories,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newpost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
      try {
        const res = await axios.post(
          "http://localhost:5000/api/posts",
          newpost
        );
        window.location.replace("/post/" + res.data._id);
      } catch (err) {}
    }
  };
  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} className="write-img" alt="" />
      )}
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-form-group">
          <label htmlFor="file-input">
            <i className="write-icon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="write-input"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="write-form-group">
          <input
            type="text"
            placeholder="Category"
            className="write-input"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="write-form-group">
          <textarea
            placeholder="Start writing your blog..."
            type="text"
            className="write-input write-text"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="write-submit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
