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
  changeHandler: (e: React.ChangeEvent) => void;
}