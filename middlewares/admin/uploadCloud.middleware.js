
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({ 
    cloud_name: 'dvjpilikk', 
    api_key: '892159714778611', 
    api_secret: '4iGe229GUlcWFGnMWgLh1RRceLQ' // Click 'View Credentials' below to copy your API secret
});

module.exports.upload=(req, res, next)=>{
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname]=result.secure_url
            console.log(result);
            next();
        }
    
        upload(req);
    } else {
        next();
    }
}
        