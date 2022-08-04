const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
        },
        status: {
            type: Boolean, default: true
        },
        images: [{
            type: String,
        }],
        type: {
            type: mongoose.Schema.Types.String,
            ref: 'Categories'
        },
        uploadedWith: {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
            name: { type: String }
        },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
    },
    { timestamp: true }
);

productSchema.pre("save", async function () {
    const product = this;
    if (product.isModified()) product.updatedAt = Date.now();
});

const Product = mongoose.model("Products", productSchema, "Products");
module.exports = Product;
