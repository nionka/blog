import React from 'react';
import { ITextarea } from './interfaces';

function InputTextarea({
  customCssClass, name, placeholder, value, error, changeHandler,
}: ITextarea) {
  const handleChange = (e: any) => {
    changeHandler(e);
  };

  const stylesAll = [
    'form-textarea',
    customCssClass || '',
  ].join(' ');

  return (
    <>
      <textarea
        className={stylesAll}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
      />
      {error && (
        <p style={{ color: 'red', paddingLeft: '10px', marginTop: '10px' }}>{error}</p>
      )}
    </>
  );
}

export default InputTextarea;
