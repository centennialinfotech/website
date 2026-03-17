const Admin = require('../model/Admin');

// Hardcoded default admin (will be saved to DB on first run)
const DEFAULT_ADMIN = {
  email: 'admin@gmail.com',
  password: 'admin123'
};

// Initialize default admin if not exists
const initDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: DEFAULT_ADMIN.email });
    if (!existingAdmin) {
      const admin = new Admin(DEFAULT_ADMIN);
      await admin.save();
      console.log('✅ Default admin created:', DEFAULT_ADMIN.email);
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

// Call this when server starts
initDefaultAdmin();

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', email);

    // Find admin by email
    const admin = await Admin.findOne({ email });

    // Check if admin exists and password matches
    if (!admin || admin.password !== password) {
      console.log('❌ Login failed: Invalid credentials');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('✅ Login successful:', email);
    res.json({
      success: true,
      message: 'Login successful',
      admin: {
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all admins (for management)
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, { password: 0 }); // Don't send passwords
    res.json({
      success: true,
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new admin (for adding more admins later)
exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    const admin = await Admin.create({ email, password });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};