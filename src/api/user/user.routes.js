const UserRoutes = require('express').Router();

const rateLimit =require('express-rate-limit');

//middleware será para los otros endpoint

const {
    // getAll,
    // getById,
    // create,
    // update,
    // deleteElement 
    register,
    login
} = require('./user.controller');


const userCreateRateLimit = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
});


// UserRoutes.get('/', getAll)
// UserRoutes.get('/:id', getById)


UserRoutes.post('/register', [userCreateRateLimit], register);
UserRoutes.post('/login', login );


// UserRoutes.patch('/:id', update)
// UserRoutes.delete('/:id', deleteElement)

module.exports = UserRoutes;