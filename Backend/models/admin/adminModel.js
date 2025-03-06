import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminName:{
        type: String,
    },
    adminEmail:{
        type: String,  
    },
    role:{
        type: String,
        default: 'admin',
    },
    adminContact:{
        type: String,
    },
    adminDesignation:{
        type: String,
    },
    profilePic:{
        type: String,
    },
    googleId:{
        type: String,
    }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;