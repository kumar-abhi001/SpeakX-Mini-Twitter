import { useEffect, useState } from "react";
import apiurl from "../constant";
import User from "../components/User";

const Follow = () => {
  const [userList, setUserList] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
    useEffect(() => { 
        fetch(`${apiurl}/api/user/allUser`, {
            method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            setUserList(data.data?.users);
            setFollowingUsers(data.data?.followingUser);
          });
    }, [])
    return (
      <div>
        <div>{
          followingUsers.map((data) => (
            <User data={data} isFollow="Following" key={data._id} />
          ))
        }</div>
        <div>
          {userList.map((data) => (
            <User data={data} isFollow="Follow" key={data._id} />
          ))}
        </div>
      </div>
    );
}

export default Follow;