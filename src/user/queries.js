
const registerNewUser = `INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4)`;


const getUserByEmail = `SELECT * FROM users WHERE email= $1`;
const getUserById = `SELECT * FROM users WHERE id= $1`;


const updateAccount =
    "UPDATE users SET firstname= $2, lastname= $3 WHERE id = $1 RETURNING *";

const deleteAccount = "DELETE FROM users WHERE id = $1";


module.exports = {
    registerNewUser,
    getUserByEmail,
    getUserById,
    updateAccount,
    deleteAccount,
};