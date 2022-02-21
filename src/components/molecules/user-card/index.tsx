import Button from '@atoms/button';
import type { User } from '@types';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'



interface Props {
  user: User;
  handeEdit: (id:number, user:User)=> void;
  deleteMutation: (id:number)=> void;
}

const UserCardModal = ({user, handeEdit, deleteMutation }: Props) => {
  return (
    <div key={user.id} className='flex border-[0.2px] border-[#01CCFF] p-2 mt-2'>
        <div  className='basis-[70%] w-full h-fit  space-y-2 flex flex-col text-white'>
        <div className='flex items-center justify-start space-x-2'><p className='font-semibold text-[#01CCFF]'>Full Name :</p> <p className='text-sm'>{user.name}</p></div>
        <div className='flex items-center justify-start space-x-2'><p className='font-semibold text-[#01CCFF]'>Username :</p> <p className='text-sm'>{user.username}</p></div>
        <div className='flex items-center justify-start space-x-2'><p className='font-semibold text-[#01CCFF]'>Email :</p> <p className='text-sm'>{user.email}</p></div>
        <div className='flex items-center justify-start space-x-2'><p className='font-semibold text-[#01CCFF]'>Phone :</p> <p className='text-sm'>{user.phone}</p></div>
        <div className='flex justify-between'>
        </div>
    
    </div>
    <div className='basis-[30%] flex justify-end '>
      <div className='w-fit h-full flex flex-col  justify-between'>
      <Button onClick={()=> handeEdit(user.id, user)} className='px-3 py-3 text-white rounded-full bg-[#01CCFF] '><AiOutlineEdit className='text-white'/></Button>
       <Button onClick={()=> deleteMutation(user.id)} className='px-3 py-3 text-white rounded-full bg-[#FC3178] '><AiOutlineDelete className='text-white'/></Button>
      </div>
      </div>
  </div>
  );
};

export default UserCardModal;
