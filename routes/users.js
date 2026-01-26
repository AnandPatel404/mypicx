var express = require('express');
var router = express.Router();


router.get('/dashboard', function (req, res, next) {
  res.render('users/dashboard', { title: 'Dashboard' });
});

router.get('/events', function (req, res, next) {
  res.render('users/event/events', { title: 'Events' });
});

router.get('/add-event', function (req, res, next) {
  res.render('users/event/add-event', { title: 'Add Event' });
});

router.get('/setting', function (req, res, next) {
  res.render('users/event/setting', { title: 'Setting' });
});


router.get('/branding', function (req, res, next) {
  res.render('users/branding/branding', { title: 'Edit Event' });
});

router.get('/add-branding', function (req, res, next) {
  res.render('users/branding/add-branding', { title: 'Add Event' });
});

router.get('/edit-branding', function (req, res, next) {
  res.render('users/branding/edit-branding', { title: 'Edit Branding' });
});

router.get('/analytics', function (req, res, next) {
  res.render('users/analytics', { title: 'Analytics' });
});


router.get('/plan', function (req, res, next) {
  res.render('users/plan', { title: 'Plan' });
});

router.get('/addon', function (req, res, next) {
  res.render('users/addon', { title: 'Addon' });
});

router.get('/transactions', function (req, res, next) {
  res.render('users/transactions', { title: 'Transactions' });
});

router.get('/help', function (req, res, next) {
  res.render('users/help', { title: 'Help' });
});

router.get('/profile', function (req, res, next) {
  res.render('users/profile', { title: 'Profile' });
});

router.get('/security', function (req, res, next) {
  res.render('users/security', { title: 'Security' });
});

router.get('/activity', function (req, res, next) {
  res.render('users/activity', { title: 'Activity' });
});

router.get('/event-details', function (req, res, next) {
  res.render('users/event/event-details', { title: 'Event Details' });
});

router.get('/share', function (req, res, next) {
  res.render('users/event/share', { title: 'Event Details' });
});

router.get('/highlights', function (req, res, next) {
  res.render('users/event/highlights', { title: 'Event Details' });
});


router.get('/collection', function (req, res, next) {
  res.render('users/event/collection', { title: 'Event Details' });
});

router.get('/collection-details', function (req, res, next) {
  res.render('users/event/collection-details', { title: 'Event Details' });
});


router.get('/share-link', function (req, res, next) {
  res.render('share/index', { title: 'Share' });
});

router.get('/upload', function (req, res, next) {
  res.render('users/event/upload', { title: 'Share' });
});

module.exports = router;
