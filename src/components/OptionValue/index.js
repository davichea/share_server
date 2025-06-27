import React, { useEffect, useState, useMemo, useCallback } from 'react';

export default function OptionValue({
  options = [], // Array of options to display
  onSelect, // Callback for when an option is selected
  valueFromServer, // Pre-selected value from server
  valueKey = 'id', // Key for option value (default: 'id')
  labelKey = 'name' // Key for option label (default: 'name')
}) {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Memoize filtered options to avoid redundant computations
  const filteredOptions = useMemo(() => {
    
    
    if (selectedOption && inputValue.includes('-')) {
      const matchedOption = options.find((opt) => opt[valueKey] === selectedOption);
      return matchedOption ? [matchedOption] : [];
    }

    return inputValue
      ? options.filter((option) =>
          `${option[labelKey]}${option[valueKey]}`
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
        : options;
  }, [inputValue, options, selectedOption, valueKey, labelKey]);

  // Initialize with server-provided value
  useEffect(() => {
    if (valueFromServer?.[valueKey] && valueFromServer?.[labelKey]) {
      const matchedOption = options.find(
        (opt) => opt[valueKey] === valueFromServer[valueKey]
      );
      if (matchedOption) {
        setSelectedOption(matchedOption[valueKey]);
        setInputValue(`${matchedOption[valueKey]} - ${matchedOption[labelKey]}`);
      }
    }
  }, [valueFromServer, options, valueKey, labelKey]);

  // Memoize event handlers to prevent unnecessary re-creations
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectOption = useCallback(
    (option) => {
      setSelectedOption(option[valueKey]);
      setInputValue(`${option[valueKey]} - ${option[labelKey]}`);
      setIsOpen(false);
      onSelect?.(option);
    },
    [onSelect, valueKey, labelKey]
  );

  const clearInput = useCallback(() => {
    setInputValue('');
    setSelectedOption(null);
    setIsOpen(false);
  }, []);

  return (
    <div className="relative w-64">
      {/* Input field with clear button */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={toggleDropdown}
          className="w-full p-2.5 pr-10 truncate border border-gray-300 rounded-lg text-sm 
                    focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none 
                    bg-white text-gray-900"
          placeholder="Select option"
        />
        {inputValue && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 
                      text-gray-500 hover:text-red-500 text-sm font-bold"
          >
            X
          </button>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-md z-10 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option[valueKey]}
                onClick={() => handleSelectOption(option)}
                className={`p-2 text-black rounded-md cursor-pointer hover:bg-blue-100 
                          ${selectedOption === option[valueKey] ? 'bg-red-300' : ''}`}
              >
                {option[valueKey]} - {option[labelKey]}
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-600">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
}