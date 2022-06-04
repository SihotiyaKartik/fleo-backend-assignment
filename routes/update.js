const router = require("express").Router();
const Category = require("../models/Category");

router.put("/update", async (req, res) => {
    try{

        if(!req.body.target_sale && !req.body.total_sale){
            return res.status(500).json("No data provided for updating")
        }

        if(!req.body.id){
            return res.status(500).json("Id not provided");
        }

        const id = req.body.id;
        
        Category.findByIdAndUpdate(id, {$set: req.body}, (err, data) => {
            if(err) return res.status(500).json(err);
            res.status(200).json(data);
        });
    }
    catch(err){
        return res.status(500).json(err)
    }
})

module.exports = router