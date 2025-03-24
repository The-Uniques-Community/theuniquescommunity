import Member from "../../models/member/memberModel.js";
import mongoose from "mongoose";
// Search for members by various criteria
export const searchMembers = async (req, res) => {
  try {
    const { query, batch, limit = 10 } = req.query;
    
    // Build search criteria
    let searchCriteria = {};
    
    if (query) {
      // Check if query is an admission number (exact match)
      if (/^[0-9]{4}(BTCS|BTCSD)[0-9]{3}$/.test(query)) {
        searchCriteria.admno = query;
      } else {
        // Search by name or email (partial match)
        searchCriteria.$or = [
          { fullName: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ];
      }
    }
    
    // Filter by batch if provided
    if (batch) {
      searchCriteria.batch = batch;
    }
    
    // Execute search
    const members = await Member.find(searchCriteria)
      .select("fullName admno email batch profilePic fineStatus")
      .limit(parseInt(limit));
    
    // Return search results
    return res.status(200).json({
      success: true,
      message: "Members retrieved successfully",
      data: members
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error searching members: " + error.message
    });
  }
};

// Impose a fine on a member
// Impose a fine on a member
export const imposeFine = async (req, res) => {
  try {
    const { memberId } = req.params; // FIXED: Changed from 'id' to 'memberId' to match route parameter
    const { amount, reason } = req.body;
    
    // Validate parameters
    if (!mongoose.Types.ObjectId.isValid(memberId)) { // FIXED: Updated reference
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }
    
    if (!reason || reason.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Reason is required'
      });
    }
    
    // Find the member
    const member = await Member.findById(memberId); // FIXED: Updated reference
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }
    
    // Convert current fine to number (handling string values)
    const currentFine = parseInt(member.fineStatus) || 0;
    
    // Add the new fine amount
    const newFineTotal = currentFine + parseInt(amount);
    
    // Update the member's fine status
    member.fineStatus = newFineTotal.toString();
    
    // Add the fine to fine history if available
    if (Array.isArray(member.fineHistory)) {
      member.fineHistory.push({
        amount: parseInt(amount),
        reason,
        date: new Date(),
        status: 'pending' // Assuming new fines start as pending
      });
    }
    
    // Save the updated member
    await member.save();
    
    return res.status(200).json({
      success: true,
      message: `Fine of ₹${amount} imposed successfully`,
      data: {
        memberId: member._id,
        memberName: member.fullName,
        newFineTotal: member.fineStatus
      }
    });
  } catch (error) {
    console.error('Error imposing fine:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Clear fine for a member
export const clearFine = async (req, res) => {
  try {
    const { memberId } = req.params;
    
    // Validate inputs
    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required"
      });
    }
    
    // Find the member
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }
    
    // Store the previous fine amount for reference
    const previousFine = member.fineStatus;
    
    // Clear the fine
    member.fineStatus = "0";
    await member.save();
    
    return res.status(200).json({
      success: true,
      message: "Fine cleared successfully",
      data: {
        memberId: member._id,
        memberName: member.fullName,
        previousFine,
        currentFine: "0"
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error clearing fine: " + error.message
    });
  }
};

// Get fine history (optional - for tracking purposes)
export const getFineHistory = async (req, res) => {
  try {
    const { memberId } = req.params;
    
    // Find the member
    const member = await Member.findById(memberId)
      .select("fullName admno email batch fineStatus");
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Fine information retrieved successfully",
      data: {
        member: {
          id: member._id,
          name: member.fullName,
          admno: member.admno,
          email: member.email,
          batch: member.batch
        },
        currentFine: member.fineStatus
        // You could add transaction history here if you implement it
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving fine history: " + error.message
    });
  }
};