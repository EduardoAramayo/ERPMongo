const jwt = require('jsonwebtoken');
module.exports.protect = (req,res,next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      return next();
    } catch { return res.status(401).json({message:'Token inválido'}); }
  }
  res.status(401).json({message:'No autorizado'});
};