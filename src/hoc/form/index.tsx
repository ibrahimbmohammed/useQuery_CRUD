import type { FC } from 'react';
interface FormFrameProps {
  children: React.ReactNode;
  className?: string;
  onHandleSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const FormFrame: FC<FormFrameProps> = ({ children, className, onHandleSubmit }) => {
  return (
    <form onSubmit={onHandleSubmit} className={className}>
      {children}
    </form>
  );
};

export default FormFrame;
