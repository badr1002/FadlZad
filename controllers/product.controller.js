const productModel = require('../db/models/products');
const fs = require('fs')
const path = require('path')
const productImages = path.join(
    __dirname,
    "../client/src/assets/uploads/products"
);


class Product {

    static getAllProducts = async (req, res) => {
        try {

            if (req.query.limit) {
                var products = await productModel.find({ status: true }).limit(req.query.limit)
                if (!products) throw new Error("#1.2.0")
            } else if (req.query.admin) {
                var products = await productModel.find()
                if (!products) throw new Error("#1.2.0")
            }
            else {
                var products = await productModel.find({ status: true })
                if (!products) throw new Error("#1.2.0")
            }
            res.status(200).send({
                apiStatus: true,
                msg: "All products fetched",
                data: products
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "can't get all products!",
                data: e.message.toString()[0] == "#"? e.message : "#1.1.0"
            });
        }
    }
    static getAllProductsForAdmin = async (req, res) => {
        try {
            var products = await productModel.find()
            if (!products) throw new Error("#1.2.0")
            res.status(200).send({
                apiStatus: true,
                msg: "All products fetched",
                data: products
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "can't get all products!",
                data: e.message.toString()[0] == "#"? e.message : "#1.1.0"
            });
        }
    }
    static getProductById = async (req, res) => {
        try {
            const product = await productModel.findOne({ _id: req.params.id })
            if (!product) throw new Error("#1.2.1")
            res.status(200).send({
                apiStatus: true,
                msg: "product fetched",
                data: product
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "can't get product!",
                data: e.message.toString()[0] == "#"? e.message : "#1.1.0"
            });
        }
    }
    static getAllProductByUserId = async (req, res) => {
        try {
            let user = {
                userId: req.user._id,
                name: req.user.name
            }
            const products = await productModel.find({ uploadedWith: user })
            if (!products) throw new Error("#1.2.1")
            res.status(200).send({
                apiStatus: true,
                msg: "products fetched",
                data: products
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "Can't get products by user id!",
                data: e.message.toString()[0] == "#"? e.message : "#1.1.0"
            });
        }
    }
    static searchProductByName = async (req, res) => {
        try {

            const products = await productModel.find({ name: { $regex: new RegExp(".*" + req.params.search_term + ".*", "i") }, status: true })
            //  const products = await productModel.find({ name: { $regex: new RegExp("^" + req.params.search_term + "$", "i") } })
            if (!products) throw new Error("#1.2.1")
            res.status(200).send({
                apiStatus: true,
                msg: "products fetched",
                data: products
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "Can't get products by user id!",
                data: e.message.toString()[0] == "#"? e.message : "#1.1.0"
            });
        }
    }

    static addProduct = async (req, res) => {
        try {
            let data = req.body
            delete data.category
            data.type = data.categoryName
            data.uploadedWith = {
                userId: req.user._id,
                name: req.user.name
            }
            delete data.categoryName
            const product = await new productModel(data)
            await product.save()
            res.status(200).send({
                apiStatus: true,
                msg: "New product added successfully",
                data: product
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "addation product faild!",
                data: e.message.toString()[0] == "#"? e.message : "#1.1.0"
            });
        }
    }
    
    static deleteProduct = async (req, res) => {
        try {
            await productModel.findByIdAndDelete(req.params.id)
            res.status(200).send({
                apiStatus: true,
                msg: "Deleted product successfully",
                data: []
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "Deleted product faild!",
                data: e.message.toString()[0] == "#"? e.message : "#1.1.0"
            });
        }
    }

    static editProduct = async (req, res) => {
        try {
            const product = await productModel.findOne({ _id: req.body._id })
            if (!product) throw new Error("#1.2.0")
            product.description = req.body.description
            product.images = req.body.images
            product.name = req.body.name
            product.type = req.body.type
            await product.save()
            res.status(200).send({
                apiStatus: true,
                msg: "Edit product successfully",
                data: product,
            });
        } catch (err) {
            res.status(500).send({
                apiStatus: false,
                msg: "Edit product faild!",
                data: err.message.toString()[0] == "#"? e.message : "#1.1.0",
            });
        }
    }
    static enableProduct = async (req, res) => {
        try {
            const product = await productModel.findById(req.body.id);
            if (!product) throw new Error("#1.2.1");
            product.status = true;
            product.updatedAt = Date.now();
            await product.save();
            res.status(200).send({
                apiStatus: true,
                msg: "Enabled product successfully",
                data: {},
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "Enabled product faild!",
                data: e.message.toString()[0] == "#"? e.message : "#1.1.0",
            });
        }
    };

    static disableProduct = async (req, res) => {
        try {
            const product = await productModel.findById(req.body.id);
            if (!product) throw new Error("#1.2.1");
            product.status = false;
            product.updatedAt = Date.now();
            await product.save();
            res.status(200).send({
                apiStatus: true,
                msg: "Disabled product successfully",
                data: {},
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "Disabled product faild!",
                data: e.message.toString()[0] == "#"? e.message : "#1.1.0",
            });
        }
    };
}
module.exports = Product