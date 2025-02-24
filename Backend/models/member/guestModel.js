import mongoose from 'mongoose'

const guestSchema = new mongoose.Schema({
    guestName:{
        type: String,
        required: true
    },
    guestEmail:{
        type: String,
        required: true
    },
    guestContact:{
        type: String,
        required: true
    },
    guestLinkedin:{
        type: String,
        required: true
    },
    guestCompany:{
        type: String,
        required: true
    },
    guestDesignation:{
        type: String,
        required: true
    },
    guestImage:{
        type: String,
        required: true
    },
    guestEvents:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
});

const Guest = mongoose.model('Guest', guestSchema);
export default Guest;