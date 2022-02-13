import React from 'react';
import { ICheckbox } from './interfaces';
import './ui.scss';

function InputCheckBox({
  name, value, error, label, changeHandler,
}: ICheckbox) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(e);
  };

  return (
    <div className="form-checkbox">
      <div>
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={value}
          onChange={handleChange}
        />

        <label htmlFor={name}>{label}</label>
      </div>
      {error && (
        <p style={{ color: 'red', paddingLeft: '10px' }}>{error}</p>
      )}
    </div>
  );
}

export default InputCheckBox;
