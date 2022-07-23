const multer = require('multer')
const path = require('path')

const userImage = path.join(__dirname, "../client/src/assets/uploads/profile");
const productImages = path.join(
    __dirname,
    "../client/src/assets/uploads/products"
);



storageImageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, userImage);
    },
    filename: (req, file, cb) => {
        cb(null, req.user._id + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    },
});

const uploadImageProfile = multer({
    storage: storageImageProfile,
});

storageImageProduct = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, productImages);
    },
    filename: (req, file, cb) => {
        cb(null, req.params.productId + "_" + file.originalname);
    },
});

const uploadImageProduct = multer({
    storage: storageImageProduct,
});



// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, link);
//   },
//   filename: (req, file, cb) => {
//     cb(null,  req.user._id +"_"+ file.originalname);
//   },
// });

// let upload = multer({
//   storage: storage,
// });

module.exports = {
    uploadImageProfile,
    uploadImageProduct,
};


