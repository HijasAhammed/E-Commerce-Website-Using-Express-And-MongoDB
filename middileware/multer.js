const multer=require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath = './public'
      if(req.uploadType === 'asset'){
        uploadPath = './public/asset'
      }else if(req.uploadType === 'banner'){
        uploadPath = './public/banner'
      }
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })

  function uploadFolder(type){
    return (req,res,next)=>{
      req.uploadType = type
      next()
    }
  }
 const upload = multer({storage})

module.exports={upload,uploadFolder}

