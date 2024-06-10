import { asyncHandler } from "../utils/asyncHandler.js";
import { Users } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Tweets } from "../models/tweet.model.js";
import { Follows } from "../models/follow.model.js";

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
    
    const User = await Users.findById(req.user?._id).select("-password");
    User.refreshToken = "";
    User.save();
  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .clearCookie("refreshToken", option)
    .clearCookie("accessToken", option)
    .send({statusCode: 200, message: "User is logged out successfully"});
});

const validateUser = asyncHandler(async (req, res) => { 
    res.status(202)
        .send({ message: "User is authenticated", valide: true });
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
    let mediaUrl = "";
    if (req.file?.path) {
        mediaUrl = await uploadOnCloudinary(req.file?.path);
        if (!mediaUrl) {
            return res.status(500).send({
                message: "Cannot upload media file",
                statusCode: 500
            });
        }
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

    await Tweets.findByIdAndUpdate(tweetId, {
        content,
        media: newUrl
    });
    
    const updatedTweet = await Tweets.findById(tweetId);
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

// need to implement what if already following and whether the followingId exists or not
const followUser = asyncHandler(async (req, res) => {
    const { followingId } = req.body;
    const followerId = req.user._id.toString();
    console.log("User deatails form auth", followerId);

    // const followExist = await Follows.findOne({ followingId});
    
    // if(followExist) {
    //     return res.status(409).send({
    //         message: "Already following",
    //         statusCode: 409
    //     });
    // }
    const newFollow = await Follows.create({
        followerId,
        followingId
    });

    res.status(201).send({
        statusCode: 201,
        message: "Followed successfully",
        data: newFollow
    });
});

const unfollowUser = asyncHandler(async (req, res) => {
    const { followingId } = req.body;

    const isFollowing = await Follows.findOne({ followingId });
    if(!isFollowing) {
        return res.status(404).send({
            message: " Your are Not following the user",
            statusCode: 404
        });
    }

    await Follows.findOneAndDelete({ followingId });
    res.status(200).send({
        statusCode: 200,
        message: "You have unfollowed the user successfully"
    });
});

const accountDetail = asyncHandler(async (req, res) => {
    const userId = req.user._id.toString();
    const followerCount = await Follows.find({ followingId: userId }).countDocuments();
    const followingCount = await Follows.find({ followerId: userId }).countDocuments();
    const tweetCount = await Tweets.find({ userId }).countDocuments();
    
    const useDetails = await Users.findById(userId).select("-password -refreshToken");

    res.status(200)
        .send({
            statusCode: 200,
            message: "User details",
            data: {
                followerCount,
                followingCount,
                tweetCount,
                useDetails
            }
        })
})

const getFollowerTweets = asyncHandler(async (req, res) => { 
    const userId = req.user._id.toString();
    const followingIds = await Follows.find({ followerId: userId }).select("followingId");
    const followingId = followingIds.map((item) => item.followingId);

    const tweets = await Tweets.find({ userId: { $in: followingId } }).populate("userId", "-password -refreshToken");
    res.status(200).send({
        statusCode: 200,
        message: "Follower tweets",
        data: tweets
    });
});
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
    unfollowUser,
    accountDetail,
    getFollowerTweets,
    validateUser
}