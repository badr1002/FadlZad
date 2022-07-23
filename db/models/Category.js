const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },                
    },
    { timestamp: true }
);

 
const Category = mongoose.model("Categories", categorySchema,"Categories");
module.exports = Category;
