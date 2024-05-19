import React, { useEffect, useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        console.log(res.data); // Check if data is being fetched
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", file);
    axios
      .post("http://localhost:3001/upload", formdata)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Succeded");
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form>
        <input type="file" name="image" onChange={handleFile} />
        <button onClick={handleUpload}>Upload</button>
      </form>{" "}
      <br />
      <img
        src={`http://localhost:3001/images/${data.image}`}
        alt="Resident"
        style={{ width: "500px", height: "750px" }}
      />
    </div>
  );
}

export default ImageUpload;
