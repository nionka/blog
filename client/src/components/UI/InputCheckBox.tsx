import React from 'react';
import { ICheckbox } from './interfaces';
import './ui.scss';

const InputCheckBox = (props: ICheckbox) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.changeHandler(e);
  }

  return (
    <div className='form-checkbox'>
      <div>
        <input
          type='checkbox'
          name={props.name}
          id={props.name}
          checked={props.value}
          onChange={handleChange}
        />

        <label htmlFor={props.name}>{props.label}</label>
      </div>
      {props.error && (
        <p style={{color: 'red', paddingLeft: '10px'}}>{props.error}</p>
      )}
    </div>
  )
}

export default InputCheckBox;
