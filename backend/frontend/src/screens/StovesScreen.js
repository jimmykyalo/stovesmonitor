import React from 'react'
import AddStoveForm from '../forms/AddStoveForm';


function StovesScreen() {
    const [open, setOpen] = React.useState(false);

    
  return (
    <div>
        <button onClick={()=>setOpen(true)}>Open Modal</button>
        <AddStoveForm open={open} setOpen={setOpen} />
        
    </div>
  )
}

export default StovesScreen