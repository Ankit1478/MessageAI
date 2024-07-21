import mongoose, { Document, Schema } from "mongoose";


export interface Message extends Document {
    content: string,
    createdAt: Date
}

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


const MessageSchema: Schema<Message> = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is Required"],
        match: [/.+\@.+\..+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is Required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code expiry is Required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: false
    },
    messages: [MessageSchema]
})


const userModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));

export default userModel;


