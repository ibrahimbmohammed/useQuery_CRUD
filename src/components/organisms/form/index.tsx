import type { User } from '@types';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import Input from '@atoms/input';
import { path } from 'ramda';
import Button from '@atoms/button';
import FormWrapper from '@hoc/form';
import { useAddUser, useEditUser } from '@services/users';
import {ImSpinner11} from 'react-icons/im'
export interface OnSubmitHandle {
  onHandleSubmit: UseFormHandleSubmit<User>;
  register: UseFormRegister<User>;
  setOpen(state: boolean): void;
  errors: FieldErrors;
}
const Form = ({ setOpen, register, onHandleSubmit, errors }: OnSubmitHandle) => {
  const { mutateAsync, isLoading, error } = useAddUser();
  const { mutateAsync: editMutation, isLoading: editLoading, error: editError } = useEditUser();
  const onSubmit: SubmitHandler<User> = async (data: User) => {
    !data.id
      ? mutateAsync(data).then(() => setOpen(false))
      : editMutation(data).then(() => setOpen(false));
  };
  if (error || editError) return <div className=''>something went wrong</div>
  return (
    <FormWrapper className='flex flex-col items-center justify-center mb-4 ' onHandleSubmit={onHandleSubmit(onSubmit)}>
      <div className=''>
        {}
      </div>
      <div className='max-w-[12rem]' >
        <Input
          name="name"
          placeholder="name"
          register={register}
          type={'text'}
          error={path(['name', 'message'], errors)}
        />
        {errors && <p className="mt-1 text-xs text-red-600">{path(['name', 'message'], errors)}</p>}
      </div>
      <div className='max-w-[12rem]' >
        <Input
          name="username"
          placeholder="username"
          register={register}
          type={'text'}
          error={path(['username', 'message'], errors)}
        />
        {errors && (
          <p className="mt-1 text-xs text-red-600">{path(['username', 'message'], errors)}</p>
        )}
      </div>
      <div className='max-w-[12rem]' >
        <Input
          name="phone"
          placeholder="phone"
          register={register}
          type={'text'}
          error={path(['phone', 'message'], errors)}
        />
        {errors && (
          <p className="mt-1 text-xs text-red-600">{path(['phone', 'message'], errors)}</p>
        )}
      </div>
      <div className='max-w-[12rem]' >
        <Input
          name="email"
          placeholder="email"
          register={register}
          type={'text'}
          error={path(['email', 'message'], errors)}
        />
        {errors && (
          <p className="mt-1 text-xs text-red-600">{path(['email', 'message'], errors)}</p>
        )}
      </div>
      <Button className="px-6 py-3 mt-3 text-white text-xs rounded-full border border-[#01CCFF] bg-transparent  hover:bg-[#01CCFF] " type="submit">
     {(editLoading || isLoading)  ? <ImSpinner11 className='text-white animate-spin '/> : <p>submit</p>}
      </Button>
    </FormWrapper>
  );
};

export default Form;
