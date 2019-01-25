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
///////////////////////////////////////7
app.get('/', (req, res) => {
    res.redirect('/images');
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
        }) .catch(err => {
        console.log('err in post upload:', err);
    });
});
/////////////////////////////////////////////////
//get method for getting the images
app.get('/images', (req, res) => {
    db.getImages().then(images => {
        console.log("images: ", images);
        res.json(images.rows);
    }) .catch(err => {
        console.log('Error in get images:', err);
    });
});
////////////////////////////get comments on images////////////////////////
app.get('/image/:id/comments', (req, res) => {
    if (req.params.id) {
        db.getImageComments(req.params.id).then((images) => {
            res.json(images.rows);
        }).catch(() => {
            res.sendStatus(500);
        });
    }

});
///////////////////////post comment on images//////////////////////
app.post('/comment/:id/add', (req, res) => {
    db.addComment(req.body.name, req.body.text, req.params.id).then((images) => {
        res.json(images.rows);
    });
});
/////////////////////////////////////////////
app.get("/moreImages/:id", (req, res) => {
    Promise.all([db.getMoreImages(req.params.id), db.getLowest()]).then(data => {
        console.log("data!!!!!!!!!!!!!!!!!!!!!!", data);
        res.json(data);
    });
});
///////////////////////////////////////////
app.get("/currentimageData/:id", (req, res) => {
    Promise.all([
        db.currentimageData(req.params.id),
        db.currentimageComments(req.params.id)
    ]).then(function(data) {
        res.json(data);
        console.log("DATA0!!!!", data[0].rows);
        console.log("DATA1!!!!", data[1].rows);
    });
});
/////////////////////////////////////////////77
app.post("/postComment", (req, res) => {
    console.log("req.body", req.body);
    console.log(res.body);
    db.addComment(req.body.x, req.body.y, req.body.z);
});
app.listen(8080, () => console.log(`I'm listening.`));
