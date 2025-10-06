const express = require('express');
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

// Admin routes (can add auth middleware here)
router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
