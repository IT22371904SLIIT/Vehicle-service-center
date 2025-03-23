const jwt = require('jsonwebtoken');

const extractToken = (req) => {
    // Check if Authorization header exists and starts with 'Bearer'
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];  // Extract token after 'Bearer '
    }
    return null;  // Return null if no token is found
};


const verifyToken = (token) => {
    if (token.startsWith('Bearer ')) {
        return token.split(' ')[1];
    }
    return token;
};

const handleUnauthorized = (res, message) => {
    return res.status(403).json({ success: false, message });
};

exports.identifierUser = (req, res, next) => {
    const token = extractToken(req); // Token is already extracted
    if (!token) {
        return res.status(403).json({ success: false, message: "Unauthorized - No token provided" });
    }

    try {
        // Verify the token using your secret key
        const jwtVerified = jwt.verify(token, process.env.JWT_SECRET);
        req.User = jwtVerified; // Store the decoded user info
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ success: false, message: "Unauthorized - Invalid or expired token" });
    }
};


exports.identifierAdmin = (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return handleUnauthorized(res, "Unauthorized - No token provided");
    }

    try {
        const userToken = verifyToken(token);
        const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);

        if (!jwtVerified) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        if (jwtVerified.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied. Admins only." });
        }

        req.user = jwtVerified;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ success: false, message: "Unauthorized - Invalid or expired token" });
    }
};