const toolSchema = require("../schemas/toolsSchema")
const ElectricTool = require('../schemas/electricTools')
const NormalTool = require('../schemas/normalTools')
const mime = require("mime");
const path = require("path");
const fs = require("fs");


// Get (read)
//Function to read info from database

// Retrieve electric tools from the 'electricTools' collection
const getTools = async (req, res) => {
    try {
      const allTools = await toolSchema.find();
      res.json(allTools)
     //res.render('electricTools', { tools: electricTools });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving electric tools');
    }
  }
  
  const getNormalTools = async (req, res) => {
    try {
      const normalTools = await NormalTool.find();
      res.json(normalTools)
      //res.render('normalTools', { tools: normalTools });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving normal tools');
    }
  }

  const getOneElectricTool = async (req, res) => {
    try {
      const toolId = req.params.id;
      const updatedTool = await toolSchema.findByIdAndUpdate(
        toolId,
        { functional: 'broken' },
        { new: true } // return the updated tool instead of the old one
      );
      res.json(updatedTool);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }

  const markToolAsWorking = async (req, res) => {
    try {
      const toolId = req.params.id;
      const updatedTool = await toolSchema.findByIdAndUpdate(
        toolId,
        { functional: 'working' },
        { new: true } // return the updated tool instead of the old one
      );
      res.json(updatedTool);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
  
  const getOneNormalTool = async (req, res) => {
    try{
      const name = req.params.name;
      const tool = await toolSchema.findOne({ name: name });
      res.json(tool);
    } catch (err) {
      console.error(err);
      res.status(404).send('Item not found');
    }
  }


  const configTool = async (req,res)=>{ // Function that updates the information about a player
    try{
        const uptool = await toolSchema.findOneAndUpdate( // finds and selects a player based on the username written in the query
            {name: req.params.name},  
            {$set:{  // updates properties using set operator of mongoDB
                name:req.body.name,  // values take from request body
                description:req.body.description, 
                quantity: req.body.quantity, 
                image: req.body.image,
                
            }})
        res.json(uptool) // displays the updated information
    }catch(error){ // catches error and displays it
        res.status(400).json({message:error})
    }
}

// POST method (create)
// this function adds data in my DB
const createTool = async (req, res) => {
    try {
        const { name, image } = req.body;
        const user = new toolSchema({ name, image });

        await user.save();
        res.json({ message: 'success', data: user });
        console.log(`A new tool has been created, `, req.body ) // outputs the content of the user to the console

    } catch (err) {
        res.status(500).json({ message: 'error', error: err });
    }
};


const deleteTool = async (req, res) => {
  try {
    const toolId = req.params.id;

    // Find the tool by id and remove it
    const deletedTool = await toolSchema.findByIdAndRemove(toolId);

    if (!deletedTool) {
      return res.status(404).json({ message: 'error', error: 'Tool not found' });
    }

    res.json({ message: 'success', data: deletedTool });
    console.log(`Tool with id ${toolId} has been deleted`);

  } catch (err) {
    res.status(500).json({ message: 'error', error: err });
  }
};


// uploading a tool + multer setup on toolsroutes.js

const uploadDir = path.join("assets", "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const uploadTool = async (req, res) => {
  const tempPath = req.file.path;
  const date = Date.now();
  const targetFileName = `${date}-${req.file.originalname}`;
  const targetPath = path.join(uploadDir, targetFileName).replace(/\\/g, "/");

  try {
    await fs.promises.rename(tempPath, targetPath);
    const tool = new toolSchema({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      electric: req.body.electric,
      image: targetPath,
      functional: "working"
    });
    await tool.save();
    res.status(200).end("File uploaded!");
  } catch (err) {
    console.error(err);
    res.status(500).end("Oops! Something went wrong!");
  }
}




module.exports = {createTool, getTools, getNormalTools, getOneElectricTool, getOneNormalTool, uploadTool, deleteTool, configTool, markToolAsWorking }

