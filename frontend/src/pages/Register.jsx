import { useState } from "react";
import apiurl from "../constant";
import { Navigate, useNavigate } from "react-router";

function Register() {
    const [register, setRegister] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (register) {
            fetch(`${apiurl}/api/user/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: 'include',
              body: JSON.stringify({
                name,
                username,
                password,
              }),
            })
              .then((response) => response.json())
                .then((data) => {
                  setUserData(data);
                  alert(data.message); 
                  console.log(data);
                  navigate("/")
              })
              .catch((error) => {
                console.log("Error in registering", error);
              });
        }

        else {
            fetch(`${apiurl}/api/user/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                  setUserData(data);
                  navigate("/home");
              })
              .catch((error) => {
                console.log("Error in registering", error);
              });
        }
    }

    return (
      <div className="grid grid-cols-12 mt-40">
        <div className="border-2 col-start-5 col-span-4">
          <div className="grid grid-cols-2 ">
            <div
              className="border-2 flex justify-center"
              onClick={() => {
                setRegister(true);
                setPassword("");
                setUsername("");
                setName("");
              }}
            >
              <button className="p-2 w-full hover:bg-blue-600 hover:text-white  focus:outline-none focus:ring">
                Register
              </button>
            </div>
            <div
              className="border-2 flex justify-center"
              onClick={() => {
                setRegister(false);
                setPassword("");
                setUsername("");
                setName("");
              }}
            >
              <button className="p-2 w-full hover:bg-blue-600 hover:text-white  focus:outline-none focus:ring">
                Login
              </button>
            </div>
          </div>
          {register && (
            <>
              <form onSubmit={handleFormSubmit} className="flex flex-col p-4">
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Abhishek Kumar"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    required
                    value={password}
                    autoComplete="section-blue shipping address-level2"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-center pb-2">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Register
                  </button>
                </div>
              </form>
            </>
          )}
          {!register && (
            <>
              <form className="flex flex-col p-4">
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    required
                    value={password}
                    autoComplete="section-blue shipping address-level2"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-center pb-2">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    );
}

export default Register;