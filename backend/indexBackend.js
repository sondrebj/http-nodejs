const express = require("express")
const app = express()
const PORT = process.env.PORT || 3200
require("dotenv").config()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const cookieParser = require('cookie-parser')
const connectDB = require("./dbconnect/dbconnect")
connectDB()

// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.use(cookieParser());
app.use(express.static("public"));
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));



// we import our routers

    app.use('/tools', require('./routes/toolroutes'))

    // route for signup/login 
     app.use('/', require('./routes/userRoutes'))

    // route for the different booking parts
    app.use('/booking', require('./routes/bookingRoutes'))


// we set our server to listen to PORT
app.listen(PORT,() => {
    console.log(`Api fungere på ${PORT}`)
    console.log(process.env.MONGO_URI);
})







