// middleware/verifyRole.js
const verifyRole = (role) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      if (req.user.role !== role) {
        return res.status(403).json({ error: "Unauthorized: Insufficient permissions" });
      }
      next();
    };
  };
  
  export default verifyRole;
  