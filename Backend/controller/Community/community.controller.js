import CommunityAdmin from "../../models/community/communityAdmin.js";
import bcrypt from "bcrypt";

export const createCommunityAdmin = async (req, res) => {
	  const {  email, password } = req.body;
  try {
	const admin = await CommunityAdmin.findOne
	({ email });
	if (admin) {
	  return res.status(400).json({ message: "Community Admin already exists" });
	}
	// Hash the password
	const hashedPassword = await bcrypt.hash(password, 12);
	const newAdmin = new CommunityAdmin({
	  email,
	  password:hashedPassword,
	});
	await newAdmin.save();
	res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
	res.status(500).json({ message: "Something went wrong" });
  }
}