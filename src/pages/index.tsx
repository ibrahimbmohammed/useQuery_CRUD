import type { NextPage } from 'next';
import type {User} from '@types'
import {useState} from 'react'
import Layout from '@templates/layout';
import { useForm } from 'react-hook-form';
import { userSchema } from '../utils/schemas/users';
import Button from '@atoms/button'
import Modal from '@organisms/modal'
import UserCard from '@molecules/user-card'
import Form from '@organisms/form'
import {useGetUser, useDeleteUser} from '@services/users'
import Header from '@molecules/header';
import Float from '@atoms/float';
import {FiPlus} from 'react-icons/fi'
import {ImSpinner11} from 'react-icons/im'
const Home: NextPage = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<User>({
    resolver: userSchema,
  });
  const { data:users, isLoading } = useGetUser()
  
  const {mutateAsync:deleteMutation, isLoading:deleteLoading, error:deleteError} = useDeleteUser()

  const handeEdit = (id:number, user:User) => {
    setOpen(true)
    reset(user)
    setEdit(true)
  }
  const handeAdd = () => {
    setOpen(true)
    reset({})
    setEdit(false)
  }
  if (isLoading)return <div className="w-screen h-screen flex items-center bg-[#140532]  justify-center text-white">loading...</div>
  if (deleteLoading) return <div className='w-full h-screen bg-[#140532] flex items-center justify-center'> <div className='px-3 py-3 text-white rounded-full bg-[#FC3178] '><ImSpinner11 className='text-white animate-spin '/></div></div>
  if (deleteError) return <div className='w-full h-screen bg-[#140532] flex items-center justify-center'> <div className='px-3 py-3  rounded-full text-[#FC3178] '>sorry someting went wrong</div></div>
  return (
    <Layout>
      <Header/>
      <Float>
      <p className='font-semibold text-[#01CCFF]'> Add User</p>
      <Button onClick={()=> handeAdd()} className='px-3 py-3 text-white rounded-full bg-[#01CCFF] '><FiPlus className='font-semi-bold text-white text-xl'/></Button>
      </Float>
      <div className='container w-[90%] md:w-[50%] mx-center'>       
       {users?.map((user)=>(
        <UserCard
        key={user.id}
        user={user}
        handeEdit={handeEdit}
        deleteMutation={deleteMutation}
        />
       ))}
     
       </div>
       <Modal 
       title={edit ? 'Edit User' : 'Add New User'} 
       isOpen={isOpen}
       setIsOpen={setOpen}
       className="bg-[#140532] h-fit rounded-[10px] px-[11px] pb-[8px] w-[350px]"
       >
       <Form
       setOpen={setOpen}
       register={register}
       onHandleSubmit={handleSubmit}
       errors={errors}
       />
      </Modal>
    </Layout>
  );
};


export default Home;

