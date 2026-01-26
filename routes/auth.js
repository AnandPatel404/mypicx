import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
  res.render('auth/register', { title: 'Register' });
});

router.get('/forgot-password', function(req, res, next) {
  res.render('auth/forgot-password', { title: 'Forgot Password' });
});

export default router;

