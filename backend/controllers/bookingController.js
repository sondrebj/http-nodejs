const { stringify } = require("querystring");
const bookingSchema = require("../schemas/bookingSchema")
const userSchema = require("../schemas/userSchema")

const getBooking =  async (req, res) => {
    try {
      const getBooking = await bookingSchema.find();
      res.json(getBooking)
    } catch (err) {
      console.error(err);
      res.status(500).send('Error ');
    }
  }

const deleteBooking =  async (req, res) => {
    try {
      const getBooking = await bookingSchema.findByIdAndDelete(req.params.id);
      res.json(getBooking)
      console.log("bookings deleted")
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Error ');
      console.log("booking not deleted")
    }
  }

const uploadBooking = async (req, res) => {
    try {
      const existingUser = await userSchema.findOne({ email: req.body.email });
      if (!existingUser) {
        console.log("You have not entered a registered email adress");
        console.log(existingUser)
      } else {
    const startValiadation = await bookingSchema.findOne({startBookingDate: req.body.startBookingDate});
    const endValiadation = await bookingSchema.findOne({endBookingDate: req.body.endBookingDate})
    const d3 = req.body.startBookingDate;  
    const d4 = req.body.endBookingDate
    var day3 = new Date(d3);   
    var day4 = new Date(d4);
    console.log(d3 + " " + d4);    
    const diff = (day4.getTime() - day3.getTime()) / (1000*60*60*24)     
    console.log(diff + "days between");
    

    if (diff > 5) {
      console.log("You can only book a tool for maximimum 5 days")
      res.status(409).end("You can only book a tool for maximimum 5 days");
    }
    if (diff < 0) {
      console.log("You cannot book a negative number of days!")
      res.status(409).end("You cannot book a negative number of days!");
    }
    if (startValiadation) {
      res.status(409).end("start already booked");
      console.log("start alrdy booked")
    }
     else if (endValiadation) {
      res.status(409).end("end already booked");
      console.log("end alrdy booked")
    }
     else if (diff <= 5 && diff >= 0 && existingUser) {
      console.log("booking made")
      const Booking = new bookingSchema({
        email: req.body.email,
        startBookingDate: req.body.startBookingDate,
        endBookingDate: req.body.endBookingDate,
        toolName: req.body.toolName,
        toolID: req.body.toolID
      });
      await Booking.save();
      res.status(200).end("Success!")
      console.log(Booking);
     
     
    }
  }
    }
   catch (err) {
    res.status(500).end("error");
   }
  }

module.exports = {getBooking, deleteBooking ,uploadBooking}