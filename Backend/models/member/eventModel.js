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
    },
    eventTime:{
        type: String,
    },
    eventVenue:{
        type: String,
    },
    eventOrganizerBatch:{
        type: String,
        enum:["The Uniques 1.0","The Uniques 2.0", "The Uniques 3.0", "The Uniques 4.0", "The Uniques 5.0",]
    },
    eventGuests:[{
        guestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Guest'
        },
        guestTag: {
            type: String,
            enum: ["speaker", "moderator", "panelist", "judge", "mentor", "organizer", "sponsor", "partner", "chief guest", "others"],
            default: "others"
        }
    }],
    
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
    },
    eventForm:{
        type: Array,
        default: []
    }
});

const Event = mongoose.model('Event', eventSchema)
export default Event;