import { useState } from "react";

const User = ({ data }) => {
    const [follow, setFollow] = useState("Follow");
    return (
        <div className=" mx-24 border-2 pl-2">
            <div className="flex  justify-between">
                <div>{data.username}</div>
                <button id={data._id} className="border-2 bg-blue-700 text-white p-1 hover:bg-blue-500" >{follow}</button>
            </div>
        </div>
    )
}

export default User;