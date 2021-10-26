const express = require("express");
const router = express.Router();
const upload = require("../middleware/file-upload");
const User = require("../models/user.model");
const Gallery = require("../models/gallery.model");
const fs = require("fs");

router.post("/single", upload.single("userImages"), async function (req, res) {
    
    try {
        const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profile_urls: req.file.path,
        });
        return res.status(201).send(user);
    } catch(err) {
        return res.status(500).send(err.message);
    }
});

router.post("/multiple", upload.any("galleryImages"), async function (req, res) {
    const filePaths = req.files.map((file) => file.path);

   try {
        const gallery = await Gallery.create({
        user_id: req.body.user_id,
        pictures: filePaths,
        });
        return res.status(201).send(gallery);
    } catch(err) {
        return res.status(500).send(err.message);
    }
});

router.put("/update", upload.single("userImages"), async function (req, res) {
   
    try {
        const user = await User.findById(req.body.user_id, {
        profile_urls: req.file.path,
        },
        {new: true}
        );
        return res.status(201).send(user);
    } catch(err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/delete", async function (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.body.user_id);
        const gallery = await Gallery.findByIdAndDelete(req.body.user_id);
        console.log(user.profile_urls);
        fs.unlinkSync(user.profile_urls[0]);
         return res.status(201).send(user);
    }
     catch(err) {
        return res.status(500).send(err.message);
    }
})

router.get("/all", async function (req, res) {
   
    try {
        const user = await User.find().lean().exec()
        return res.status(201).send(user);
    } catch(err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;