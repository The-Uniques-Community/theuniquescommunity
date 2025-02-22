const mongoose = require('mongoose');
const File = require('./fileModel');
const Event = require('./eventModel');

const memberSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    admno: {
        type: String,
        required: true,
        unique: true,
        match: [/^[0-9]{4}(BTCS|BTCSD)[0-9]{3}$/]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'member',
    },
    batch: {
        type: String,
        required: true,
        enum: ["The Uniques 1.0", "The Uniques 2.0", "The Uniques 3.0"]
    },
    contact: {
        type: String,
        required: true
    },
    whatsappContact:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    isPlaced: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
    profileStatus:{
        type: String,
        default: "inactive",
        enum: ["inactive", "active", "blocked"]
    },
    fineStatus:{
        type: String,
        default: "0",
    },
    certifications: [File],
    skills: {
        type: Array,
        default: []
    },
    projects: {
        type: Array,
        default: []
    },
    internships: {
        type: Array,
        default: []
    },
    achievements: {
        type: Array,
        default: []
    },
    socialLinks: {
        type: Array,
        default: []
    },
    bio: {
        type: String,
        default: ''
    },
    profilePic: File,

    // Storing event references using ObjectId
    event_participation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],

    // Allowing multiple contribution types per event
    eventContributionType: [{
        type: String,
        enum: ["Organizer", "Co-Organizer", "Infrastructure", "Marketing", "Graphic Designing", "Volunteer", "Participant", "Technical Team", "Printing & Stationery", "Others"]
    }],
    course: {
        type: String,
        required: true,
        enum: ["B.Tech CSE", "CSD"]
    }

});

module.exports = mongoose.model('Member', memberSchema);
