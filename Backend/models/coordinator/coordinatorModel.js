import mongoose from "mongoose";

const coordinatorSchema = new mongoose.Schema({
    fullName:{
        type: String,
    },
    email:{
        type: String,  
    },
    role:{
        type: String,
        default: 'coordinator',
    },
    password:{
        type: String,
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

const Coordinator = mongoose.model('Coordinator', coordinatorSchema);
export default Coordinator;