import Member from "../../models/member/memberModel.js";
import Enquiry from "../../models/Enquiry/enquiryModel.js";
import sendContactEmail from "../../services/members/sendContactEmail.js";
// Get all public members with pagination and filters
export const getPublicMembers = async (req, res) => {
    try {
      const { batch, search } = req.query;
      
      // Build query conditions - REMOVED status filters to show ALL members
      const queryConditions = {
        // We're intentionally not filtering by profileStatus, verification, or suspension status
      };
      
      // Add batch filter if provided
      if (batch && batch !== "All") {
        queryConditions.batch = batch;
      }
      
      // Add search filter if provided
      if (search) {
        queryConditions.$or = [
          { fullName: { $regex: search, $options: 'i' } },
          { bio: { $regex: search, $options: 'i' } },
          { course: { $regex: search, $options: 'i' } },
          { skills: { $regex: search, $options: 'i' } }
        ];
      }
      
      // Execute query without pagination and order by complete profiles first
      const members = await Member.find(queryConditions)
        .populate('profilePic')
        .populate('certifications')
        .sort({ 
          // Sort complete profiles first, then by batch and name
          profileStatus: -1, // 'active' comes before other statuses alphabetically
          isVerified: -1,    // true comes before false in descending order
          isSuspended: 1,    // false comes before true in ascending order
          batch: 1, 
          fullName: 1 
        });
        
      // Get total count 
      const total = members.length;
      
      // Process members to include only public-safe information, handle missing fields
      const formattedMembers = members.map(member => ({
        _id: member._id,
        fullName: member.fullName || member.email,
        batch: member.batch || null,
        course: member.course || null,
        isPlaced: member.isPlaced || false,
        bio: member.bio || null,
        
        // Handle profilePic - whether it's a populated document or a string URL
        profilePic: member.profilePic 
          ? (member.profilePic.url || member.profilePic) 
          : null,
        
        // Format skills - ensure arrays exist
        skills: Array.isArray(member.skills) ? member.skills : [],
        
        // Social media - default to null for missing values
        linkedinProfile: member.linkedinProfile || null,
        githubProfile: member.githubProfile || null,
        twitterProfile: member.twitterProfile || null,
        instagramProfile: member.instagramProfile || null,
        
        // Projects - ensure arrays exist
        projects: Array.isArray(member.projects) ? member.projects : [],
        
        // Achievements - ensure arrays exist
        achievements: Array.isArray(member.achievements) ? member.achievements : [],
        
        // Certifications - ensure arrays exist
        certifications: member.certifications || [],
        
        // Community contributions - ensure arrays exist
        eventContributionType: member.eventContributionType || [],
        
        // Add profile status info that might be useful for UI rendering
        profileStatus: member.profileStatus || "incomplete",
        isVerified: !!member.isVerified,
        isSuspended: !!member.isSuspended
      }));
      
      // Return results without pagination info
      return res.status(200).json({
        success: true,
        message: "All members retrieved successfully",
        data: formattedMembers,
        count: total
      });
      
    } catch (error) {
      console.error("Error fetching public members:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch members",
        error: error.message
      });
    }
  };
// Get a single public member by ID
export const getPublicMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await Member.findOne({
      _id: id,
      profileStatus: "active",
      isVerified: true,
      isSuspended: false
    }).populate('profilePic').populate('certifications');
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found or profile is not public"
      });
    }
    
    // Format member data for public consumption
    const formattedMember = {
      _id: member._id,
      fullName: member.fullName,
      batch: member.batch,
      course: member.course,
      isPlaced: member.isPlaced,
      bio: member.bio,
      profilePic: member.profilePic ? (member.profilePic.url || member.profilePic) : null,
      skills: Array.isArray(member.skills) ? member.skills : [],
      linkedinProfile: member.linkedinProfile,
      githubProfile: member.githubProfile,
      twitterProfile: member.twitterProfile,
      instagramProfile: member.instagramProfile,
      projects: Array.isArray(member.projects) ? member.projects : [],
      achievements: Array.isArray(member.achievements) ? member.achievements : [],
      certifications: member.certifications || [],
      eventContributionType: member.eventContributionType || []
    };
    
    return res.status(200).json({
      success: true,
      message: "Member retrieved successfully",
      data: formattedMember
    });
    
  } catch (error) {
    console.error("Error fetching public member:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch member details",
      error: error.message
    });
  }
};

// Add this method to get member counts by batch
export const getMemberCounts = async (req, res) => {
    try {
      const counts = await Member.aggregate([
        { $match: { isSuspended: { $ne: true } } },
        { $group: { _id: "$batch", count: { $sum: 1 } } }
      ]);
      
      const data = {
        "All": 0,
        "The Uniques 1.0": 0,
        "The Uniques 2.0": 0,
        "The Uniques 3.0": 0,
        "The Uniques 4.0": 0
      };
      
      let total = 0;
      counts.forEach(item => {
        if (item._id) {
          data[item._id] = item.count;
          total += item.count;
        }
      });
      data["All"] = total;
      
      return res.status(200).json({
        success: true,
        message: "Batch counts retrieved successfully",
        data
      });
      
    } catch (error) {
      console.error("Error getting member counts:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch member counts",
        error: error.message
      });
    }
  };

  export const submitContactForm = async (req, res) => {
    try {
        // Extract contact form data
        const { firstName, lastName, email, phone, message, services } = req.body;
        
        // Basic validation
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: firstName, lastName, email, and message'
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }
        
        // Store the enquiry in the database
        const newEnquiry = new Enquiry({
            firstName,
            lastName,
            email,
            phone: phone || undefined,
            message,
            services: services || [],
            ipAddress: req.ip,
            referrer: req.get('referer') || 'Direct'
        });
        
        await newEnquiry.save();
        
        // Send email notification
        const emailSent = await sendContactEmail({
            ...req.body,
            enquiryId: newEnquiry._id // Include the enquiry ID for reference
        });
        
        if (!emailSent) {
            // Even if the email fails, the enquiry is stored in the database
            console.warn(`Email notification failed for enquiry ID: ${newEnquiry._id}`);
        }
        
        // Success response
        return res.status(200).json({
            success: true,
            message: 'Contact form submitted successfully',
            enquiryId: newEnquiry._id
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while processing your request',
            error: error.message
        });
    }
};
