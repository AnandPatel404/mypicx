var express = require('express');
var router = express.Router();


router.get('/dashboard', function (req, res, next) {
    res.render('admin/dashboard', { title: 'Dashboard' });
});

router.get('/user-list', function (req, res, next) {
    res.render('admin/user-list', { title: 'User List' });
});

router.get('/transactions', function (req, res, next) {
    res.render('admin/transactions', { title: 'Transactions' });
});

router.get('/plan', function (req, res, next) {
    res.render('admin/plans', { title: 'Plans' });
});

router.get('/addon', function (req, res, next) {
    res.render('admin/addon', { title: 'Addon' });
});

router.get('/help', function (req, res, next) {
    res.render('admin/help', { title: 'help & support' });
});
module.exports = router;
