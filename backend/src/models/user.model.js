import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Defining user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trime: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

     refreshToken: {
      type: String,
    },
},
    {
        timestamps: true
    }
);

// Encrypting the password before saving into the database
userSchema.pre("save", async function (next) {
    if (this.isModified("password") === true) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            console.log("ERROR in password hashing: ", error);
        }
    }
    next();
});

//method to check password is correct or not
usersSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password); // return boolean value
};

//generate access token
usersSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//adding method to creating refresh token
usersSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const user = mongoose.model("Users", usersSchema);