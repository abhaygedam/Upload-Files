const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    pictures: [{type:String, required: true}]
},
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("gallery", gallerySchema);

