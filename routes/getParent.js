const router = require("express").Router();
const Category = require("../models/Category");

router.post("/getParent", async (req, res) => {
    try{
        
        const id = req.body.id;
        if(!id) return res.status(500).json("Id not provided");
        const data = await Category.findById(id);
        if(!data) return res.status(500).json("Category not found")
        const parentId = data.parent_id;
        const parentData = await Category.findById(parentId);
        if(!parentData) return res.status(500).json("Parent category not found");
        res.status(200).json(parentData)
    }
    catch(err){
        return res.status(500).json(err);
    }
    
})

module.exports = router