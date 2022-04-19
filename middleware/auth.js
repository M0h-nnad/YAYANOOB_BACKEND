const jwt = require("jsonwebtoken");

const verfiyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'];
  if (!token) return res.status(401).send({ message: "Please Login First" });
  try {
    const decoded = await jwt.verify(token.split(' ')[1], 'YAYANOOOOOOOOOOOBOADJS%%%%madeb&*&*&(*&%^#$%^#45ysfandsa!@@_$(!#JAHSASADMXAASKJ');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  return next();
};

module.exports = verfiyToken;
