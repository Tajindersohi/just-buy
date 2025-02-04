const multer = require("multer");
const path = require("path");

// Ensure uploads are stored in the correct directory
console.log(path);
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"), // Save in "uploads" folder inside the server directory
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage });

module.exports = { upload };
