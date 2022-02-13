import React from 'react';
import { IInputSelect } from './interfaces';
import './ui.scss';

function InputSelect({
  name, defaultValue, options, changeHandler, label,
}: IInputSelect) {
  const handleChange = (e: React.ChangeEvent) => {
    changeHandler(e);
  };

  return (
    <select
      className="form-select"
      name={name}
      onChange={(e) => handleChange(e)}
      value={defaultValue}
    >
      <option value="">
        {label}
      </option>
      {options.map((opt) => (
        <option
          key={opt._id}
          value={opt._id}
        >
          {opt.name}
        </option>
      ))}
    </select>
  );
}

export default InputSelect;
