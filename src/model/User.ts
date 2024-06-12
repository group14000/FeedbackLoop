import mongoose, { Schema, Document } from "mongoose";

// Interface for Message Document
export interface Message extends Document {
    content: string;
    createdAt: Date;
}

// Message Schema
const MessageSchema: Schema<Message> = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    }
);

// Interface for User Document
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

// User Schema
const UserSchema: Schema<User> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        verifyCode: {
            type: String,
            required: [true, "Verify code is required"],
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "Verify code expiry is required"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAcceptingMessages: {
            type: Boolean,
            default: true,
        },
        messages: [MessageSchema],
    }
);

// Export the User model
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)
export default UserModel;