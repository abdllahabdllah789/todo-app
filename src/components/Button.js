import React from 'react'
const Button = ({ onAdd, showAdd, color }) => {
    return (
        <button
            style={{ backgroundColor: color }}
            className='btn'
            onClick={onAdd}
        >
            {showAdd ? 'close' : 'Add'}
        </button>
    )
}

export default Button
