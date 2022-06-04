const router = require("express").Router();
const Category = require("../models/Category");

router.delete("/delete", async (req, res) => {
    try{
        const id = req.body.id;
        /*
        flag = true :- delete children also
        flag = false:- delete only category
        */
        const flag = req.body.flag;
        
        if(!id){
            return res.status(500).json("Id Missing");
        }

        if(flag){
            Category.findByIdAndDelete(id, async (err, data) => {
                if(err) return res.status(500).json(err)
                const parentID = data.parent_id;
                const parentData = await Category.findById(parentID);
                data.children_id.map(async (val) => {
                    await Category.findByIdAndDelete(val, (err, data) => {
                        if(err) return res.status.apply(500).json(err)
                    })
                })
                if(parentData){
                    var arr = parentData.children_id.filter((val) => val.toString() !== id);
                    
                    Category.findByIdAndUpdate(parentID, {$set: {children_id: arr}}, (err, data) => {
                        if(err) return res.status(500).json(err);
                        
                    })
                    
                }
                return res.status(200).json("Category deleted")
            }) 
        }
        else{
            Category.findByIdAndDelete(id, async (err, data) => {
                if(err)return res.status(500).json(err)
                
                //removing the child from its parent's children_id Array
                const parentID = data.parent_id
                const parentData = await Category.findById(parentID);
                if(parentData){
                    var arr = parentData.children_id.filter((val) => val.toString() !== id);
                    
                    Category.findByIdAndUpdate(parentID, {$set: {children_id: arr}}, (err, data) => {
                        if(err) return res.status(500).json(err);
                        
                    })
    
                }
                return res.status(200).json("Category deleted")
            }
            )
        }

    }
    catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;