import React from 'react'
import PureModal from 'react-pure-modal';
import { AiOutlineClose } from 'react-icons/ai';
function Modal({children, title, open, setOpen}) {
    
  return (
    <PureModal
            className='ml-60'
            header={title}
            
            isOpen={open}
            closeButton={<AiOutlineClose className='w-4 h-4' />}
            closeButtonPosition="header"
            onClose={() => {
                setOpen(false);
                return true;
            }}
            width='70vw'
            
        >
            {children}
        </PureModal>
  )
}

export default Modal