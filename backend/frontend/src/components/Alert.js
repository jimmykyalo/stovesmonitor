import React from 'react'

function Alert({ variant,children}) {
  return (
    <div className={`w-11/12 mt-10 mb-4 text-sm rounded-lg p-4 mx-auto ${variant==='error'? 'bg-red-300':'bg-emerald-100'}`}>{children}</div>
  )
}

export default Alert