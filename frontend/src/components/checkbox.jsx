
import React from 'react';

const CheckboxGroup = ({ options, selectedOptions, onChange, category }) => {
  const handleCheckboxChange = (event) => {
    const value = event.target.name;
    const isChecked = event.target.checked;
    onChange(category, value, isChecked);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            name={option}
            checked={selectedOptions?.includes(option)}
            onChange={handleCheckboxChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
