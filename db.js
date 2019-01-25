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
        `SELECT * FROM images ORDER BY id DESC
LIMIT 6;`
    );
};
///////////////////////////////// add image///////////
module.exports.addImage = function(url, title, username, description) {
    return db.query(
        `INSERT INTO images (url, title, username, description) VALUES ( $1, $2, $3, $4) RETURNING *`,
        [url, title, username, description]
    );
};
///////////////////////////////////////
module.exports.getMoreImages = function(lastId) {
    return db.query(
        `SELECT * FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 6`,
        [lastId]
    )
        .then(({ rows }) => rows);
};
/////////////////////////////////////
module.exports.currentimageData = function(id) {
    return db.query(
        `SELECT * FROM images
    WHERE id = $1`,
        [id]
    );
};
module.exports.addComment = function(username, comment, image_id) {
    return db.query(
        `INSERT INTO comments (username, comment, image_id)
VALUES ($1, $2, $3) RETURNING *`,
        [username, comment, image_id]
    );
};
module.exports.currentimageComments = function(image_id) {
    return db.query(
        `SELECT username, comment FROM comments
    WHERE image_id = $1`,
        [image_id]
    );
};
module.exports.getLowest = function() {
    return db.query(
        `SELECT id FROM images
    ORDER BY id ASC
    LIMIT 1`
    );
};
/////////////////////////////////////get comment
// module.exports.getComment = function(image_id){
//     return db.query(`SELECT * FROM comments WHERE image_id = $1`,
//         [image_id]);
// };
//////////// add comment//////////////////////
// module.exports.addComment = function(name, comment, image_id){
//     return db.query(`INSERT INTO (username,comment,image_id) values ($1, $2,$3) returning *`,
//         [name, comment, image_id]
//     );
// };
