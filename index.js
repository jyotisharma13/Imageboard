const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('./public'));
//get method for getting the images
app.get('/images', (req, res) => {
    db.getImages().then(images => {
        console.log("images: ", images);
        res.json(images.rows);
    });
});
app.listen(8080, () => console.log(`I'm listening.`));
