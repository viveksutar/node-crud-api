import Address from "../../models/address.model.js";
import Cart from "../../models/cart.model.js";
import Order from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Response } from "../../utils/apiResponser.js";
import AppError from "../../utils/appError.js";
const orderCreate = asyncHandler(async (req, res, next) => {
  const { addressId } = req.body;
  const address = await Address.findById(addressId);
  const cart = await Cart.find({ user: req.user._id }).populate({
    path: "product",
    model: "Product",
  });
  if (!cart) {
    return res
      .status(400)
      .json({ success: false, message: "Please add some products in cart" });
  }
  // Calculate the total sum of the 'total' key in the cart array
  const cartTotal = cart.reduce((acc, item) => acc + item.total, 0);
  const orderItems = cart.map((item) => {
    return {
      product: item.product,
      price: item.product.discounted_price,
      quantity: item.quantity,
      totalAmount: item.total,
    };
  });
  if(orderItems){
    return next(new AppError('No user found with that ID', 404));
  }
  let order = null;
  if (address && orderItems && cartTotal) {
    order = await Order.create({
      user: req.user._id,
      address: address,
      deliveryCharges: 0,
      discountedAmount: 0,
      paymentMode: "cash",
      orderItems: orderItems,
      orderTotal: cartTotal,
    });
    // return res.json({
    //   success: true,
    //   message: "Order placed",
    //   data: {
    //     order,
    //   },
    // });
    return Response.successResponse(res, "Order Placed", { order });
  }
  return Response.errorResponse(res);
});

export { orderCreate };
