import type { InputProps } from '@types';

const Input = <T,>({ id, name, register, ...props }: InputProps<T>) => {
  return (
    <input
      id={id}
      {...(register && { ...register(name) })}
      {...props}
      className={'bg-transparent text-white border border-[#FE3277] outline-none rounded-full px-3 py-2 mb-2'}
      autoComplete="off"
    />
  );
};

export default Input;
