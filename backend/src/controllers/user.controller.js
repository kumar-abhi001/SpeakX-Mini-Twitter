import { asyncHandler } from "../utils/asyncHandler.js";
import { Users } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Tweets } from "../models/tweet.model.js";

const registerUser = asyncHandler(async (req, res) => { 
    const { name, username, password } = req.body;

    const userExist = await Users.findOne({ username });

    if (userExist) {
        return res.status(409).send({
            message: "Username already exists",
            statusCode: 409
        })
    }

    const newUser = await Users.create({
        name,
        username,
        password,
        refreshToken: "",
    })

    const createdUser = await Users.findById(newUser._id).select(
        "-password -refreshToken"
    )

    res.status(202)
        .send({
        statusCode: 202,
        message: "Users is created successfully",
        data: createdUser
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const userExist = await Users.findOne({ username });
    if(!userExist) {
        return res.status(404).send({
            message: "User not found",
            statusCode: 404
        })
    }

    const isMatch = await userExist.checkPassword(password);
    if (!isMatch) {
        return res.status(401).send({
            message: "Invalid credentials",
            statusCode: 401
        })
    }

    const accessToken = await userExist.generateAccessToken();
    const refreshToken = await userExist.generateRefreshToken();
    userExist.refreshToken = refreshToken;
    userExist.save();

    const option = {
        httpOnly: true,
        secure: true,
    }

    const userData = await Users.findById(userExist._id).select("-password -refreshToken");

    res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .send({
            statusCode: 200,
            message: "User is logged in successfully",
            data: userData
        });
});

const logoutUser = asyncHandler(async (req, res) => {
    const User = await Users.findById(req.User?._id);
    User.refreshToken = "";
  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .clearCookie("refreshToken", option)
    .clearCookie("accessToken", option)
    .send({statusCode: 200, message: "User is logged out successfully"});
});

const getAllTweets = asyncHandler(async (req, res) => {
    const tweets = await Tweets.find().populate("Users", "-password -refreshToken");
    res.status(200).send({
        statusCode: 200,
        message: "All tweets",
        data: tweets
    });
});

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    console.log(content);
    const mediaUrl = await uploadOnCloudinary(req.file.path);
    if (!mediaUrl) {
        return res.status(500).send({
            message: "Cannot upload media file",
            statusCode: 500
        });
    }

    
    const newTweet = await Tweets.create({
        content,
        media: mediaUrl,
        userId: req.user._id
    });

    res.status(201).send({
        statusCode: 201,
        message: "Tweet is created successfully",
        data: newTweet
    });
});

const editTweet = asyncHandler(async (req, res) => {
    const { tweetId, content } = req.body;
    const newUrl = await uploadOnCloudinary(req.file.path);
    if (!newUrl) {
        return res.status(500).send({
            message: "Unable to upload new media file",
            statusCode: 500
        });
    }

    const updatedTweet = await Tweets.findByIdAndUpdate(tweetId, {
        content,
        media: newUrl
    });
    
    if (!updatedTweet) {
        return res.status(404).send({
            message: "Tweet is not found/updated",
            statusCode: 404
        });
    }

    res.status(200).send({
        message: "Tweet is updated sucessfully",
        statusCode: 200,
        updatedTweet: updatedTweet
    });
});

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.body;
    const deletedTweet = await Tweets.findByIdAndDelete(tweetId);
    if (!deletedTweet) {
        return res.status(404).send({
            message: "Tweet not found",
            statusCode: 404
        });
    }

    res.status(200).send({
        statusCode: 200,
        message: "Tweet is deleted successfully",
        data: deletedTweet
    });
});

const myTweets = asyncHandler(async (req, res) => {
    const myTweets = await Tweets.find({ userId: req.user._id }).populate("userId", "-password -refreshToken");
    res.status(200).send({
        statusCode: 200,
        message: "My tweets",
        data: myTweets
    });
});

const followUser = asyncHandler(async (req, res) => { });

const unfollowUser = asyncHandler(async (req, res) => { });
export {
    registerUser,
    loginUser,
    logoutUser,
    getAllTweets,
    createTweet,
    editTweet,
    deleteTweet,
    myTweets,
    followUser,
    unfollowUser
}