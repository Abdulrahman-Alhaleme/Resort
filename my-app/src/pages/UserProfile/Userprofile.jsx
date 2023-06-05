import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";

function Userprofile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const userData = localStorage.getItem("userData");
    const parsedData = JSON.parse(userData);

    console.log(user);

    axios
      .get("http://localhost:5001/records")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  console.log(user);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div
          className="custom-width"
          style={{
            maxWidth: "700px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="bg-white shadow-xl rounded-lg p-6">
            <div className="photo-wrapper">
              <FaUser className="w-32 h-32 rounded-full mx-auto text-gray-500" />
              <i style={{ color: "#000000" }} />
            </div>
            <div className="p-6">
              <div className="text-center text-gray-600 text-lg font-semibold mb-4"></div>
              <div className="flex">
                <div className="w-1/2 order-first">
                  <form className="text-lg my-4" id="datas">
                    {user.map((user) => (
                      <>
                        <div className="mb-4">
                          <label
                            htmlFor="username"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            User Name : {user.name}
                          </label>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Email : {user.email}
                          </label>
                        </div>
                      </>
                    ))}
                  </form>
                </div>
              </div>
              <div className="text-center mt-6">
                <Link
                  to="/editProfile"
                  className="text-1xl p-3 bg-yellow-500  px-6  font-medium flex items-center justify-center"
                  href="#"
                  style={{ color: "white" }}
                >
                  Edit profile
                </Link>
                <BiEdit className="ml-1 mt-2" style={{ color: "white" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userprofile;
