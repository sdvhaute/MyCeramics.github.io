const { pool } = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');
const { render } = require('ejs');

const getRegisterForm = (req, res) => {
    res.render('users/register.ejs');
};

const getLoginForm = (req, res) => {
    res.render('users/login.ejs');
};

const getUserByEmail = (req, res) => {
    console.log('controller get UserByEmail')

    pool.query(queries.getUserByEmail, [req], (err, results) => {
        if (err) throw err;
        // res.status(200).json(results.rows);
        console.log(results.rows + 'getUserByEmail')
        const user = results.rows;
        return results.rows;;
    })

};
const getUserById = (req, res) => {
    console.log('controller get UserById')

    pool.query(queries.getUserById, [req], (err, results) => {
        if (err) throw err;
        // res.status(200).json(results.rows);
        console.log(results.rows + 'getUserById')
        const user = results.rows;
        return results.rows;;
    })

};
const getAccount = (req, res) => {

    const user_id = (req.user.id);

    pool.query(queries.getUserById, [user_id], (err, results) => {
        if (err) throw err;

        const userObject = results.rows;
        res.render('users/account.ejs', { userObject });

    })

};
const updateAccount = (req, res) => {

    const user_id = (req.user.id);
    const { firstname, lastname, dob } = req.body;

    pool.query(queries.updateAccount, [user_id, firstname, lastname, dob || null], (err, results) => {
        if (err) throw err;

        const userObject = results.rows;
        console.log(userObject)

        req.flash('success', 'Your account has succesfully been updated!');
        res.redirect(`/api/v1/account`);

    })

};


const postRegisterNewUser = async (req, res) => {


    try {
        const { firstname, lastname } = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        await pool.query(queries.registerNewUser, [req.body.email, hashedPassword, firstname, lastname]);

        req.flash('success', 'You have succesfully registered!');
        res.redirect('/api/v1/login');
    } catch {
        res.redirect('/api/v1/register')
    }
};

const postLogoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        
        req.flash('success', 'You have succesfully logged out!');
        res.redirect('/');
    });
}



module.exports = {
    getRegisterForm,
    getLoginForm,
    getUserByEmail,
    getUserById,
    getAccount,
    updateAccount,
    postRegisterNewUser,
    postLogoutUser,
};