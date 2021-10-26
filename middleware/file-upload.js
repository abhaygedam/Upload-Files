const path = require("path");
const multer = require("multer");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniquePrefix + "-" + file.originalname);
    }
});

const fileFilter = function(req, file, cb) {
  
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
console.log("testing");
module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});