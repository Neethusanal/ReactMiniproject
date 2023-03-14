const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "./public/image");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadOptions = multer({ storage: storage }).fields([{ name: 'image', maxCount: 1 }]);;


// const FILE_TYPE_MAP = {
//   'image/png':'png',
//   'image/jpeg':'jpeg',
//   'image/jpg':'jpg'
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype]
//     let uploadError = new Error('invalid image type')

//     if(isValid){
//       uploadError = null
//     }
//     cb(uploadError, './public/image')
//   },
//   filename:async function (req, file, cb) {
//     console.log(file);
//     const filename = file.originalname.split(' ').join('-')
//     const extension =await FILE_TYPE_MAP[file.mimetype]
//     cb(null, `${filename}-${Date.now()}.${extension}`)
//     console.log(`${filename}-${Date.now()}.${extension}`);
//   }
 
// })
 
 //const uploadOptions = multer({ storage: storage })




module.exports = { uploadOptions };
