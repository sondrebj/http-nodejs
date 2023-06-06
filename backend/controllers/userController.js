const userSchema = require("../schemas/userSchema.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req,res) => {
  try {
    const users = await userSchema.find();
    res.status(200).json(users)
  } catch(error) {
    res.status(500).json({message: error.message})
  }
}

const getOneUser = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    user.role = req.body.role;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userSchema.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
    console.log(`${user} has been deleted`)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const createUser = async (req, res) => {
   await User.findOne({email: req.body.email}).then((user) => {
        if(user) {
            return res.status(400).json({email: "already registered!"})
        } else {
            const newUser = new User ({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save();
            return res.status(200).json({msg: newUser})
        }
    });
};

// code for signing up
const signup = async (req, res) => {
  try {
    const existingUser = await userSchema.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).end("Email already registered");
    } else {
      // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new userSchema({
            email: req.body.email,
            password: hashedPassword, // Store the hashed password
            role: "maker"
      });
      await user.save();
      res.redirect("/login.html")
      //res.status(200).end("User created successfully!");
      console.log(user); // need to add a msg that informs the user that an account has been made!
      
    }
  } catch (err) {
    console.error(err);
    res.status(500).end("Oops! Something went wrong!");
  }
}

// code for loggin in
const login = async (req, res) => {
      try {
        const user = await userSchema.findOne({ email: req.body.email });
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          console.log(user);           //need to change httpOnly to true(httpOnly:true) and then import jwt and decode it on the client side. better security
          const token = jwt.sign({ email: user.email, role: user.role, loggedIn: true }, process.env.TOKEN_SECRET, { expiresIn: '1h' }); // add loggedIn property to the token
          res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // set a cookie with the token
          console.log('Cookie set:', token); // log the Set-Cookie header
          res.redirect("/index.html")
        } else {
          console.log('Invalid email or password');
          res.status(500).end('Invalid email or password');
        } 
      } catch (err) {
        console.error(err);
        res.status(500).end('Oops! Something went wrong!');
      }
    }

const logout = async (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true }); // clear the cookie with name 'token'
    res.status(200).json({ message: 'Logged out successfully' }); // send response with success message
    console.log("logout ja")
  } catch (err) {
    console.log("logout nei")
    console.error(err);
    res.status(500).end('Oops! Something went wrong!');
  }
};

const decodeCookie = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const email = decoded.email;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).send('User not found');
    }
    const role = user.role;
    res.json({ email, role });
  } catch (error) {
    res.json({ message: error.message });
  }
};





module.exports = {getAllUsers, getOneUser, createUser, signup, login, decodeCookie, logout, deleteUser}

