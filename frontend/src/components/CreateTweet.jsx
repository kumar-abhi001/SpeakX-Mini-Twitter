import { useState } from "react"
import apiurl from "../constant";
const CreateTweet = () => {
    const [content, setContent] = useState("");
    const [media, setMedia] = useState("");

    

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("content",content);
        formData.append("media", media);
        
        console.log("formData is printed", formData);
        fetch(`${apiurl}/api/user/tweet/create`, {
          method: "POST",
          body: formData,
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
    }
    return (
      <div className="flex flex-col border-2 m-2 rounded-3xl mx-20 items-center">
        <div>Create New Tweet</div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col p-4">
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Write your tweet
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Your tweet"
                value={content}
                onChange={(e) => {setContent(e.target.value)}}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="media"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="file"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                autoComplete="section-blue shipping address-level2"
                onChange={(e) => setMedia(e.target.files[0])}
              />
            </div>
            <div className="flex justify-center pb-2">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Tweet
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default CreateTweet;