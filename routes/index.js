import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  return res.redirect('/auth/login');
});

export default router;
