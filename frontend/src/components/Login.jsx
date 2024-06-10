import { useState } from "react";
import apiurl from "../constant";
import { Navigate, useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Handle Login");
        fetch(`${apiurl}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
              body: JSON.stringify({
                username,
                password,
              }),
              credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
            alert(data.message);
            navigate("/home/tweet");
        })
            .catch((error) => {
            console.log("Error in registering", error);
        });
    }

    return (
      <>
        <form onSubmit={handleLogin} className="flex flex-col p-4">
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
    );
}

export default Login;