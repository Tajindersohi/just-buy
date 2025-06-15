const uploadImage = async (req, res) => {
    try {
        const imageUrl = `${process.env.APP_URL}/uploads/${req.file.filename}`;
        console.log("imageUrl",imageUrl);
        res.status(201).json({ message: 'Image uploaded successfully', imageUrl: imageUrl, success:true });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error, success:false });
    }
};

module.exports = { uploadImage };
