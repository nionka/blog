/* eslint-disable no-unused-vars */
import React from 'react';
import { ButtonSize, ButtonColor } from './constants';

interface IElementProperties {
  customCssClass?: string;
}

export interface IButtonProp extends IElementProperties {
  children?: React.ReactNode;
  color: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  clickHandler?: (e: React.MouseEvent) => void;
}

export interface IInputProp extends IElementProperties {
  placeholder: string;
  value: string;
  type?: string;
  name: string;
  error?: string;
  changeHandler: (e: React.ChangeEvent) => void;
}

interface IOption {
  name: string,
  value: string
}

export interface IRadioProps {
  label: string,
  value: string,
  options: Array<IOption>,
  name: string
  changeHandler: (e: React.ChangeEvent) => void;
}

export interface ICheckbox {
  label: string;
  name: string;
  value: boolean;
  error?: string;
  changeHandler: (e: React.ChangeEvent) => void;
}

interface IOptions {
  _id: string,
  name: string,
}

export interface IInputSelect {
  name: string;
  label: string;
  defaultValue: string;
  options: IOptions[];
  changeHandler: (e: React.ChangeEvent) => void;
}

export interface ITextarea {
  customCssClass?: string;
  name: string;
  error?: string;
  value: string;
  placeholder: string;
  changeHandler: (e: React.ChangeEvent) => void;
}
