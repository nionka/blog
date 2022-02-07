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
  type?: string;
  name: string;
  error?: string;
  changeHandler: (e: React.ChangeEvent) => void;
}

export interface IRadioProps {
  label: string,
  value: string,
  options: Array<IOption>,
  name: string
  changeHandler: (e: React.ChangeEvent) => void;
}

interface IOption {
  name: string,
  value: string
}

export interface ICheckbox {
  label: string;
  name: string;
  value: boolean;
  error?: string;
  changeHandler: (e: React.ChangeEvent) => void;
}

export interface IInputSelect {
  name: string;
  label: string;
  value: string;
  changeHandler: (e: React.ChangeEvent) => void;
  options: IOptions[];
}

interface IOptions {
  _id: string,
  name: string,
}

export interface ITextarea {
  customCssClass?: string;
  name: string;
  error?: string;
  value: string;
  placeholder: string;
  changeHandler: (e: React.ChangeEvent) => void;
}