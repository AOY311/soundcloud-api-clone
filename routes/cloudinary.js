var express = require("express");
const cloudinary = require("cloudinary");
var router = express.Router();
cloudinary.v2.config({
  cloud_name: "dgjumivar",
  api_key: "317924575144616",
  api_secret: "k6NEKqHjZFgT9lQ9T3FORWWdlWU",
  secure: false,
});

/* GET home page. */
router.post("/upload", async function (req, res, next) {
 return await cloudinary.v2.uploader
    .upload(
      "https://upload.wikimedia.org/wikipedia/commons/0/01/Charvet_shirt.jpg",
      {
        public_id: "wiki_shirt",
      }
    )
    .then((result) => result);
});
module.exports = router;
