import mongoose, { Schema } from "mongoose";

const followSchema = new Schema({
    followerId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    }
},
    {
        timestamps: true
    }
);


export const Follows = mongoose.model("Follows", followSchema);