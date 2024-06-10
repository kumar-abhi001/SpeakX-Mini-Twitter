import { useState } from "react";
import apiurl from "../constant";
import { useNavigate } from "react-router";

const ModifyTweet = ({ data, fetchTweet }) => {
  const [edit, setEdit] = useState(false);
  const [tweetContent, setTweetContent] = useState(data?.content);
  const [mediaContent, setMediaContent] = useState(data?.media)

  const editTweet = () => {
    if (edit) {
      // Save the edited tweet
      fetch(`${apiurl}/api/user/tweet/edit`, {
        method: "PUT",
        body: JSON.stringify({
          tweetId: data._id,
          content: tweetContent,
          media: mediaContent
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.message);
          fetchTweet();
          setEdit(false);
        });
    } else {
      setEdit(true);
    }
  };

  const deleteTweet = (event) => {
    fetch(`${apiurl}/api/user/tweet/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        tweetId: event.target.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchTweet();
      });
  };

  return (
    <div className="flex flex-col border-2 m-2 rounded-3xl mx-20">
      <div className="m-2 flex justify-between">
        <div className="flex flex-row">
          <div className="font-bold mx-2">
            {data?.userId?.name.toUpperCase()}
          </div>
          <div className="font-light mr-1">@{data?.userId?.username}</div>
          <div className="self-center">·</div>
          <div className="ml-1">{data?.createdAt.substring(0, 10)}</div>
        </div>
        <div className="flex">
          <button
            onClick={editTweet}
            className="mr-4 border-2 px-2 rounded-lg"
            id={data._id}
          >
            {edit ? "Save" : "Edit"}
          </button>
          <button
            className="mr-2 border-2 px-2 rounded-lg"
            id={data._id}
            onClick={deleteTweet}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="m-3">
        {edit ? (
          <textarea
            className="w-full h-32 p-2 border rounded-lg"
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
          />
        ) : (
          <p>{tweetContent}</p>
        )}
      </div>
      <div className="m-3">
        {data?.mediaType === "image" && (
          <img src={data?.media} alt="" className="h-80 w-full" />
        )}
        {data?.mediaType === "video" && (
          <video width="" controls>
            <source src={mediaContent} type="video/mp4" onChange={(event) => setMediaContent(event.target.files[0])}/>
          </video>
        )}
      </div>
    </div>
  );
};

export default ModifyTweet;
