const mongoose = require('mongoose')
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

module.exports = mongoose.model('File', fileSchema)