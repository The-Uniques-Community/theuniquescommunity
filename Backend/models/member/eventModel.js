import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    eventName:{
        type: String,
        required: true
    },
    eventDescription:{
        type: String,
        required: true
    },
    eventBanner:{
        type: String,
        
    },
    eventDate:{
        type: Date,
        required: true
    },
    eventTime:{
        type: String,
        required: true
    },
    eventVenue:{
        type: String,
        required: true
    },
    eventOrganizer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    eventMembers:[{
        // Array of member ids
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
    }],
    eventGuests:{
        type: Array,
        default: []
    },
    eventType:{
        type: String,
        required: true,
        multiple: true,
        enum:["Workshop","Seminar","Webinar","Hackathon","Competition","Conference","Fest","Cultural","Ideathon","Sports","Talk Show","Meetup","Others"]
    },
    eventStatus:{
        type: String,
        default: "upcoming",
        enum:["upcoming","ongoing","completed"]
    }
});

const Event = mongoose.model('Event', eventSchema)
export default Event;