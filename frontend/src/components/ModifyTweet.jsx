import apiurl from "../constant";

const ModifyTweet = ({
    data, fetchTweet
}) => {
  console.log(data);
  const deleteTweet = (event) => {
    console.log("modify", data);
    fetch(`${apiurl}/api/user/tweet/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        tweetId: event.target.id
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
  }
    return (
      <div className="flex flex-col border-2 m-2 rounded-3xl mx-20">
        <div className=" m-2 flex justify-between">
          <div className="flex flex-row">
            <div className="font-bold mx-2">{data?.userId?.name}</div>
            <div className="font-light mr-1">@{data?.userId?.username}</div>
            <div className=" self-center">·</div>
            <div>{data?.createdAt}</div>
          </div>
          <div className="flex">
            <button className="mr-4 border-2 px-2 rounded-lg" id={data._id}>
              Edit
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
        <div className="m-3">{data?.content}</div>
        <div className="m-3">
          {data?.mediaType === 'image' && (
            <img src={data?.media} alt="" className=" h-80 w-full"/>
          )}
          {data.mediaType === 'video' &&
            <video width="" controls>
              <source
                src={data?.media}
                type="video/mp4"
              />
            </video>}
        </div>
      </div>
    );
}

export default ModifyTweet;