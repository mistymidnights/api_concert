const User = require('./user.model');
const bcrypt = require ('bcrypt')
const { setError, createToken } = require('../../helpers/utils');
const { createConnection } = require('mongoose');



const register = async (req, res, next)=>{
    try {
        const newUser =  new User(req.body);
        const userExits = await User.findOne({email: newUser.email});
        if (userExits) return next(setError(409, 'This email already exist'))
        const userInDb =await newUser.save();
        res.status (201).json(userInDb);

    } catch (error) {
        return next(setError(500, error.message || 'Failed create user'));
    }
}


const login = async (req, res, next )=> {

    try {
        const userInDb = await User.findOne({email: req.body.email});
        if (!userInDb) return next(setError(404, 'User no found '));

        if(bcrypt.compareSync(req.body.password, userInDb.password)){
            const token = createToken(userInDb._id, userInDb.email);
            return res.status(200).json({userInDb, token})
        }else {
            return next(setError(401, ' invalid password '));


        }

    } catch (error) {
        return next(setError(500, error.message || 'Unexpected error login'));
    }


}

module.exports ={
    register, 
    login
};


// const getAll = async (req, res, next) => {
//     try {
//         const elements = await Element.find();
//         return res.json({
//             status: 200,
//             message: 'Recovered all elements',
//             data: { elements: elements }
//         });
//     } catch (error) {
//         return next(setError(500, 'Failed all codes'));
//     }
// }

// const getById = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const element = await Element.findById(id);
//         if (!element) return next(setError(404, 'Element not found'))
//         return res.json({
//             status: 200,
//             message: 'Recovered all elements',
//             data: { element: element }
//         });
//     } catch (error) {
//         return next(setError(500, 'Failed element'))
//     }
// }

// const update = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const element = new Element(req.body);
//         element._id = id;
//         const updatedElement = await Element.findByIdAndUpdate(id, element)
//         if (!updatedElement) return next(setError(404, 'Code not found'))
//         return res.json({
//             status: 201,
//             message: 'Updated element',
//             data: { element: updatedElement }
//         });
//     } catch (error) {
//         return next(setError(500, 'Failed updated element'));
//     }
// }

// const deleteElement = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const deletedElement = await Element.findByIdAndDelete(id)
//         if (!deletedElement) return next(setError(404, 'Element not found'))
//         return res.json({
//             status: 200,
//             message: 'deleted element',
//             data: { element: deletedElement }
//         });
//     } catch (error) {
//         return next(setError(500, 'Failed deleted element'));
//     }
// }

// module.exports = {
//     getAll,
//     getById,
//     create,
//     update,
//     deleteElement
// }


