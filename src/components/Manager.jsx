import React, { useEffect, useRef, useState } from "react";
import ShowData from "./ShowData";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


export default function Manager() {
  const passRef = useRef(null);
  const imgRef = useRef(null);

  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);

  // Load passwords from localStorage
//   useEffect(() => {
//     const passwords = localStorage.getItem("passwords");
//     if (passwords) {
//       setPasswordArray(JSON.parse(passwords));
//     }
//   }, []);

  // Show / Hide password
  const showPass = () => {
    if (passRef.current.type === "text") {
      passRef.current.type = "password";
      imgRef.current.src = "eye.png";
    } else {
      passRef.current.type = "text";
      imgRef.current.src = "eyecross.png";
    }
  };

  const tablePass = () => {};

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  //fetch password
   const getPassword = async () => {
     const {data} = await axios.get("https://passopbackend-f1u9.onrender.com/password");
   setPasswordArray(data); 
    };
  
    useEffect(()=>{
      getPassword()
    },[])
  

  // Save password
  const savePassword = async (id) => {

    if(form.site.length>3 && form.username.length>3 && form.password.length>5 ){
 setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log([...passwordArray, form]);

  const res = await  axios.post("https://passopbackend-f1u9.onrender.com/password", {
    site:form.site,
    username:form.username,
    password:form.password,
  })
    getPassword()
setForm({
        site: "",
        username: "",
        password: "",
      });
  console.log(res.data)
    }
   
  };

  return (
    <>
      {/* Background Glow */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div
          className="absolute right-0 top-0 h-[400px] w-[400px]
        -translate-x-[30%] translate-y-[20%]
        rounded-full bg-purple-300 opacity-50 blur-[80px]"
        />
      </div>

      {/* Main Wrapper */}
      <div className="min-h-screen flex flex-col items-center py-10 px-4 gap-10">
        {/* CARD */}
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              &lt;Pass<span className="text-green-600">OP</span>&gt;
            </h1>
            <p className="text-gray-500">Your personal Password Manager</p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            {/* Website */}
            <div>
              <label className="font-semibold text-sm flex ">
                Website URL &nbsp;
                <img src="url.gif" alt="url" width={20} height={20} />
              </label>
              <input
                type="text"
                name="site"
                value={form.site}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full mt-1 p-2 border-2 rounded-lg
                focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Email + Password */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Email */}
              <div className="w-full">
                <label className="flex items-center gap-1 font-semibold text-sm">
                  Email
                  <lord-icon
                    src="https://cdn.lordicon.com/jfhecnmz.json"
                    trigger="loop"
                    delay="2000"
                    style={{ width: 20, height: 20 }}
                  ></lord-icon>
                </label>
                <input
                  type="email"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full mt-1 p-2 border-2 rounded-lg
                  focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Password */}
              <div className="w-full">
                <label className="font-semibold text-sm flex gap-2">
                  Password{" "}
                  <img
                    src="password.gif"
                    width={20}
                    height={20}
                    alt="password"
                  />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    ref={passRef}
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full mt-1 p-2 border-2 rounded-lg
                    focus:outline-none focus:border-green-500"
                  />
                  <img
                    ref={imgRef}
                    src="eye.png"
                    alt="toggle"
                    className="w-7 h-7 mt-1 cursor-pointer"
                    onClick={showPass}
                  />
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={()=>savePassword(form._id)}
              className="mt-3 flex items-center justify-center gap-2
              bg-green-600 text-white py-2 rounded-lg
              hover:bg-green-700 transition"
            >
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="loop"
                style={{ width: 22, height: 22 }}
              ></lord-icon>
              Add Password
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="w-full max-w-4xl items-center flex flex-col">
          <h3 className="font-bold py-1">Your Passwords </h3>
          {passwordArray.length === 0 && <div> No passwords to Show </div>}
          {passwordArray.length != 0 && (
            <ShowData passwordArray={passwordArray} setPasswordArray={setPasswordArray} setForm={setForm} getPassword={getPassword} from={form}/>
          )}
        </div>
      </div>
    </>
  );
}
