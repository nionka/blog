import React from 'react';
import { IInputProp } from './interfaces';

function Input(props: IInputProp) {
  const allCssClass = [
    'input',
    props?.customCssClass ? props.customCssClass : '',
  ].join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    props.changeHandler(e);  
  }

  return (
    <input
      className={allCssClass}
      onChange={(e) => handleChange(e)}
      placeholder={props.placeholder}
      name={props.name}
      type="text" 
    />
  )
}

export default Input;
