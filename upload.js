
const uploadImage = async (req,res) => {
    try{
        const {file} = req.files;
        file.mv(`${__dirname}/public/uploads/${file.name}`, function (error){
            if(error)
                res.json({code : 0, message : error});
            else{
                res.json({code : 1, message : "Sukses upload file", path : `${file.name}`});
            }
        });
    } catch(err){
        res.json({code : 0, message : err});
    }
}

module.exports = {
    uploadImage
}
