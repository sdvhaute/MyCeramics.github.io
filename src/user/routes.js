const { Router } = require('express');
const controller = require('./controller');
const { checkNotAuthenticated, isLoggedIn } = require('../../middleware');
const { checkAuthenticated } = require('../../middleware');

const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


const router = Router();


router.get('/account', isLoggedIn, controller.getAccount);
router.put('/account', isLoggedIn, controller.updateAccount);

router.delete('/account', isLoggedIn, controller.deleteAccount);

// REGISTER ROUTES

router.get('/register', checkNotAuthenticated, controller.getRegisterForm);

router.post('/register', checkNotAuthenticated, controller.postRegisterNewUser);

// LOGIN ROUTES
router.get('/login', checkNotAuthenticated, controller.getLoginForm);

router.post('/login', checkNotAuthenticated,
    passport.authenticate('local', {
        successRedirect: '/api/v1/projects',
        failureRedirect: '/api/v1/login',
        failureFlash: true
    }))


// LOGOUT 
router.post('/logout', controller.postLogoutUser);


module.exports = router;