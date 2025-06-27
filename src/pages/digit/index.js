import React, { useState } from "react";

const accountTypeNumber = [
  { id: 1, name: "Special Number" },
  { id: 2, name: "Normal Number" },
];

export default function FormattedInput() {
  const [selectedTypeId, setSelectedTypeId] = useState(2);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    let input = e.target.value.replace(/[^0-9]/g, "");

    if (selectedTypeId === 1) {
      // Special Number: Allow max 10 digits only (min 9 handled optionally)
      input = input.slice(0, 10);
    } else {
      // Normal Number: format 123-1234567890
      input = input.slice(0, 13); // max 13 digits (dash is extra)
      if (input.length > 3) {
        input = input.slice(0, 3) + "-" + input.slice(3);
      }
    }

    setValue(input);
  };

  const handleTypeChange = (id) => {
    setSelectedTypeId(id);

    const digits = value.replace(/[^0-9]/g, "");
    const sliced = id === 1 ? digits.slice(0, 10) : digits.slice(0, 13);

    if (id === 1) {
      setValue(sliced);
    } else {
      setValue(
        sliced.length > 3 ? sliced.slice(0, 3) + "-" + sliced.slice(3) : sliced
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center space-x-6 p-6 bg-white rounded-lg shadow-md">
        {/* Radio Buttons */}
        <div className="flex items-center space-x-4">
          {accountTypeNumber.map((type) => (
            <label
              key={type.id}
              className="flex items-center space-x-1 text-sm font-medium text-gray-700"
            >
              <input
                type="radio"
                name="accountType"
                value={type.id}
                checked={selectedTypeId === type.id}
                onChange={() => handleTypeChange(type.id)}
                className="accent-blue-500"
              />
              <span>{type.name}</span>
            </label>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={selectedTypeId === 1 ? 10 : 14} // 10 digits max for special
          placeholder={
            selectedTypeId === 1
              ? "Enter 9–10 digit Special Number"
              : "123-1234567890"
          }
          className="border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
      </div>
    </div>
  );
}
