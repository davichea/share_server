import React, { useState } from "react";

const paymentOptions = [
  { id: "googlePay", label: "Google Pay" },
  { id: "applePay", label: "Apple Pay" },
  { id: "paypal", label: "PayPal" },
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "MasterCard" },
  { id: "bankTransfer", label: "Bank Transfer" },
  { id: "stripe", label: "Stripe" },
  { id: "cash", label: "Cash on Delivery" },
  { id: "alipay", label: "Alipay" },
  { id: "wechat", label: "WeChat Pay" },
];

export default function PaymentSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-xl w-full bg-white rounded-4xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Select Payment Method</h2>
        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto p-2">
          {paymentOptions.map((option) => (
            <label
              key={option.id}
              className={`w-full flex items-center gap-3 px-5 py-3 shadow-md rounded-xl cursor-pointer
                ${selected === option.id
                  ? "bg-indigo-100 text-indigo-900 ring-2 ring-indigo-200"
                  : "bg-white text-gray-800 hover:bg-gray-50"
                } transition-all duration-300`}
            >
              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
                className="cursor-pointer accent-indigo-500"
              />
              <span className="text-base font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
