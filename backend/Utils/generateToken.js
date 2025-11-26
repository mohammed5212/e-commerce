const jwt= require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createToken = (Id,role="user") => {
    return jwt.sign({ Id, role }, process.env.JWT_SECRET, {
        expiresIn: '5h',
    });
}
module.exports = createToken;
