import { useEffect, useState } from "react"
import apiurl from "../constant";
import ModifyTweet from "./ModifyTweet";

const Mytweet = () => {
    const[tweets, setTweets] = useState([]);

    useEffect(() => { 
        fetchTweet();
    }, [])

    const fetchTweet = () => {
        fetch(`${apiurl}/api/user/myTweets`, {
          method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            setTweets(data.data);
          });
    }
    return (
        <div>
            {tweets.map((data) => (
                <ModifyTweet data={data} key={data._id} fetchTweet={fetchTweet}/>
            ))}
        </div>
    )
}

export default Mytweet