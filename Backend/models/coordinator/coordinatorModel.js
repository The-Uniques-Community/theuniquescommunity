import mongoose from "mongoose";

const coordinatorSchema = new mongoose.Schema({
    coordinatorName:{
        type: String,
    },
    coordinatorEmail:{
        type: String,  
    },
    role:{
        type: String,
        default: 'coordinator',
    },
    coordinatorContact:{
        type: String,
    },
    coordinatorDesignation:{
        type: String,
    },
    profilePic:{
        type: String,
    },
    googleId:{
        type: String,
    }
});