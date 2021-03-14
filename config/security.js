//done
const rateLimit = require('express-rate-limit');
 
const csrf = require('csurf');
const helmet = require('helmet');

module.exports = (app) => {
    app.enable('trust proxy');
  
    // helmet with customizations
    app.use(helmet({
      cacheControl: false,
      frameguard: false,
    }));
  
    // rate limit /api/ routes
    app.use('/api/', rateLimit({
      windowMs: 60 * 1000, // 1 minute
      delayMs: 0,
      max: 10,
    }));
  
    // csrf
    const csrfProtection = csrf({
      cookie: true,
    });
  
    app.get('/*', csrfProtection, (req, res, next) => {
      res.locals = {
        ct: req.csrfToken(),
      };
      next();
    });
  };