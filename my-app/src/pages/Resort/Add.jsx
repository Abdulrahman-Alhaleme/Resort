import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Add.css";

const Add = () => {
  const [resort, setResort] = useState({
    name: "",
    description: "",
    price: null,
    photo: "",
  });
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/resort", resort);
      console.log();
      navigate("/resort");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setResort((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="add-form">
        <h1>add new resort</h1>
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          name="name"
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="description"
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
        />
        <input
          type="text"
          placeholder="cover"
          onChange={handleChange}
          name="photo"
        />

        <button onClick={handleClick}>Add</button>
      </div>
    </>
  );
};

export default Add;
