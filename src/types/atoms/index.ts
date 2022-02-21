import type { InputHTMLAttributes, DetailedHTMLProps } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';
import type React from 'react';

export interface LabelProps {
  htmlFor: string;
  label: string;
  LabelType?: string;
}

export interface Button {
  text: string;
  type?: string;
  buttonType?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export type IRegister<T> = UseFormRegister<T>;

export interface InputProps<T>
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id?: string;
  children?: React.ReactNode;
  error?: string;
  name: Path<T>;
  register: IRegister<T> | UseFormRegister<T>;
}

export interface InputFieldProps<T> extends InputProps<T>, LabelProps {}
