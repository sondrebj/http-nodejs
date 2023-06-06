const express = require('express');
const router = express.Router();
//const {check} = require('express-validator')
const {getAllUsers, getOneUser,signup, login, decodeCookie, logout, deleteUser} = require('../controllers/userController')
//const { auth } = require('../controllers/verifyToken') // add this later on

// used to get all the user in the admin page
router.get('/all', getAllUsers)

// used to update the role from maker to admin or vice versa on the admin page
router.put('/all/:id', getOneUser)

router.post('/register', signup)

router.post('/login', login)

router.get('/decode', decodeCookie)

router.get('/logout', logout)

router.delete('/delete/:id', deleteUser)

module.exports = router





