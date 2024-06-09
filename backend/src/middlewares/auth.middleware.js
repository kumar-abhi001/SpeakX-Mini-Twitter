import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(401).send({
                message: "Unauthorized Access",
                status: 401,
                data: ""
            })
        }
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(401).send({ message: "Unauthorized Access" });
        }

        const user = await Users.findById(decodedToken._id).select("-refreshToken -password");
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in authentication: ", error);
        res.send({ message: "Error in authentication" });
    }
}

export default verifyJWT;