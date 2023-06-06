const express = require("express")
const router = express.Router()
const cors = require('cors');
const multer = require('multer')

const {createTool, getNormalTools, getTools, getOneNormalTool, getOneElectricTool, uploadTool, configTool, deleteTool, markToolAsWorking } = require("../controllers/toolsController")


const {createUser} = require("../controllers/userController")

const upload = multer({
    dest: "/DBpictures",
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .png, .jpeg and .jpg files are allowed!"), false);
      }
    },
  });


router.get("/tools", cors(), getTools)

router.get("/electric", cors(), getTools)
router.get("/get/electric/:id", cors(), getOneElectricTool)
router.get("/electric/:name", cors(), getOneNormalTool)
// Route for retrieving normal tools
router.get("/normal", cors(), getNormalTools)
router.get("/normal/:name", cors(), getOneNormalTool)

// this creates a new tool
router.post("/create/tool", createTool)
// router.post("/create/user", createUser)

// route that updates the tool from "working" to "broken"
router.put("/electric/:id", getOneElectricTool)

//
router.put('/working/:id', markToolAsWorking )

router.put("/configure/:name", cors(), configTool)


router.delete('/delete/:id', deleteTool)

router.post('/upload', upload.single("file"), uploadTool)


module.exports = router
 