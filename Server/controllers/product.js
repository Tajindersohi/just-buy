const getAllProducts = async (req,res) => {
    res.status(200).json({msg:"Get all Products"});
};

const getAllProductsTesting = async (req,res) => {
    res.status(200).json({msg:"Get all Products Testing"});
};

module.exports = {getAllProducts, getAllProductsTesting }