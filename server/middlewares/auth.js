const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, user) => {

        if (error) {
          return handleError(res, 400, error.name);
        }

        req.user = user;
        next();

      });

    } else {
      next();
    }

  } else {
    next();
  }
}


module.exports = { checkToken }