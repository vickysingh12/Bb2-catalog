const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  let fulltoken = req.header('Authorization');
  
  let token = fulltoken.replace('Bearer ' , '');

  console.log('token is ' , token )
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
