import { useContext, useState, useEffect } from "react";
import Storecontext from "../context/Storecontext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { food_list, cartitems, addtoCart, removefromCart, cartTotal } =
    useContext(Storecontext);

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  const isEmpty =
    Object.keys(cartitems).length === 0 ||
    Object.values(cartitems).every((qty) => qty === 0);

  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handlePromoChange = (e) => {
    setPromo(e.target.value);
  };

  const applyPromo = () => {
    if (promo === "Bandu") {
      setPromoApplied(true);
    }
  };

  return (
    <div className="p-4 min-h-[50vh]">
      {/* Header row */}
      <div className="cartHead">
        <div className="grid [grid-template-columns:1fr_1fr_1fr_1fr_1fr_0.8fr] font-semibold pb-2 mb-2">
          <p className="text-center">Items</p>
          <p className="text-center">Item Name</p>
          <p className="text-center">Price</p>
          <p className="text-center">Quantity</p>
          <p className="text-center">Total</p>
          <p className="text-center">Remove</p>
        </div>
        <hr className="text-gray-400 w-full m-auto" />

        {/* Cart items */}
        {!isEmpty ? (
          food_list.map((item) => {
            if (cartitems[item._id]) {
              return (
                <div
                  key={item._id}
                  className="grid [grid-template-columns:1fr_1fr_1fr_1fr_1fr_0.8fr] items-center gap-2 border-b py-2"
                >
                  <div className="flex justify-center">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/images/${item.imageUrl}` || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="w-[120px] rounded object-cover text-center"
                    />
                  </div>
                  <p className="font-medium text-center">{item.name}</p>
                  <p className="text-center">${item.price}</p>
                  <p className="text-center">{cartitems[item._id]}</p>
                  <p className="text-center">${item.price * cartitems[item._id]}</p>

                  <div className="flex gap-4 justify-center items-center">
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => addtoCart(item._id)}
                    >
                      +
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => removefromCart(item._id)}
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="py-6">
            <img className="m-auto" src="/cartempty.gif" width="150px" />
          </div>
        )}
      </div>

      {isEmpty && <hr className="border-t border-gray-300 my-2 w-3/4 m-auto" />}

      {/* Cart Totals and Promo */}
      <div className="cart-Bottom flex-col-reverse md:flex-row flex gap-10 md:grid-cols-2 py-15">
        <div className="flex flex-col gap-4 text-gray-700 w-[100%]">
          <h1 className="text-3xl font-medium mb-2">Cart Totals</h1>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${cartTotal()}</p>
          </div>
          <hr className="border-t border-gray-300 my-2" />
          <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>${cartTotal() === 0 ? 0 : 2}</p>
          </div>
          <hr className="border-t border-gray-300 my-2" />
          {promoApplied && (
            <>
              <div className="flex justify-between">
                <p>Promo Applied!</p>
                <p>-${2}</p>
              </div>
              <hr className="border-t border-gray-300 my-2" />
            </>
          )}

          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>
              $
              {promoApplied
                ? cartTotal() === 0
                  ? 0
                  : cartTotal() + 2 - 2
                : cartTotal() === 0
                ? 0
                : cartTotal() + 2}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="mt-2">
            <Link
              to={token && cartTotal() > 0 ? "/placeorder" : "#"}
              className={`px-4 py-2 rounded text-white font-medium ${
                token && cartTotal() > 0
                  ? "bg-[tomato] hover:bg-red-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={(e) => {
                if (!token || cartTotal() === 0) {
                  e.preventDefault();
                  toast.error(
                    !token
                      ? "You must be logged in to proceed!"
                      : "Your cart is empty!"
                  );
                }
              }}
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>

        {/* Promo Code */}
        <div className="flex flex-col items-start gap-9 px-2 w-[100%]">
          <p className="text-gray-800 font-medium">
            If you have a promo code, enter it here
          </p>
          <div className="flex w-full">
            <input
              type="text"
              onChange={handlePromoChange}
              value={promo}
              placeholder="Enter promo code"
              className="border border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[tomato] w-full"
            />
            <button
              className="bg-black text-white px-5 md:px-10 py-2 rounded-r-lg font-medium"
              onClick={applyPromo}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
