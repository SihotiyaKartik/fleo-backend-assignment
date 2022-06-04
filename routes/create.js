/* 
    route for creating category
    details taken will be current sale, name, target sale, id of parent category
*/

const router = require("express").Router();
const Category = require("../models/Category");

router.post("/create", async (req, res) => {
    try{
        const newCategory = new Category({
            total_sale: req.body.total_sale,
            target_sale: req.body.target_sale,
            name: req.body.name,
            parent_id: req.body.parent_id
        });

        const data = await newCategory.save();
        if(!data) return res.status(500).json("Unable to create category")

        const parentData = await Category.findById(data.parent_id)
        if(!parentData) return res.status(500).json("Unable to fetch parent category")

        const parentID = parentData._id;
        
        Category.findByIdAndUpdate(parentID, {$push: {children_id: data._id}}, (err, data) => {
            if(err) return res.status(500).json(err)
        })
        
        res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router