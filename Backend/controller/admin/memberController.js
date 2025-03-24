import Member from "../../models/member/memberModel.js";

export const getSingleMember = async (req, res) => {
    try {
      const { id } = req.params;
      
      const member = await Member.findById(id)
        .select('-password') // Exclude password from the response
        .populate('certifications')
        .populate('profilePic')
        .populate('event_participation');
      
      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: member
      });
    } catch (error) {
      console.error('Error fetching member:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  
  // Get all members with pagination
  export const getAllMembers = async (req, res) => {
    try {
      const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
      
      // Convert page and limit to numbers
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      
      // Calculate skip value for pagination
      const skip = (pageNum - 1) * limitNum;
      
      // Create sort object
      const sortOptions = {};
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
      
      // Get total count for pagination info
      const total = await Member.countDocuments();
      
      // Fetch members with pagination
      const members = await Member.find()
        .select('-password')
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum);
      
      return res.status(200).json({
        success: true,
        data: members,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          pages: Math.ceil(total / limitNum)
        }
      });
    } catch (error) {
      console.error('Error fetching members:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  
  // Get members by profile status
  export const getMembersByProfileStatus = async (req, res) => {
    try {
      const { status } = req.params;
      
      // Validate status
      const validStatuses = ["inactive", "active", "pending", "blocked"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid profile status'
        });
      }
      
      const members = await Member.find({ profileStatus: status })
        .select('-password');
      
      return res.status(200).json({
        success: true,
        count: members.length,
        data: members
      });
    } catch (error) {
      console.error('Error fetching members by status:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  
  // Get members by batch
  export const getMembersByBatch = async (req, res) => {
    try {
      const { batch } = req.params;
      
      // Validate batch
      const validBatches = ["The Uniques 1.0", "The Uniques 2.0", "The Uniques 3.0"];
      if (!validBatches.includes(batch)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid batch'
        });
      }
      
      const members = await Member.find({ batch })
        .select('-password');
      
      return res.status(200).json({
        success: true,
        count: members.length,
        data: members
      });
    } catch (error) {
      console.error('Error fetching members by batch:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  
  // Get members with fine
  export const getMembersByFineStatus = async (req, res) => {
    try {
      // If fineStatus is a string that represents a number, we can query members with fines > 0
      const members = await Member.find({ 
        fineStatus: { $ne: "0" } 
      }).select('-password');
      
      return res.status(200).json({
        success: true,
        count: members.length,
        data: members
      });
    } catch (error) {
      console.error('Error fetching members with fines:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  
  // Get members with supplementary exams by semester
  export const getMembersBySupplementary = async (req, res) => {
    try {
      const { semester } = req.params;
      const semesterNum = parseInt(semester);
      
      // Validate semester
      if (isNaN(semesterNum) || semesterNum < 1 || semesterNum > 8) {
        return res.status(400).json({
          success: false,
          message: 'Invalid semester number. Must be between 1 and 8.'
        });
      }
      
      // Find members who have supplementary exams in the specified semester
      const members = await Member.find({
        'semesterSupplementary.semester': semesterNum
      }).select('-password');
      
      // For each member, only include the supplementary data for the requested semester
      const formattedMembers = members.map(member => {
        const memberObj = member.toObject();
        const supplementaryForSemester = member.semesterSupplementary.filter(
          sup => sup.semester === semesterNum
        );
        memberObj.semesterSupplementary = supplementaryForSemester;
        return memberObj;
      });
      
      return res.status(200).json({
        success: true,
        count: members.length,
        data: formattedMembers
      });
    } catch (error) {
      console.error('Error fetching members with supplementary exams:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  
  // Get members with pending supplementary exams
  export const getMembersWithPendingSupplementary = async (req, res) => {
    try {
      // Find members who have at least one supplementary exam with "pending" status
      const members = await Member.find({
        'semesterSupplementary.subjects.status': 'pending'
      }).select('-password');
      
      // For each member, filter to only include pending supplementaries
      const formattedMembers = members.map(member => {
        const memberObj = member.toObject();
        
        // Filter each semester to only include subjects with pending status
        memberObj.semesterSupplementary = member.semesterSupplementary.map(sem => {
          const semObj = sem.toObject();
          semObj.subjects = sem.subjects.filter(subj => subj.status === 'pending');
          return semObj;
        });
        
        // Remove any semesters that no longer have subjects after filtering
        memberObj.semesterSupplementary = memberObj.semesterSupplementary.filter(
          sem => sem.subjects.length > 0
        );
        
        return memberObj;
      });
      
      return res.status(200).json({
        success: true,
        count: members.length,
        data: formattedMembers
      });
    } catch (error) {
      console.error('Error fetching members with pending exams:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };