/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { IRadioProps } from './interfaces';
import './ui.scss';

function InputRadio({
  label, options, name, changeHandler, value,
}: IRadioProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(e);
  };

  return (
    <div className="form-radio">
      <label>{label}</label>
      <div className="options">
        {options.map((option) => (
          <div key={option.name}>
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={handleChange}
            />
            <label htmlFor={option.value}>{option.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputRadio;
