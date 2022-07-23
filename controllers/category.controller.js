const categoryModel = require('../db/models/Category');

class Category {

    static getAllCategories = async (req, res) => {
        try {
            const categories = await categoryModel.find()
            if (!categories) throw new Error("Can't get categories!")
            res.status(200).send({
                apiStatus: true,
                msg: "All categories fetched",
                data: categories
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "can't get all categories!",
                data: e.message
            });
        }
    }

    static addCategory = async (req, res) => {
        try {
            const category = await categoryModel.findOne({ name: req.body.name })
            if (category) throw new Error('This category name is already exist!')
            const addCategory = await new categoryModel(req.body)
            await addCategory.save()
            res.status(200).send({
                apiStatus: true,
                msg: "New category added successfully",
                data: addCategory
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "addation category faild!",
                data: e.message
            });
        }
    }

}
module.exports = Category