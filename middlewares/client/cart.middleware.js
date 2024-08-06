const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
    try {
        if (!req.cookies.cartId) {
            const cart = new Cart();
            await cart.save();
            const expiresTime = 1000 * 60 * 60 * 24 * 365;

            res.cookie("cartId", cart.id, {
                expires: new Date(Date.now() + expiresTime),
                httpOnly: true, // Thêm để tăng tính bảo mật
                secure: process.env.NODE_ENV === 'production' // Thêm để cookie an toàn trong môi trường sản xuất
            });
            res.locals.miniCart = cart; // Đảm bảo res.locals.miniCart luôn được thiết lập
        } else {
            const cart = await Cart.findOne({ _id: req.cookies.cartId });

            if (cart) {
                if (Array.isArray(cart.products)) {
                    cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
                } else {
                    cart.totalQuantity = 0;
                }
                res.locals.miniCart = cart;
            } else {
                // Nếu không tìm thấy giỏ hàng, tạo một giỏ hàng mới
                const newCart = new Cart();
                await newCart.save();
                const expiresTime = 1000 * 60 * 60 * 24 * 365;

                res.cookie("cartId", newCart.id, {
                    expires: new Date(Date.now() + expiresTime),
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production'
                });
                res.locals.miniCart = newCart;
            }
        }
    } catch (error) {
        console.error(error);
        next(error); // Chuyển lỗi đến middleware tiếp theo
    }

    next();
};
