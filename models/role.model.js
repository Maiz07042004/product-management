const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    permission:{
        type: Array,
        default:["Thêm sản phẩm","Xoá sản phẩm"]
    },
    deleted:{
        type: Boolean,
        default: false
    },
    deleteAt:Date
},{
    timestamps:true
});

const Role = mongoose.model('Role', productSchema, "roles");

module.exports = Role;