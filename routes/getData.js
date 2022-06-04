const router = require("express").Router();
const Category = require("../models/Category");

router.post("/getData", async (req, res) => {

    try{
        const id = req.body.id;
        if(!id) return res.status(500).json("Id not entered");

        const data = {
            childData: {}
        } 

        const d = await Category.findById(id);
        if(!d) return res.status(500).json("Category not found");
        
        console.log(d.children_id)
        
        d.children_id.map(async (val) => {
            await Category.findById(val, (err, temp) => {
                if(err) return res.status(500).json(err);
                console.log(temp)
                //data.childData = [...data.childData, temp];
            })
        })

        return res.status(200).json(data);
    }
    catch(err){
        
        return res.status(500).json("ERROR")
    }

})

module.exports = router