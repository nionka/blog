/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { IButtonProp } from './interfaces';

function Button(props: IButtonProp) {
  const isLoading = Boolean(props?.loading);

  const allCssClass: string = [
    'btn',
    props?.customCssClass ? props.customCssClass : '',
    props?.color ? props.color : '',
    props?.size ? `btn-${props.size}` : '',
    isLoading ? 'btn-loading' : '',
    props?.type ? props.type : 'button',
  ].join(' ');

  const handleClick = (e: React.MouseEvent): void => {
    if (isLoading) return;

    if (props?.clickHandler) {
      e.preventDefault();
      props.clickHandler(e);
    }
  };

  return (
    <button
      className={allCssClass}
      onClick={(e) => handleClick(e)}
    >
      {props.children}
    </button>
  );
}

export default Button;
