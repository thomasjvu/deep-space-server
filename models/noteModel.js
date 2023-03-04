const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "Please add a text value"],
        },
        privacy: {
            type: String,
            default: "public"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Note", noteSchema);
