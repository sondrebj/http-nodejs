const express = require("express")
const router = express.Router()
const {getBooking, deleteBooking,uploadBooking} = require('../controllers/bookingController')

router.get('/getBooking', getBooking)

router.delete('/delete/:id', deleteBooking)

router.post('/uploadBooking', uploadBooking)


module.exports = router

