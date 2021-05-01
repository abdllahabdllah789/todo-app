import React from 'react'
import Button from './Button';
const Header = ({ onAdd, showAdd }) => {
    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            <Button onAdd={onAdd} showAdd={showAdd} color={showAdd ? 'crimson' : 'green'}
            />
        </header>
    )
}

export default Header
