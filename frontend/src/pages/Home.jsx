import { useNavigate } from "react-router";
import apiurl from "../constant";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
      <>
        <div className="grid grid-cols-12 p-2">
          <div className="col-span-6 col-start-4 border-2 flex  flex-col justify-center items-center">
            <div className="border-b-2 p-2 border-black-700 flex justify-between w-full">
              <div>
                <h1 className="text-4xl">Mini-Twitter</h1>
              </div>
              <div className=" w-96">
                <div className="flex justify-between">
                  <Link
                    to="/home/tweet"
                    className="focus:underline focus:outline-none"
                  >
                    Home
                  </Link>
                  {/* <Link
                    to="follow"
                    className="focus:underline focus:outline-none"
                  >
                    Follow
                  </Link> */}
                  <Link
                    to="createtweet"
                    className="focus:underline focus:outline-none"
                  >
                    Create Tweet
                  </Link>
                  <Link
                    to="mytweet"
                    className="focus:underline focus:outline-none"
                  >
                    My Tweets
                  </Link>
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
                        .then((data) => {
                          alert(data.message);
                          navigate("/");
                        })
                        .catch((error) => console.log(error));
                    }}
                    className="focus:underline focus:outline-none "
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 w-full flx">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
};

export default Home;