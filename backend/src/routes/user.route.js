import { Router } from "express";
import {
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

} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRoute = Router();

userRoute.route("/register").post(registerUser);

userRoute.route("/login").post(loginUser);
userRoute.route("/logout").post(verifyJWT, logoutUser);
userRoute.route("/tweet").get(verifyJWT, getAllTweets);
userRoute.route("/tweet/create").post(verifyJWT, upload.single("media"), createTweet);
userRoute.route("/tweet/edit").put(verifyJWT, upload.single("media"), editTweet);
userRoute.route("/tweet/delete").delete(verifyJWT, deleteTweet);
userRoute.route("/myTweets").get(verifyJWT, myTweets);
userRoute.route("/follow").post(verifyJWT, followUser);
userRoute.route("/unfollow").post(verifyJWT, unfollowUser);

// userRoute.route("/tweet").post(verifyJWT, tweet);
export default userRoute;