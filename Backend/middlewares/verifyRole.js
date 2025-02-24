const verifyRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        next();
    };
};

export default verifyRole;