const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const jwtToken = req.header('Authorization')
  if (!jwtToken) return res.status(401).send('Access Denied, Token is required.')
  try {
    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT_EX_AUTH)
    req.user = payload
    next()
  } catch (err) {
    res.status(400).send('Access Denied, Invalid Token.')
  }
}

module.exports = auth