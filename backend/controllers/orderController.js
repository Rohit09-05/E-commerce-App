const Order = require('../models/Order');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin (for now public)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  const { name, email, phone, product_id, product_name, comments } = req.body;

  if(!name || !email || !product_id) {
    return res.status(400).json({ message: 'Name, email, and product_id are required' });
  }

  try {
    const order = new Order({
      name,
      email,
      phone,
      product_id,
      product_name,
      comments,
      fulfilled: false,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update order status (fulfilled / pending)
// @route   PUT /api/orders/:id
// @access  Admin
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if(order) {
      order.fulfilled = req.body.fulfilled;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
  if(order) {
  await order.deleteOne();
  res.json({ message: 'Order removed' });
} else {
  res.status(404).json({ message: 'Order not found' });
}
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
