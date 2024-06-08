import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    content: {
        type: String
    },
    media: {
        type: String
    }
},
    {
        timestamps: true
    }
);

export const tweet = mongoose.model("tweet", tweetSchema);