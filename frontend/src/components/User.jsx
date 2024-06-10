import { useState } from "react";
import apiurl from "../constant";

const User = ({ data, isFollow }) => {
    const [follow, setFollow] = useState(isFollow);

    const handleClick = (event) => {
        console.log(event.target.followingstatus);
        if (event.target) {
            fetch(`${apiurl}/api/user/follow`, {
              method: "POST",
              body: JSON.stringify({
                followingId: event.target.id
              }),
              credentials: "include"
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
            })
        } else {

        }
    }
    return (
        <div className=" mx-24 border-2 pl-2">
            <div className="flex  justify-between">
                <div>{data?.username ?? data.followingId.username}</div>
                <button id={data._id} onClick={handleClick} className="border-2 bg-blue-700 text-white p-1 hover:bg-blue-500" >{follow}</button>
            </div>
        </div>
    )
}

export default User;