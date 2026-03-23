// Simple authentication middleware for admin
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
};