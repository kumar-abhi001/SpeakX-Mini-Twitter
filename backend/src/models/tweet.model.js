import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    content: {
        type: String
    },
    media: {
        type: String
    },
    mediaType: {
        type: String
    }
},
    {
        timestamps: true
    }
);

export const Tweets = mongoose.model("Tweets", tweetSchema);