import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  deleteItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/amazonSlice";
import { motion } from "framer-motion";
import { emptyCart } from "../assets";
import { Link } from "react-router-dom";

const Cart = () => {
  const products = useSelector((state) => state.amazonReducer.products);
  const userInfo = useSelector((state) => state.amazonReducer.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payNow,setPayNow] = useState(false);
  const [totalAmt, setTotalAmt] = useState("");
  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [products]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      console.log("Please sign in to Checkout");
      setTimeout(() => {
        navigate("/signin")
      })
      
    }
  };
  const payment = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalAmt * 100,
      token: token,
    });
  };

  return (
    <div className="w-full bg-gray-100 p-4">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-5 gap-8">
          <div className="w-full bg-white px-4 col-span-5 xl:col-span-4">
            <div className="font-titleFont hidden xl:flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <h1 className="text-3xl font-semibold">Shopping Cart</h1>
              <h3 className="text-xl font-semibold">Subtotal</h3>
            </div>

            <div>
              {products.map((item) => (
                <div
                  key={item._id}
                  className="w-full border-b-[1px] border-b-gray-300 p-4 md:p-0 md:py-4 flex items-center gap-6"
                >
                  <div className="w-full flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-2/5 xl:w-1/5">
                      <img
                        className="w-full h-44 object-contain"
                        src={item.image}
                        alt="productImg"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2 xl:gap-1">
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <p className="xl:pr-10 text-sm">{item.description}</p>
                      <p className="text-base">
                        Unit Price:{" "}
                        <span className="font-semibold">${item.price}</span>
                      </p>
                      <div className="flex justify-start items-center gap-4">
                        {" "}
                        <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-36 py-1 text-center drop-shadow-lg rounded-md">
                          <p className="text-base font-normal">Qty:</p>
                          <p
                            onClick={() => {
                              dispatch(decreaseQuantity(item._id));
                            }}
                            className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-gray-400 font-semibold duration-300"
                          >
                            -
                          </p>
                          <p className="font-titleFont text-base font-semibold text-amazon_blue">
                            {item.quantity}
                          </p>
                          <p
                            onClick={() => dispatch(increaseQuantity(item._id))}
                            className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-gray-400 font-semibold duration-300"
                          >
                            +
                          </p>
                        </div>
                        <span className="text-gray-200">|</span>
                        <button
                          onClick={() => dispatch(deleteItem(item._id))}
                          className="text-xs text-[#007185] font-medium decoration-transparent hover:decoration-[#C7511F] hover:underline underline-offset-2 hover:text-[#C7511F] duration-300"
                        >
                          Delete
                        </button>
                        <span className="hidden xl:flex text-gray-200">|</span>
                        <button className="hidden xl:flex text-xs text-[#007185] font-medium decoration-transparent hover:decoration-[#007185] hover:underline underline-offset-2 hover:text-[#007185] duration-300">
                          Save for later
                        </button>
                        <span className="hidden xl:flex text-gray-200">|</span>
                        <button className="hidden xl:flex text-xs text-[#007185] font-medium decoration-transparent hover:decoration-[#007185] hover:underline underline-offset-2 hover:text-[#007185] duration-300">
                          Compare with similar items
                        </button>
                        <span className="hidden xl:flex text-gray-200">|</span>
                        <button className="hidden xl:flex text-xs text-[#007185] font-medium decoration-transparent hover:decoration-[#007185] hover:underline underline-offset-2 hover:text-[#007185] duration-300">
                          Share
                        </button>
                      </div>
                    </div>

                    <div className="w-full md:w-24">
                      <p className="text-lg xl:w-24 font-titleFont font-semibold">
                        {Math.abs(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div onClick={() => dispatch(resetCart())} className="w-full py-4">
              <button className="text-sm text-[#007185] font-medium decoration-transparent hover:decoration-[#C7511F] hover:underline underline-offset-2 hover:text-[#C7511F] duration-300">
                Clear Cart
              </button>
            </div>
          </div>
          <div className="col-span-5 md:col-span-3 lg:col-span-2 xl:col-span-1 bg-white h-60 flex items-center p-4">
            <div>
              <p className="flex gap-2 items-start text-sm">
                <span>
                  <CheckCircleIcon
                    fontSize="small"
                    className="bg-white text-[#067D62] rounded-full"
                  />
                </span>
                Your order qualifies for FREE Shipping Choose this option at
                checkout. See details....
              </p>
              <div>
                <p className="font-semibold px-6 py-1 flex items-center justify-between">
                  Total: <span className="text-lg font-bold">${totalAmt}</span>
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
              >
                Proceed to Buy
              </button>
              {payNow && (
                <div className="w-full mt-6 flex justify-center items-center">
                  <StripeCheckout
                    stripeKey="pk_test_51MpeqYGWGLA2Lp5BcXQvWWux3ZzuVNB7EXignj2pIcoHnJSltXqaG2lnojMFK4KbBpmlB28Y9uDFaBAnoFy1CMHX00thVF0pBw"
                    name="Amazon Clone"
                    amount={totalAmt * 100}
                    label="Payment"
                    description={`Your payment aount is ${totalAmt}`}
                    token={payment}
                    email={userInfo.email}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center items-center gap-4 py-10"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="w-96 p-4 bg-white flex  flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/">
              <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont font-semibold text-lg">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
