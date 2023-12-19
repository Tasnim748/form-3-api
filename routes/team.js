var express = require('express');
var router = express.Router();
var { Team } = require('../models/model');
var multer = require('multer');
var deleteFile = require('../utils/delFile');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000}, // Limit file size to 10MB
}).single('img');

router.get('/', async (req, res) => {
    const members = await Team.find();
    // console.log(members)
    return res.json(members);
});

router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(1);
            return res.json({message: 'An error occurred while uploading the file.'});
        } else {
            if (req.file == undefined) {
                console.log(2);
                return res.send({message: 'No file selected.'});
            } else {
                let data = req.body;
                const imgUrl = req.protocol + '://' + req.get('host') + `/images/${req.file.filename}`;
                data.picLink = imgUrl;
                let newTeam = new Team(data);
                const savedInst = await newTeam.save();
                return res.json({imgUrl: imgUrl, message: 'received', data: savedInst});
            }
        }
    });
})

router.delete('/', async (req, res) => {
    console.log(req.body._id);
    try {
        let toBeDeleted = await Team.findById(req.body._id);
        console.log(toBeDeleted);

        await Team.findByIdAndDelete(req.body._id);
        console.log('deleted');

        const url = toBeDeleted.picLink;
        const filename = url.substring(url.lastIndexOf('/') + 1);
        console.log(filename);
        deleteFile(filename, res, "images")
        return res.json({message: 'deletion received', status: 204});
    } catch(e) {
        console.log('some wrong')
        return res.status(500).send('deletion error!');
    }
})

router.put('/', async (req, res) => {
    let _id = req.body._id;
    console.log("before", req.body);
    let toBeUpdated = delete req.body._id;
    console.log("after", req.body);
    console.log(toBeUpdated);
    if (toBeUpdated) {
        await Team.findByIdAndUpdate(_id, req.body);
        let newThing = await Team.findById(_id);
        console.log(newThing);
        return res.json({message: 'update success', data: newThing});
    }
    return res.json({message: 'not found', status: 404});
})

module.exports = router;