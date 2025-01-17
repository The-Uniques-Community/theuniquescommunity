import React from 'react'

const ContainerFull = ({children,bgColor}) => {
  return (
    <div style={{backgroundColor: bgColor}} className='p-4 m-3 rounded-md w-full mx-auto'>
        {children}
    </div>
  )
}

export default ContainerFull;