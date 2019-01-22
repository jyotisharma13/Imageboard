const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const s3 = require('./s3');
app.use(bodyParser.json());
app.use(express.static('./public'));
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
const config= require('./config');

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//////////////////////////////////////////////
//actually put the files in the uploadedfiles
//directory and changes name of the files
//to be some unique 24 charaqcter string
app.post('/upload',uploader.single('file'),s3.upload,(req, res)=>{
    console.log("req.body", req.body);
    //req.file is object that describes the file we just uploaded
    console.log(req.file);
    // next steps: save filename, title, description, name in the image table
    //make new imge render automatically on screen(without reloading the image)
    // res.render('images', ());
    db.addImage(
        config.s3Url + req.file.filename,
        req.body.title,
        req.body.name,
        req.body.description

    ).then(
        ({rows})=>{
            res.json({
                image:rows[0]
            });
        }
    );
});
/////////////////////////////////////////////////
//get method for getting the images
app.get('/images', (req, res) => {
    db.getImages().then(images => {
        console.log("images: ", images);
        res.json(images.rows);
    });
});
app.listen(8080, () => console.log(`I'm listening.`));
