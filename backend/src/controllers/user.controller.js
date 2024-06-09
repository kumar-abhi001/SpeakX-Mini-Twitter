import { asyncHandler } from "../utils/asyncHandler.js";
import { user } from "../models/user.model.js";
import tweet from "../models/tweet.model.js";

const registerUser = asyncHandler(async (req, res) => { 
    const { name, username, password } = req.body;

    const userExist = await user.findOne({ username });

    if (userExist) {
        return res.status(409).send({
            message: "Username already exists",
            statusCode: 409
        })
    }

    const newUser = await user.create({
        name,
        username,
        password,
        refreshToken: "",
    })

    const createdUser = await user.findById(newUser._id).select(
        "-password -refreshToken"
    )

    res.status(202)
        .send({
        statusCode: 202,
        message: "user is created successfully",
        data: createdUser
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const userExist = await user.findOne({ username });
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

    const userData = await user.findById(userExist._id).select("-password -refreshToken");

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
    const User = await user.findById(req.User?._id);
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
    const tweets = await tweet.find().populate("user", "-password -refreshToken");
    res.status(200).send({
        statusCode: 200,
        message: "All tweets",
        data: tweets
    });
});

const createTweet = asyncHandler(async (req, res) => {
    const { content, media } = req.body;
});

const editTweet = asyncHandler(async (req, res) => { });

const deleteTweet = asyncHandler(async (req, res) => { });

const myTweets = asyncHandler(async (req, res) => { });

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