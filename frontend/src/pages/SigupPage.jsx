import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";


function SigupPage() {
  const [isRegister, setIsRegister] = useState(true);
    return (
      <div className="grid grid-cols-12 mt-40">
        <div className="border-2 col-start-5 col-span-4">
          <div className="grid grid-cols-2 ">
            <div
              className="border-2 flex justify-center"
              onClick={() => {
                setIsRegister(true);
              }}
            >
              <button className="p-2 w-full hover:bg-blue-600 hover:text-white  focus:outline-none focus:ring">
                Register
              </button>
            </div>
            <div
              className="border-2 flex justify-center"
              onClick={() => {
                setIsRegister(false);
              }}
            >
              <button className="p-2 w-full hover:bg-blue-600 hover:text-white  focus:outline-none focus:ring">
                Login
              </button>
            </div>
            <div></div>
          </div>
          {isRegister && <Register setIsRegister={ setIsRegister } />}
          {!isRegister && <Login />}
        </div>
      </div>
    );
}

export default SigupPage;