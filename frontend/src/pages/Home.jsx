import { useNavigate } from "react-router";
import apiurl from "../constant";
function Home() {
    const navigate = useNavigate();
    return (
      <>
        <div className="main div">
          <div className=" border-2 p-2 border-red-700 flex justify-between">
            <div>
              <h1 className="text-4xl">Mini-Twitter</h1>
            </div>
            <div className=" w-80 ">
              <div className="flex justify-between w-80">
                <button className=" focus:underline focus:outline-none"
                    onClick={() => navigate("/")}    
                >
                  Home
                </button>
                <button className="focus:underline focus:outline-none "
                    onClick={() => navigate("/mytweet")}
                >
                  My Tweets
                </button>
                <button 
                  onClick={() => {
                    fetch(`${apiurl}/api/user/logout`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "include",
                    })
                      .then((response) => response.json())
                      .then((data) => console.log(data.message))
                      .catch((error) => console.log(error));
  
                    }}
                    className="focus:underline focus:outline-none ">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Home;