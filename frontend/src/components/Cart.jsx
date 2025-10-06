import React from "react";

function Cart({ items, onRemove }) {
  if (items.length === 0) {
    return <p className="text-center text-gray-600">Your cart is empty.</p>;
  }

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id || item._id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-800 font-semibold">${item.price}</p>
            </div>
            <button
              onClick={() => onRemove(item.id || item._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right font-bold text-lg">
        Total: ${totalAmount.toFixed(2)}
      </div>
      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
