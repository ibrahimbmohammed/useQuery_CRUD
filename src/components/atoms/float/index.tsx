import  type { FC } from 'react'

const Float:FC = ({children}) => {
  return (
    <div className='fixed inset-0 bottom-[92%] md:top-[90%] left-[70%] md:left-[60%] flex items-center justify-center space-x-2 bg-black/5'>
        {children}
    </div>
  )
}

export default Float