
const registerNewUser = 'INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4)';

// const getUserByEmail = `SELECT *, to_char(dob::date, 'yyyy/mm/dd') dob FROM users WHERE email= $1`;
// const getUserById = `SELECT *, to_char(dob::date, 'yyyy/mm/dd') dob FROM users WHERE id= $1`;

const getUserByEmail = `SELECT *, experimental_strftime(dob::date, '%Y-%m-%d') dob FROM users WHERE email= $1`;
const getUserById = `SELECT *, experimental_strftime(dob::date, '%Y-%m-%d') dob FROM users WHERE id= $1`;

// experimental_strftime(created_at, '%Y-%m-%d') to_char does not work in cockroachdb

const updateAccount =
    "UPDATE users SET firstname= $2, lastname= $3, dob = $4 WHERE id = $1";


module.exports = {
    registerNewUser,
    getUserByEmail,
    getUserById,
    updateAccount,
};