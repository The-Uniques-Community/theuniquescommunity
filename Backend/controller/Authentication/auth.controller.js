// controllers/auth.controller.js
import jwt from "jsonwebtoken";
import passport from "passport";
import Member from "../../models/member/memberModel.js";

const generateToken = (member) => {
  const payload = {
    id: member._id,
    role: member.role,
    batch: member.batch || null,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// controllers/auth.controller.js
export const googleCallback = (req, res, next) => {
  if (!req.user) {
    return res.status(400).send("Authentication failed. Please try again.");
  }

  // Generate token for the authenticated user
  const token = generateToken(req.user);
  // Extract the user role from req.user
  const userRole = req.user.role;

  // Set an HTTP‑only cookie for the token on the backend domain.
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set to true in production
    sameSite: "lax", // adjust as needed
    // domain: '.example.com',  // if you want to share across subdomains
  });

  // Return HTML that sends the role (if needed for client-side routing) and closes the popup.
  const htmlResponse = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Login Successful</title>
      </head>
      <body>
        <script>
          (function() {
            // Send only the role since the token is stored in the cookie
            window.opener.postMessage({ role: '${userRole}' }, '*');
            window.close();
          })();
        </script>
        <p>Login successful! You can close this window.</p>
      </body>
    </html>
  `;
  return res.send(htmlResponse);
};

export const emailLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const member = await Member.findOne({ email });
    if (!member) {
      return res
        .status(401)
        .json({ message: "Not a member, please contact tech team." });
    }
    const isMatch = await member.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = generateToken(member);
    // Set the HTTP‑only cookie with similar options to the Google callback
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set to true in production
      sameSite: "lax", // adjust as needed
      // domain: '.example.com',  // uncomment if you need to share across subdomains
    });
    return res.json({ message: "Logged in successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


export const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json(req.user);
};


// controllers/auth.controller.js
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set true in production
    sameSite: "lax", // Adjust as needed
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
