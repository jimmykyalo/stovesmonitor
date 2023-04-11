import React from 'react'

function Loader({fullscreen}) {
  return (
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${fullscreen && 'loader-container'}`}>
        <div className="cube">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default Loader