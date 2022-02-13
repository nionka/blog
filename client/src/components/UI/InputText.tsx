import React from 'react';
import { IInputProp } from './interfaces';

function InputText(props: IInputProp) {
  const allCssClass = [
    'input',
    props?.customCssClass ? props.customCssClass : '',
  ].join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    props.changeHandler(e);  
  }

  return (
    <>
      <input
        className={allCssClass}
        onChange={(e) => handleChange(e)}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        type={props.type} 
      />
      {props.error && (
        <p style={{color: 'red', paddingLeft: '10px', marginTop: '-12px'}}>{props.error}</p>
      )}
    </>
  )
}

export default InputText;
