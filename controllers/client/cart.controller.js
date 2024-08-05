const Cart=require("../../models/cart.model");
const product=require("../../models/product.model")

// [POST]/cart/add/:productId
module.exports.addPost=async(req,res)=>{
    const productId=req.params.productId;
    const cartId=req.cookies.cartId;
    const quantity=parseInt(req.body.quantity)

    const cart=await Cart.findOne({
        _id:cartId
    })
    const existProductInCart=cart.products.find(item=>item.product_id==productId)
    if(existProductInCart){
        const newQuantity=quantity+existProductInCart.quantity

        await Cart.updateOne(
        {
            _id:cartId,
            'products.product_id':productId
        },
        {
            'products.$.quantity':newQuantity
        })
    }else{
        const objectCart={
            product_id:productId,
            quantity:quantity
        }
        await Cart.updateOne(
        {
            _id:cartId
        },
        {
            $push:{products:objectCart}
        }
        )
    }
    req.flash("success","Thêm sản phẩm vào giỏ hàng thành công")
    res.redirect("back")
}