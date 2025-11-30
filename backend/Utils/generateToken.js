const jwt= require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createToken = (id,role="user") => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '5h',
    });
}
module.exports = createToken;
