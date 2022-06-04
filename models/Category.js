const mongoose  = require("mongoose");

const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    total_sale: {
        type: String,
        required: true
    },
    target_sale: {
        type: String,
        required: true
    },
    parent_id: {
        type: String,
        default: ""
    },
    children_id: {
        type: Array
    }

}, {timestamps: true});

module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);
