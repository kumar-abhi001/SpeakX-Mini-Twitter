import { useEffect, useState } from "react";
import apiurl from "../constant";
import SingleTweet from "./SingleTweet";

const Tweet = () => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        fetch(`${apiurl}/api/user/followerTweets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setTweets(data.data)
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    }, [])
    return (
        <>
            <h1 className=" text-2xl">TWEETS</h1>
            {tweets.map((data) => {
                return <SingleTweet data={data} key={data._id} />
            })}
        </>
    )
}

export default Tweet;