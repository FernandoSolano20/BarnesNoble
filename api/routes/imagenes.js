const express = require('express');
const cloudinary = require('cloudinary').v2,
    router = express.Router();

router.post('/crear', async (req, res) => {
    const file = req.files.photo;
    try {
        return await cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'La imagen no se pudo almacenar',
                    err
                });
            } else {
                return res.json({
                    success: true,
                    result: result
                })
            }
        });
    }catch(e){
        console.log("Error" + e);
    }
    
});

module.exports = router;
