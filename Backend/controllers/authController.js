const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, password ,email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword  , email});
        await newUser.save();
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Find the user in the database by username
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create JWT access token and refresh token
            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

            // Respond with the token, refresh token, and user details
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    email: user.email, // Include other necessary user details here
                },
                token,
                refreshToken,
            });
        } else {
            // Invalid credentials
            return res.status(400).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        // Internal server error
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
};
