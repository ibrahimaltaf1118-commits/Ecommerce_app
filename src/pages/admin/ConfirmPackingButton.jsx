// src/pages/admin/components/ConfirmPackingButton.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCheckCircle } from "react-icons/fi";
import { confirmPacking } from "../../store/slices/orderSlice";

// This component expects the order object and a function to update the parent state (the modal)
const ConfirmPackingButton = ({ order, setViewOrder }) => {
  const dispatch = useDispatch();
  // Get the logged-in user's ID from the Redux auth slice
  const { userInfo } = useSelector((state) => state.auth);

  if (!order) return null;

  // Only show the button if the order is ready to be packed (e.g., status is 'pending')
  if (order.status !== "pending") {
    return null;
  }

  const handleConfirmPacking = () => {
    if (!userInfo || !userInfo._id) {
      alert("Error: Admin user not logged in. Cannot confirm packing.");
      return;
    }

    const orderId = order._id;
    const adminId = userInfo._id;

    const confirmed = window.confirm(
      `CONFIRMATION: Are you sure you want to confirm packing for order ${order.orderId}? This will set the order status to 'Processing'.`
    );

    if (confirmed) {
      // 1. Dispatch the thunk
      dispatch(confirmPacking({ orderId, adminId }))
        .unwrap()
        .then((updatedOrder) => {
          alert(
            `Order ${updatedOrder.orderId} packing confirmed! Status updated to 'Processing'.`
          );

          // 2. Update the parent modal's state with the new order object
          // This immediately refreshes the modal (e.g., hides this button)
          setViewOrder(updatedOrder);
        })
        .catch((error) => {
          alert(`Failed to confirm packing: ${error}`);
        });
    }
  };

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <button
        onClick={handleConfirmPacking}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <FiCheckCircle size={18} />
        Confirm Packing Checklist
      </button>
    </div>
  );
};

export default ConfirmPackingButton;
