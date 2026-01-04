import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export default function ShowData({ passwordArray, setPasswordArray, setForm , getPassword , form}) {
  const [visibleIndex, setvisibleIndex] = useState(null);

  const passToggle = (index) => {
    if (visibleIndex === index) {
      setvisibleIndex(null);
    } else {
      setvisibleIndex(index);
    }
  };

 

  const copytext = (text) => {
    toast.success("🦄 Text Copied !", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const deletePass  = async (id) => {
    let c = confirm("Do you really want to delete!");
    if (c) {
    //   const updatedArray = passwordArray.filter((item) => item.id !== id);
    //   setPasswordArray(updatedArray);
    //   localStorage.setItem("passwords", JSON.stringify(updatedArray));
    await axios.delete(`https://passopbackend-f1u9.onrender.com/password/${id}`)

    setPasswordArray(passwordArray.filter(item=>item._id!==id))
    }
  };

  const editPass = async(id) => {
    setForm(passwordArray.filter((i) => i._id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item._id !== id));
    getPassword()

  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        transition={Bounce}
      />

      <table className="w-full border border-gray-400 border-collapse p-4">
        <thead className="bg-gray-100">
          <tr className="bg-green-300">
            <th className="border border-gray-400 px-4 py-2">Website</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Password</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {passwordArray.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-2 py-2">
                <span className="flex gap-1">
                  <a target="_blank" href="">
                    {item.site}
                  </a>{" "}
                  <img
                    width={20}
                    height={20}
                    className="cursor-pointer "
                    onClick={() => copytext(item.site)}
                    src="copy.png"
                    alt=""
                  />
                </span>
              </td>
              <td className="border border-gray-400 px-2 py-2 ">
                <span className="flex gap-1">
                  {" "}
                  {item.username}{" "}
                  <img
                    width={20}
                    height={20}
                    onClick={() => copytext(item.username)}
                    className="cursor-pointer"
                    src="copy.png"
                    alt=""
                  />
                </span>
              </td>
              <td className="border border-gray-400 px-2 py-2">
                <span className="flex justify-between">
                  {visibleIndex === index ? item.password : "........."}
                  <img
                    src={visibleIndex === index ? "eyecross.png" : "eye.png"}
                    alt="toggle"
                    className="w-7 h-7 mt-1 cursor-pointer"
                    onClick={() => passToggle(index)}
                  />
                  <img
                    onClick={() => copytext(item.password)}
                    className="cursor-pointer"
                    width={20}
                    height={20}
                    src="copy.png"
                    alt=""
                  />
                </span>
              </td>
              <td className="border border-gray-400 px-2 py-2">
                <span className="flex justify-around">
                  <lord-icon
                    src="https://cdn.lordicon.com/xyfswyxf.json"
                    trigger="loop"
                    onclick={() => deletePass(item._id)}
                    className="cursor-pointer"
                    delay="1000"
                    style={{ width: 25, height: 25 }}
                  ></lord-icon>
                  <img
                    src="edit.gif"
                    alt="edit"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => editPass(item._id)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
