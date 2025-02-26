import Member from '../../models/member/memberModel.js'
import Event from '../../models/member/eventModel.js'
// approve pending member profile

export const approveProfile = async (req, res) => {
    try {
        const { email } = req.body;
        const member = await Member.findOne({ email });
        if (!member) {
            return res.status(400).json({ message: "User does not exist" });
        }
        await Member.updateOne(
            { email },
            {
                isVerified: true,
                profileStatus: "approved"
            }
        );
        res.status(200).json({ message: "User profile approved successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const blockMember = async (req, res) => {
    try {
        const { email } = req.body;
        const member = await Member.findOne({ email });
        if (!member) {
            return res.status(400).json({ message: "User does not exist" });
        }
        await Member.updateOne(
            { email },
            {
                isSuspended: true,
                profileStatus:"blocked"
            }
        );
        res.status(200).json({ message: "User blocked successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const unblockMember = async (req, res) => {
    try {
        const { email } = req.body;
        const member = await Member.findOne({ email });
        if (!member) {
            return res.status(400).json({ message: "User does not exist" });
        }
        await Member.updateOne(
            { email },
            {
                isSuspended: false,
                profileStatus:"active"
            }
        );
        res.status(200).json({ message: "User unblocked successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// impose fine
export const imposeFine = async (req, res) => {
    try {
        const { email, fine } = req.body;
        const member = await Member.findOne({ email });
        if (!member) {
            return res.status(400).json({ message: "User does not exist" });
        }
        await Member.updateOne(
            { email },
            {
                fineStatus: fine
            }
        );
        res.status(200).json({ message: "Fine imposed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
// list a new event
export const listNewEvent = async (req, res) => {
    try {
        const { eventName, eventDescription, eventDate, eventTime, eventVenue, eventOrganizer, eventType } = req.body;
        const event = new Event({
            eventName,
            eventDescription,
            eventDate,
            eventTime,
            eventVenue,
            eventOrganizer,
            eventType
        });
        await event.save();
        res.status(200).json({ message: "Event listed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

