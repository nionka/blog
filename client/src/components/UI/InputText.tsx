import React from 'react';
import { IInputProp } from './interfaces';

function InputText({
  customCssClass, placeholder, error, name, value, type, changeHandler,
}: IInputProp) {
  const allCssClass = [
    'input',
    customCssClass || '',
  ].join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(e);
  };

  return (
    <>
      <input
        className={allCssClass}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
      />
      {error && (
        <p style={{ color: 'red', paddingLeft: '10px', marginTop: '-12px' }}>{error}</p>
      )}
    </>
  );
}

export default InputText;
