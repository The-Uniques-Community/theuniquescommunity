import mongoose from 'mongoose'
const fileSchema = new mongoose.Schema({
    fileName:{
        type: String,
        required: true,
    },
    fileUrl:{
        type: String,
        required: true
    },
    fileId:{
        type: String,
        required: true
    },
    fileOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
});

const File = mongoose.model('File', fileSchema)
export default File;