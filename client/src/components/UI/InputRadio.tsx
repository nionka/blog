import React from 'react';
import { IRadioProps } from './interfaces';
import './ui.scss';

const InputRadio = (props: IRadioProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.changeHandler(e);
  }

  return (
    <div className='form-radio'>
      <label>{props.label}</label>
      <div className='options'>
        {props.options.map((option) => (
          <div key={option.name}>
            <input 
              type="radio"
              id={option.value}
              name={props.name}
              value={option.value}
              checked={option.value === props.value}
              onChange={handleChange}
            />
            <label htmlFor={option.value}>{option.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InputRadio;
