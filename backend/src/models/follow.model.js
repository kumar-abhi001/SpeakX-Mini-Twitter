import mongoose, { Schema } from "mongoose";

const followSchema = new Schema({
    followerId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},
    {
        timestamps: true
    }
);


export const follow = mongoose.model("follow", followSchema);