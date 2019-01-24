const spicedPg = require('spiced-pg');
var db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // var secrets = require('./secrets.json');
    const {dbUser, dbPass} = require('./secrets');
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/imageboard`);
}
/////////get images//////////////////////
module.exports.getImages = function() {
    return db.query(
        `SELECT * FROM images`
    );
};
///////////////////////////////// add image///////////
module.exports.addImage = function(url, title, username, description) {
    return db.query(
        `INSERT INTO images (url, title, username, description) VALUES ( $1, $2, $3, $4) RETURNING *`,
        [url, title, username, description]
    );
};
/////////////////////////////////////get comment
module.exports.getComment = function(){
    return db.query(`SELECT * FROM comments`);
};
//////////// add comment//////////////////////
module.exports.addComment = function(comment, username){
    return db.query(`INSERT INTO (comment, username) values ($1, $2) returning *`,
        [comment, username]
    );
};
