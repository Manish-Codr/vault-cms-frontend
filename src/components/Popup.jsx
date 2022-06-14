import React from 'react'
import './Popup.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Popup = (props) => {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button onClick={() => props.setTrigger(false)} className='close-btn hover:drop-shadow-2xl'>
                    <AiOutlineCloseCircle className='text-2xl' />
                </button>
                {props.children}
            </div>
        </div>
    ) : '';
}

export default Popup