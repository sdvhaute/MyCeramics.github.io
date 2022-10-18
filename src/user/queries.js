
const registerNewUser = 'INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4)';

const getUserByEmail = `SELECT *, TO_CHAR(dob::date, 'yyyy/mm/dd') FROM users WHERE email= $1`;
const getUserById = `SELECT *, TO_CHAR(dob::date, 'yyyy-mm-dd') dob FROM users WHERE id= $1`;

const updateAccount =
    "UPDATE users SET firstname= $2, lastname= $3, dob = $4 WHERE id = $1";


module.exports = {
    registerNewUser,
    getUserByEmail,
    getUserById,
    updateAccount,
};