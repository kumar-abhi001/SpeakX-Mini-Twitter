import { useEffect, useState } from "react";
import apiurl from "../constant";
import User from "../components/User";

const Follow = () => {
    const [userList, setUserList] = useState([]);
    useEffect(() => { 
        fetch(`${apiurl}/api/user/allUser`, {
            method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            setUserList(data.data);
          });
    }, [])
    return (
      <div>
        {userList.map((data) => (
          <User data={data} key={data._id}/>
        ))}
      </div>
    );
}

export default Follow;