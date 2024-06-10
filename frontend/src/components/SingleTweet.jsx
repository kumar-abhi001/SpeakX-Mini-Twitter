
const SingleTweet = (
    {data}
) => {
    return (
        <div className="flex flex-col border-2 m-2 rounded-3xl mx-20">
          <div className=" m-2 flex">
            <div className="font-bold mx-2">{data?.userId?.name}</div>
            <div className="font-light mr-1">@{data?.userId?.username}</div>
            <div className=" self-center">·</div>
                <div>{ data?.updatedAt.substring(0, 10)}</div>
          </div>
            <div className="m-3">{data?.content}</div>
            <div className="m-3">
                <img src={data?.media} alt="" />
          </div>
        </div>
    );
}

export default SingleTweet;